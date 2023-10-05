// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJ6xWX7yCv0BIqxFRUY7RU085VhccA3VI",
    authDomain: "shopping-list-98a65.firebaseapp.com",
    projectId: "shopping-list-98a65",
    storageBucket: "shopping-list-98a65.appspot.com",
    messagingSenderId: "906006379379",
    appId: "1:906006379379:web:44fcc0b0a3b4f578d5a306"
};

// Initialize Firebase
export const appFire = initializeApp(firebaseConfig);

export async function getShoppingListFromFireStoreOrEmptyArray(path: string) {
    const db = getFirestore(appFire);
    const shoppingListCol = collection(db, path);
    const shoppingListSnapshot = await getDocs(shoppingListCol);
    console.log(shoppingListSnapshot);
    if (shoppingListSnapshot.empty) {
        return [];
    } else {
        const shoppingList: any[] = [];
        shoppingListSnapshot.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;
            shoppingList.push(item);
        });
        return shoppingList;
    }
}

export async function addShoppingItemToFireStore(item: any, path: string) {
    const db = getFirestore(appFire);
    const shoppingListCol = collection(db, path);
    try {
        const docRef = await addDoc(shoppingListCol, item);
        console.log("Document written with ID: ", docRef.id);
        item.id = docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteShoppingItemFromFireStore(item: any, path: string) {
    const db = getFirestore(appFire);
    console.log(item);
    const docRef = doc(db, path, item.id);
    console.log(docRef)
    //remove item from shoppingList
    try {
        await deleteDoc(docRef);
        console.log("Document deleted with ID: ", item.id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

//update end field in document
export async function updateShoppingItemFromFireStore(item: any, path: string) {
    const db = getFirestore(appFire);
    console.log(item);
    const docRef = doc(db, path, item.id);
    try {
        await updateDoc(docRef, {priority: item.priority});
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}
