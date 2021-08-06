import "./App.css";
import { useEffect, useState } from "react";
import { auth, firestore, functions } from "./firebase";
import { httpsCallable } from "firebase/functions";
import {
  collection,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

const addTodo = httpsCallable(functions, "addTodo");

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    return onSnapshot(
      collection(firestore, `users/${auth.currentUser.uid}/todos`),
      (snapshot) => {
        setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  }, []);

  const signOut = () => auth.signOut();

  const onSubmitTodo = (event) => {
    event.preventDefault();

    setTodo("");
    addTodo({
      text: todo,
      complete: false,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <>
      <header>
        <button onClick={signOut}>Sign Out</button>
      </header>
      <main>
        <form onSubmit={onSubmitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What's Next?"
          />
          <button type="submit">Add</button>
        </form>
        {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
      </main>
    </>
  );
};

const Todo = ({ id, complete, text }) => {
  const onCompleteTodo = (id, complete) =>
    setDoc(
      doc(firestore, `users/${auth.currentUser.uid}/todos/${id}`),
      { complete: !complete },
      { merge: true }
    );

  const onDeleteTodo = (id) =>
    deleteDoc(doc(firestore, `users/${auth.currentUser.uid}/todos/${id}`));

  return (
    <div key={id} className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        onClick={() => onCompleteTodo(id, complete)}
      >
        {text}
      </button>
      <button onClick={() => onDeleteTodo(id)}>x</button>
    </div>
  );
};

export default Todos;
