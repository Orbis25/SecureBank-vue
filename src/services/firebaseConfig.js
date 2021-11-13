import firebase from "firebase";

export const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

export const initfirebase = firebase.initializeApp(firebaseConfig);

export default class FirebaseAuth {
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
    return firebase.auth().signOut();
  }
}
