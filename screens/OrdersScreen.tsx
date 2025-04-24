import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { Card, IconButton } from 'react-native-paper';

const OrdersScreen: React.FC = () => {
    const { orders } = useContext(CartContext)!;

    const renderOrder = ({ item }: { item: typeof orders[0] }) => (
        <Card style={styles.orderContainer}>
            <Card.Content>
                <Text style={styles.orderDate}>Order Date: {item.date}</Text>
                {item.items.map((orderItem, index) => (
                    <View key={index} style={styles.orderItem}>
                        <IconButton
                            icon="food"
                            size={20}
                            onPress={() => console.log('Item pressed')}
                        />
                        <Text style={styles.itemText}>
                            {orderItem.name} x{orderItem.quantity} - ${orderItem.price}
                        </Text>
                    </View>
                ))}
                <Text style={styles.orderTotal}>Total: ${item.total}</Text>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Orders</Text>
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    renderItem={renderOrder}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.emptyText}>You have no past orders.</Text>
            )}
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
    orderContainer: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        elevation: 3,
    },
    orderDate: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16, 
        color: '#333',
        flex: 1,
        flexWrap: 'wrap',
    },
    orderTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'green',
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});

export default OrdersScreen;
