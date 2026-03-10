import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc,
  collection,
  getDocs,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import type { Invitado } from '@/types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── RSVP Functions ───────────────────────────────────────

/** Fetch an invitado by their unique invite code */
export async function getInvitado(code: string): Promise<Invitado | null> {
  try {
    const docRef = doc(db, 'invitados', code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Invitado;
    }
    return null;
  } catch (error) {
    console.error('Error fetching invitado:', error);
    return null;
  }
}

/** Update RSVP response for an invitado */
export async function updateRSVP(code: string, data: Partial<Invitado>): Promise<boolean> {
  try {
    const docRef = doc(db, 'invitados', code);
    await updateDoc(docRef, {
      ...data,
      confirmado: true,
      fechaConfirmacion: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error updating RSVP:', error);
    return false;
  }
}

// ─── Admin Functions ──────────────────────────────────────

/** Get all invitados */
export async function getAllInvitados(): Promise<Invitado[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'invitados'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Invitado[];
  } catch (error) {
    console.error('Error fetching all invitados:', error);
    return [];
  }
}

/** Create a new invitado */
export async function createInvitado(code: string, data: Omit<Invitado, 'id'>): Promise<boolean> {
  try {
    await setDoc(doc(db, 'invitados', code), data);
    return true;
  } catch (error) {
    console.error('Error creating invitado:', error);
    return false;
  }
}

/** Update an invitado (Admin) */
export async function updateInvitadoAdmin(code: string, data: Partial<Invitado>): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'invitados', code), data);
    return true;
  } catch (error) {
    console.error('Error updating invitado (Admin):', error);
    return false;
  }
}

/** Delete an invitado */
export async function deleteInvitado(code: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'invitados', code));
    return true;
  } catch (error) {
    console.error('Error deleting invitado:', error);
    return false;
  }
}

export { db };
