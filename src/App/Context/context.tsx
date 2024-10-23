import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../../Models/Basket";

// Définition de la forme de la valeur du contexte
interface AtelierContextValue {
    basket: Basket | null; // Le panier actuel ou null s'il est vide
    setBasket: (basket: Basket) => void; // Fonction pour définir l'état du panier
    removeItem: (creationId: number, quantity: number) => void; // Fonction pour supprimer des articles du panier
}

// Création d'un contexte avec une valeur par défaut indéfinie
export const AtelierContext = createContext<AtelierContextValue | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte Atelier
export function useAtelierContext() {
    const context = useContext(AtelierContext);

    // Vérifie si le contexte est défini, sinon renvoie une erreur
    if (context === undefined) {
        throw new Error('Oops - nous ne semblons pas être dans le provider');
    }

    return context; // Retourne la valeur du contexte pour utilisation dans les composants
}

// Composant provider du contexte
export function AtelierProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null); // Initialisation de l'état du panier

    // Fonction pour supprimer un article du panier
    function removeItem(creationId: number, quantity: number) {
        if (!basket) return; // Si le panier est vide, sortir immédiatement

        // Créer un nouveau tableau d'articles pour éviter de modifier l'état directement
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.creationId === creationId); // Trouver l'article à supprimer

        if (itemIndex >= 0) {
            // Si l'article existe, diminuer la quantité
            items[itemIndex].quantity -= quantity;

            // Si la quantité atteint zéro, retirer l'article du tableau
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);

            // Mettre à jour l'état du panier avec le tableau d'articles modifié
            setBasket(prevState => ({
                ...prevState!, // Répéter l'état précédent
                items // Mettre à jour le tableau d'articles
            }));
        }
    }

    // Fournir la valeur du contexte aux composants enfants
    return (
        <AtelierContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </AtelierContext.Provider>
    );
}
