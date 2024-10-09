export interface Basket {
    id: number
    buyerId: string
    items: BasketItem[]
  }
  
  export interface BasketItem {
    id: number
    creationId: number
    name: string
    quantity: number
    price: number
    pictureUrl: string
    category: string
  }
  