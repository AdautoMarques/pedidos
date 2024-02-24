import { ProductProps } from "@//utils/data/products";
import { ProductCartProps } from "../cart-store";





export function add(products: ProductCartProps[], newProduct: ProductProps){
    const existingProduct = products.find(({id}) => newProduct.id === id)
    if(existingProduct){
        return products.map((Product) => existingProduct.id === Product.id ? {...Product, quantity: Product.quantity + 1} : Product)
    }

    return [...products, {...newProduct, quantity: 1}]
}

export function remove(products: ProductCartProps[], productRemoveId: string){
    const updatedProducts = products.map((product) => product.id === productRemoveId ? {
        ...product,
        quantity: product.quantity > 1 ? product.quantity -1 : 0
    }: product
    
    )
    return updatedProducts.filter((product) => product.quantity > 0)
}