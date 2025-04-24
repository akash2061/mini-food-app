import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen: React.FC = ({ navigation }: any) => {
    const { cartItems, clearCart } = useContext(CartContext)!;

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleConfirmOrder = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        navigation.navigate('OrderSummary', { cartItems, totalPrice });
    };

    const handleDeleteOrder = () => {
        Alert.alert(
            'Delete Order',
            'Are you sure you want to delete the order?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => clearCart() },
            ]
        );
    };

    const renderCartItem = ({ item }: { item: typeof cartItems[0] }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.name} x{item.quantity}</Text>
            <Text style={styles.cartItemText}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.id}
                    />
                    <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <Button title="Confirm Order" onPress={handleConfirmOrder} />
                        <Button title="Delete Order" onPress={handleDeleteOrder} color="red" />
                    </View>
                </>
            ) : (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cartItemText: {
        fontSize: 18,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});

export default CartScreen;
