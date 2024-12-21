import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify"; 
import { createBrowserHistory } from 'history'; 
import { RootState, store } from "../Store/configureStore"; 
import { createEntityAdapter } from "@reduxjs/toolkit"; 
import { Creation } from "../../Models/Creations"; 

// Configuration de la base URL pour toutes les requêtes Axios
axios.defaults.baseURL = "http://localhost:5000/api/"; // Définir l'URL de base de l'API
axios.defaults.withCredentials = true; // Inclure les cookies pour les requêtes
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000)) // Simuler un délai (utile pour tester la gestion des réponses)

// Fonction utilitaire pour extraire les données de la réponse Axios
const responseBody = (response: AxiosResponse) => response.data; // Récupère le corps de la réponse (les données)

// Intercepteur des requêtes Axios : Ajout du token d'authentification dans les en-têtes
axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token; // Récupérer le token JWT dans l'état global
    if (!config) {
        config = {}; // Si la config n'existe pas, en créer une nouvelle
    }
    if (!config.headers) {
        config.headers = {}; // Ajouter des en-têtes vides si non définis
    }
    if (token) config.headers.Authorization = `Bearer ${token}`; // Ajouter l'en-tête Authorization avec le token JWT
    return config; // Retourner la configuration de la requête modifiée
})

const history = createBrowserHistory(); // Créer une instance de l'historique pour la navigation (par exemple pour rediriger après une erreur)

// Intercepteur des réponses Axios : Gérer les erreurs globales
axios.interceptors.response.use(
    async response => {
        await sleep(); // Simuler un délai de réponse (utile pour tester la gestion des erreurs)
        return response; // Retourner la réponse
    },
    (error: AxiosError) => { // En cas d'erreur
        const { data, status } = error.response as AxiosResponse; // Extraire les données et le statut de l'erreur

        // Gestion des erreurs HTTP
        switch (status) {
            case 400: // Erreur de validation des données envoyées
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key]); // Ajouter les erreurs du modèle
                        }
                    }
                    return Promise.reject(modelStateErrors.flat()); // Retourner les erreurs
                }
                break;

            case 401: // Non autorisé (mauvais token ou non connecté)
                toast.error(data.title); // Afficher un message d'erreur via toast
                break;

            case 500: // Erreur serveur interne
                history.push('/server-error', { state: { error: data } }); // Rediriger vers la page d'erreur serveur
                break;

            default:
                break;
        }

        return Promise.reject(error.response); // Rejeter l'erreur
    }
);

// Création d'un adaptateur pour gérer les entités "Creation" avec Redux Toolkit
const creationsAdapter = createEntityAdapter<Creation>();

// Objets contenant les méthodes de requêtes HTTP (GET, POST, PUT, DELETE)
const requests = {
    // Méthode GET
    get: (url: string, params?: URLSearchParams) =>
        axios.get(url, { params }).then(responseBody), // Effectue une requête GET et extrait les données de la réponse

    // Méthode POST
    post: (url: string, body: {}) =>
        axios.post(url, body).then(responseBody), // Effectue une requête POST avec un corps et extrait les données

    // Méthode PUT
    put: (url: string, body: {}) =>
        axios.put(url, body).then(responseBody), // Effectue une requête PUT et extrait les données

    // Méthode DELETE
    delete: (url: string) =>
        axios.delete(url).then(responseBody), // Effectue une requête DELETE et extrait les données
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item: any): FormData {
    const formData = new FormData();
    for (const key in item) {
        if (item[key] instanceof File) {
            formData.append(key, item[key]); // Ajouter un fichier
        } else if (Array.isArray(item[key])) {
            item[key].forEach((value: any, index: number) => {
                formData.append(`${key}[${index}]`, value); // Ajouter chaque élément d'un tableau
            });
        } else {
            formData.append(key, item[key]); // Ajouter des champs simples
        }
    }
    return formData;
}


const Admin = {
    createCreation: (creation: any) => requests.postForm('Creation/CreateCreation', createFormData(creation)),
    updateCreation: (creation: any) => requests.putForm('Creation/UpdateCreation', createFormData(creation)),
    deleteCreation: (id: number) => requests.delete(`Creation/DeleteCreation/${id}`),
};



// Objet pour gérer les créations (Atelier)
const Creations = {
    list: () => requests.get('Creation/GetCreations'), // Récupère la liste des créations
    details: (id: number) => requests.get(`Creation/CreationId/${id}`), // Récupère les détails d'une création spécifique par ID
};


// Objet pour gérer les actions liées au compte utilisateur
const Account = {
    login: (values: any) => requests.post('Account/Login/login', values), // Effectue une connexion (POST)
    register: (values: any) => requests.post('Account/Register/register', values), // Effectue une inscription (POST)
    currentUser: () => requests.get('Account/GetCurrentUser/currentUser'), // Récupère les informations de l'utilisateur connecté
}

// Objet pour tester la gestion des erreurs (pour simuler différentes erreurs côté serveur)
const TestErrors = {
    get400Error: () => requests.get('Buggy/GetBadRequest/bad-request'), // Simule une erreur 400 (Bad Request)
    get401Error: () => requests.get('Buggy/GetUnauthorized/unauthorized'), // Simule une erreur 401 (Unauthorized)
    get404Error: () => requests.get('Buggy/GetNotFound/not-found'), // Simule une erreur 404 (Not Found)
    get500Error: () => requests.get('Buggy/GetServerError/server-error'), // Simule une erreur 500 (Internal Server Error)
    getValidationError: () => requests.get('Buggy/GetValidationError/validation-error'), // Simule une erreur de validation
};

// Agrégation des agents pour l'exportation
const agent = {
    Creations,
    TestErrors,
    Admin,
    Account, // Ajouter ici les objets gérant les autres parties de l'application
};

// Exporter les sélecteurs pour récupérer les entités "Creation" dans l'état global de Redux
export const creationSelectors = creationsAdapter.getSelectors((state: RootState) => state.creation);

// Exporter l'objet agent pour une utilisation dans d'autres parties de l'application
export default agent; 
