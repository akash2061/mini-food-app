import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase'; 

export const fetchMenuItems = async () => {
    try {
        const menuRef = collection(db, 'menuItems');
        const q = query(menuRef, orderBy('name'));

        const querySnapshot = await getDocs(q);
        const menuItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return menuItems;
    } catch (error) {
        console.error("Error fetching menu items: ", error);
        throw error;
    }
};
