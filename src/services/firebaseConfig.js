import firebase from "firebase";
import {
  apiKey,
  appId,
  authDomain,
  databaseURL,
  messagingSenderId,
  projectId,
  storageBucket,
} from "./fireconfig.json";
export const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export const initfirebase = firebase.initializeApp(firebaseConfig);

export default class firebaseAuth {
  async authorization() {
    try {
      let provider = new firebase.auth.GoogleAuthProvider();
      let result = null;
      result = await initfirebase.auth().signInWithPopup(provider);

      let user = result.user;
      localStorage.setItem(
        "session",
        JSON.stringify({
          displayName: user.displayName,
          token: result.credential.accessToken,
          email: result.user.email,
          avatar: result.user.photoURL,
          id: result.user.uid,
        })
      );
    } catch (error) {
      alert("error iniciando sesion :" + error);
      // location.reload()
    }
  }

  async loggout() {
    return await firebase.auth().signOut();
  }
}
