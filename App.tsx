import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import OrderSummaryScreen from './screens/OrderSummaryScreen';
import OrdersScreen from './screens/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
  </Stack.Navigator>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: 'home-outline' | 'cart-outline' | 'list-outline' | undefined;

              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'Cart') {
                iconName = 'cart-outline';
              } else if (route.name === 'Orders') {
                iconName = 'list-outline';
              }

              return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
            },
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Cart" component={CartStack} />
          <Tab.Screen name="Orders" component={OrdersScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
