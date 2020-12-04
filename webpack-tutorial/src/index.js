import { elementWithText } from "./dom";
import "./index.css";

const element = elementWithText("h2", "Hello, World!");

const root = document.getElementById("root");
root.appendChild(element);
