import { app } from "./app";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, connectFirestoreEmulator } from "firebase/firestore";

export const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);
export const kingRef = doc(db, "data", "king");

export function setKing(user) {
    const ref = doc(db, "data", "king");
    const userRef = doc(db, "users", user.uid);

    return new Promise((resolve, reject) => {
        setDoc(ref, {
            king: userRef,
            capturedAt: serverTimestamp(),
        }).then((res) => {
            resolve(user.username);
        }).catch((error) => {
            reject(error);
        });
    });
}

export async function getKing() {
    const kingRef = doc(db, "data", "king");
    const kingSnap = await getDoc(kingRef);

    return new Promise(async (resolve, reject) => {
        if (kingSnap.exists()) {
            const userRef = kingSnap.data().king;
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();

            resolve(userData.username);
        } else {
            reject("User doesn't exist!");
        }
    });
}

export function createUser(data, time) {
    const ref = doc(db, "users", data.uid);

    setDoc(ref, {
        ...data,
        createdAt: time,
    });
}

export function updateUser(data) {
    const ref = doc(db, "users", data.uid);

    setDoc(ref, { ...data }, { merge: true });
}

export async function getUser(uid) {
    const ref = doc(db, "users", uid);
    const docSnap = await getDoc(ref);

    return new Promise((resolve, reject) => {
        if (docSnap.exists()) {
            resolve(docSnap.data());
        } else {
            reject("User doesn't exist!");
        }
    });
}