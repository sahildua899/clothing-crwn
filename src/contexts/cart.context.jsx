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

const removeCartItem = (cartItems, cartItemtoRemove) =>{
    //Find the cart item to remove
    const existingCartItem = cartItems.find((cartItem)=>cartItem.id === cartItemtoRemove.id)
    // check if quantity is equal to 1, if it is then remove the item from cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !==cartItemtoRemove.id)
    }
    //return item with reduced quantity
    return cartItems.map((cartItem)=>cartItem.id === cartItemtoRemove.id ? {...cartItem, quantity:cartItem.quantity-1}:cartItem)
}

const clearCartItem = (cartItems, cartItemtoClear) =>  cartItems.filter((cartItem)=>cartItem.id !== cartItemtoClear.id)

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen : () =>{},
    cartItems: [],
    addItemToCart:()=>{},
    removeItemFromCart :()=>{},
    clearItemFromCart:()=>{},
    cartCount:0,
    cartTotal:0
})

export const CartPorvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem)=>total+cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (cartItemtoRemove) =>{
        setCartItems(removeCartItem(cartItems, cartItemtoRemove))
    }
    const clearItemFromCart = (cartItemtoClear) =>{
        setCartItems(clearCartItem(cartItems, cartItemtoClear))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}