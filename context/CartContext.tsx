import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
}

interface CartContextProps {
    cartItems: CartItem[];
    orders: Order[];
    addToCart: (item: CartItem) => void;
    clearCart: () => void;
    addOrder: (order: Order) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                return prevCartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            } else {
                return [...prevCartItems, item];
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const addOrder = (order: Order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
    };

    return (
        <CartContext.Provider value={{ cartItems, orders, addToCart, clearCart, addOrder }}>
            {children}
        </CartContext.Provider>
    );
};