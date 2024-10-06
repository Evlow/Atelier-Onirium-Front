import axios, { AxiosResponse } from "axios";

// Configuration de la base URL pour toutes les requêtes Axios
axios.defaults.baseURL = "http://localhost:5000/api/";

// Fonction utilitaire pour extraire les données de la réponse Axios
const responseBody = (response: AxiosResponse) => response.data;

// Objets contenant les méthodes de requêtes HTTP (GET, POST, PUT, DELETE)
const requests = {
    get: (url: string) => axios.get(url).then(responseBody), // Effectue une requête GET
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody), // Effectue une requête POST
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody), // Effectue une requête PUT
    delete: (url: string) => axios.delete(url).then(responseBody), // Effectue une requête DELETE
}

// Objet pour gérer les créations (Atelier)
const Creations = {
    list: () => requests.get('Creation/GetCreations'), // Récupère la liste des créations
    details: (id: number) => requests.get(`Creation/CreationId/${id}`), // Récupère les détails d'une création spécifique par ID
    detail: (name: string) => requests.get(`Creation/CreationByName/${name}`) // Récupère les détails d'une création par nom
}

// Objet pour tester la gestion des erreurs
const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'), // Simule une erreur 400 (Bad Request)
    get401Error: () => requests.get('buggy/unauthorised'), // Simule une erreur 401 (Unauthorized)
    get404Error: () => requests.get('buggy/not-found'), // Simule une erreur 404 (Not Found)
    get500Error: () => requests.get('buggy/server-error'), // Simule une erreur 500 (Internal Server Error)
    getValidationError: () => requests.get('buggy/validation-error'), // Simule une erreur de validation
}

// Agrégation des agents pour l'exportation
const agent = {
    Creations,
    TestErrors
}

export default agent; // Exportation de l'objet agent pour une utilisation dans d'autres parties de l'application
