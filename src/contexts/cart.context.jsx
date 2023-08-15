import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) =>{
    //find if cartitems contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=>cartItem.id === productToAdd.id)

    //If Found, Increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=>cartItem.id === productToAdd.id ? {...cartItem, quantity:cartItem.quantity+1}:cartItem)
    }

    //Return New Array with modified cartitems/new cart item
    return [...cartItems, {...productToAdd, quantity:1}];

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen : () =>{},
    cartItems: [],
    addItemToCart:()=>{},
    cartCount:0
})

export const CartPorvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}