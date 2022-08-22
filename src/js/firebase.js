import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: process.env.VUE_APP_API,
  authDomain: process.env.VUE_APP_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT,
  storageBucket: process.env.VUE_APP_STORAGE,
  messagingSenderId: process.env.VUE_APP_MESSAGE,
  appId: process.env.VUE_APP_APP,
  measurementId: process.env.VUE_APP_MEASUREMENT
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth, app }