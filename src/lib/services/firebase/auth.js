import { app } from "./app";
import { createUser, updateUser } from "./db";
import { getAuth, signOut, signInWithPopup, GithubAuthProvider, getAdditionalUserInfo, connectAuthEmulator } from "firebase/auth";

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");
const provider = new GithubAuthProvider();

export async function authSignIn() {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider)
            .then((res) => {
                const user = res.user;
                const userInfo = getAdditionalUserInfo(res);
                const userObj = {
                    email: user.email,
                    pfp: user.photoURL,
                    score: 0,
                    signedInAt: user.metadata.lastSignInTime,
                    uid: user.uid,
                    username: userInfo.username || "null",
                }

                userInfo.isNewUser ? createUser(userObj, user.metadata.creationTime) : updateUser(userObj);

                resolve(userObj);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export function authSignOut() {
    signOut(auth).catch((error) => {
        console.error(error);
    });
}