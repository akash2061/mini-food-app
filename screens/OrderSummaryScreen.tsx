import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { CartContext } from '../context/CartContext';

const OrderSummaryScreen: React.FC = ({ route, navigation }: any) => {
    const { cartItems, totalPrice } = route.params;
    const { addOrder, clearCart } = useContext(CartContext)!;

    const handleBackToHome = () => {
        const order = {
            id: Date.now().toString(),
            items: cartItems,
            total: totalPrice,
            date: new Date().toLocaleString(),
        };
        addOrder(order);
        clearCart();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    const renderOrderItem = ({ item }: { item: typeof cartItems[0] }) => (
        <View style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Receipt</Text>
            <FlatList
                data={cartItems}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            <Button title="Confirm!" onPress={handleBackToHome} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemName: {
        fontSize: 18,
        color: '#333',
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default OrderSummaryScreen;