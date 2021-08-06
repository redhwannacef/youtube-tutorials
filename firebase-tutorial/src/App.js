import "./App.css";
import Todos from "./Todos";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

const sighInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

const SignIn = () => (
  <main>
    <button onClick={sighInWithGoogle}>Sign In With Google</button>
  </main>
);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return user ? <Todos /> : <SignIn />;
};

export default App;
