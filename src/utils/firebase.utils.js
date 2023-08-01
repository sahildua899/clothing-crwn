import {initializeApp } from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCVdyTf-yIXBVpgife6S2merpRu3nndi_U",
    authDomain: "crwn-db-fd1d7.firebaseapp.com",
    projectId: "crwn-db-fd1d7",
    storageBucket: "crwn-db-fd1d7.appspot.com",
    messagingSenderId: "818254647443",
    appId: "1:818254647443:web:1313d488c9953c56c5fd66"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth)=>{
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName, email,     createdAt
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return userDocRef

}