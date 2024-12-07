import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createBrowserHistory } from 'history';
import { RootState, store } from "../Store/configureStore";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { Creation } from "../../Models/Creations";

// Configuration de la base URL pour toutes les requêtes Axios
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials =true;
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))
// Fonction utilitaire pour extraire les données de la réponse Axios
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (!config) {
        config = {};
    }
    if (!config.headers) {
        config.headers = {};
    }
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const history = createBrowserHistory(); 


axios.interceptors.response.use(
    async response => {
        await sleep();
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = error.response as AxiosResponse;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key]);
                        }
                    }
                    return Promise.reject(modelStateErrors.flat());
                }
                break;

            case 401:
                toast.error(data.title);
                break;

            case 500:
                history.push('/server-error', { state: { error: data } }); // Utiliser history pour naviguer
                break;

            default:
                break;
        }

        return Promise.reject(error.response);
    }
);const creationsAdapter = createEntityAdapter<Creation>();

// Objets contenant les méthodes de requêtes HTTP (GET, POST, PUT, DELETE)

    const requests = {
        get: (url: string, params?: URLSearchParams) => 
            axios.get(url, { params }).then(responseBody),
    
        post: (url: string, body: {}) => 
            axios.post(url, body, {
            
            }).then(responseBody),
    
        put: (url: string, body: {}) => 
            axios.put(url, body, {
        
            }).then(responseBody),
    
        delete: (url: string) => 
            axios.delete(url).then(responseBody),
    }

// Objet pour gérer les créations (Atelier)
const Creations = {
    list: () => requests.get('Creation/GetCreations'), // Récupère la liste des créations
    details: (id: number) => requests.get(`Creation/CreationId/${id}`), // Récupère les détails d'une création spécifique par ID
};

// const Basket = {
//     get: () => requests.get(`Basket/GetBasket`),
//     addItem: (creationId: number, quantity = 1) => requests.post(`Basket/AddItemToBasket/AddItemToBasket/${creationId}/${quantity}`, {}),
//     removeItem: (creationId: number, quantity = 1) => requests.delete(`Basket/RemoveBasketItem/DeleteItem/${creationId}/${quantity}`, {}),

// }

// Objet pour tester la gestion des erreurs
const TestErrors = {
    get400Error: () => requests.get('Buggy/GetBadRequest/bad-request'), // Simule une erreur 400 (Bad Request)
    get401Error: () => requests.get('Buggy/GetUnauthorized/unauthorized'), // Simule une erreur 401 (Unauthorized)
    get404Error: () => requests.get('Buggy/GetNotFound/not-found'), // Simule une erreur 404 (Not Found)
    get500Error: () => requests.get('Buggy/GetServerError/server-error'), // Simule une erreur 500 (Internal Server Error)
    getValidationError: () => requests.get('Buggy/GetValidationError/validation-error'), // Simule une erreur de validation
};
const Account = {
    login: (values: any) => requests.post('Account/Login/login', values),
    register: (values: any) => requests.post('Account/Register/register', values),
    currentUser: () => requests.get('Account/GetCurrentUser/currentUser'),
}
// Agrégation des agents pour l'exportation
const agent = {
    Creations,
    TestErrors,
    // Basket,
    Account
};
export const creationSelectors = creationsAdapter.getSelectors((state: RootState) => state.creation);
export default agent; // Exportation de l'objet agent pour une utilisation dans d'autres parties de l'application
