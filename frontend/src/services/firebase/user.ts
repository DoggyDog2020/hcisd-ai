import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getUserRole = async (email: string): Promise<string | null> => {
  if (!email) {
    console.log('No email provided to getUserRole');
    return null;
  }

  try {
    console.log('Checking role for email:', email);
    // Use the email as the document ID
    const userDoc = await getDoc(doc(db, 'allowedUsers', email));
    
    if (!userDoc.exists()) {
      console.log('No document found for email:', email);
      return null;
    }
    
    const role = userDoc.data().role;
    console.log('Found role:', role, 'for email:', email);
    return role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null; // Return null instead of throwing error
  }
};
