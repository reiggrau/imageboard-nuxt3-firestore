import { collection, orderBy, limit, getDocs, getDoc, addDoc, deleteDoc, doc, query, where, setDoc, collectionGroup, Timestamp } from "firebase/firestore";
import { firestoreDB } from "./firebase";

// OWN CODE

const getNewestImages = async () => {
    const docQuery = query(collection(firestoreDB, "images"), orderBy("created_at", "desc"), limit(6));

    const querySnap = await getDocs(docQuery);

    const data = Array.from(querySnap.docs).map((doc) => {
        const { user_id, url, title, description, tags, created_at, likes, comments } = doc.data();
        return {
            id: doc.id,
            user_id,
            url,
            title,
            description,
            tags,
            created_at,
        };
    });

    return data;
};

const getImageById = async (id: string) => {
    console.log("getImageById id:", id);

    const docRef = doc(firestoreDB, "images", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { user_id, url, title, description, tags, created_at, likes, comments } = docSnap.data();

        return {
            id,
            user_id,
            url,
            title,
            description,
            tags,
            likes,
            comments,
            created_at,
        };
    } else {
        return undefined;
    }
};

// EXAMPLE CODE

export const queryByCollection = async (col: string) => {
    // @ts-ignore
    const colRef = collection(firestoreDB, col);

    const snapshot = await getDocs(colRef);

    const docs = Array.from(snapshot.docs).map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        };
    });

    return docs;
};

export const set = async (col: string, document: Object) => {
    await setDoc(doc(collection(firestoreDB, col)), document, { merge: true });
};

export const add = async (col: string, document: Object) => {
    // @ts-ignore
    const colRef = collection(firestoreDB, col);

    const docRef = await addDoc(colRef, document);

    return docRef;
};

export const del = async (col: string, id: string) => {
    const docRef = doc(firestoreDB, col, id);
    return await deleteDoc(docRef);
};

// EXPORTS
export default {
    getNewestImages,
    getImageById,
};
