import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../../Models/Basket";

interface AtelierContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (creationId: number, quantity: number) => void;
}

export const AtelierContext = createContext<AtelierContextValue | undefined>(undefined);

export function useAtelierContext() {
    const context = useContext(AtelierContext);

    if (context === undefined) {
        throw Error('Oops - we do not seem to be inside the provider');
    }

    return context;
}

export function AtelierProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(creationId: number, quantity: number) {
        if (!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.creationId === creationId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return (
        <AtelierContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </AtelierContext.Provider>
    )
}