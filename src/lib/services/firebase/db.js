import { app } from "./app";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export const db = getFirestore(app);

export function becomeKing() {
    const ref = doc(db, "data", "king");
    const user = "squidee_";

    return new Promise((resolve, reject) => {
        setDoc(ref, {
            king: user,
            capturedAt: serverTimestamp(),
        }).then((res) => {
            resolve(user);
        }).catch((error) => {
            reject(error);
        });
    })
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
    })
}