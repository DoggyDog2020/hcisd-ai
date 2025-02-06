import { auth, db } from './firebase';
import { 
    signInWithEmailAndPassword, 
    signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const signInWithEmail = async (email: string, password: string) => {
    try {
        // First check if user is allowed
        const allowedUserRef = doc(db, 'allowedUsers', email);
        const allowedUserDoc = await getDoc(allowedUserRef);
        
        console.log('Checking if user is allowed:', email);
        
        if (!allowedUserDoc.exists()) {
            console.log('User not found in allowedUsers');
            throw new Error('Email not authorized');
        }

        const userData = allowedUserDoc.data();
        console.log('User data:', userData);

        // If allowed, proceed with sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            user: userCredential.user,
            role: userData.role
        };
    } catch (error) {
        console.error('Auth error:', error);
        throw new Error('Email not authorized');
    }
};

export const signOut = () => firebaseSignOut(auth);
