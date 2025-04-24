import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../context/CartContext';
import localData from '../services/firebaseDB_guide.json'; // Import local data - For Testing
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const HomeScreen: React.FC = () => {
    const [foodItems, setFoodItems] = React.useState<FoodItem[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { addToCart } = useContext(CartContext)!;
    const [quantities, setQuantities] = React.useState<{ [key: string]: number }>({});

    // Fetch menu items from Firebase
    // If fetching fails, fallback to local data
    // This is a temporary solution for testing purposes
    // In a production app, handle this more gracefully
    React.useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Attempt to fetch data from Firebase
                const querySnapshot = await getDocs(collection(db, 'menuItems'));
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as FoodItem[];
                setFoodItems(items);
            } catch (error) {
                console.error('Error fetching menu items from Firebase:', error);
                // Fallback to local data
                const items = Object.values(localData.menuItems) as FoodItem[];
                setFoodItems(items);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const increaseQuantity = (id: string) => {
        setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const decreaseQuantity = (id: string) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    const handleAddToCart = (item: FoodItem) => {
        const quantity = quantities[item.id] || 0;
        if (quantity > 0) {
            addToCart({ ...item, quantity });
            setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
        }
    };

    const renderItem = ({ item }: { item: FoodItem }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#666' }}>Price:</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#666' }}>Quantity:</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantities[item.id] || 0}</Text>
                        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.button, quantities[item.id] === 0 && styles.disabledButton]}
                    onPress={() => handleAddToCart(item)}
                    disabled={quantities[item.id] === 0}
                >
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <FlatList
                data={foodItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#1C1C1C',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: 120,
        height: 120,
    },
    infoContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    description: {
        fontSize: 14,
        color: '#666666',
        marginVertical: 4,
    },
    price: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'space-between',
        width: '45%',
    },
    quantityButton: {
        backgroundColor: '#E23744',
        borderRadius: 4,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 24,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 8,
    },
    button: {
        marginTop: 12,
        backgroundColor: '#E23744',
        paddingVertical: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
});

export default HomeScreen;
