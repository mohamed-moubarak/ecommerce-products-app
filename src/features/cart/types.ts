export interface Product {
 id: string;
 title: string;
 description: string;
 price: number;
 thumbnail: string;
}

export interface CartItem {
 product: Product;
 quantity: number;
}
export interface CartTotal {
 price: number;
 quantity: number;
}
