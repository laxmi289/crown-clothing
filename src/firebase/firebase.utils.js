import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDn7nVEF8fWZbIhE4GJaeGjtCc_BHf0wOM",
    authDomain: "crown-db-2160a.firebaseapp.com",
    projectId: "crown-db-2160a",
    storageBucket: "crown-db-2160a.appspot.com",
    messagingSenderId: "138827610761",
    appId: "1:138827610761:web:88aa87af1c1f0a6e5be458",
    measurementId: "G-LE9V6V2J24"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
        })
        }
        catch (error) {
            console.log("error creating user :", error);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;