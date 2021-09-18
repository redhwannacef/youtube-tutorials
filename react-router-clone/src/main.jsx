import React from "react";
import ReactDOM from "react-dom";

const Router = ({ children }) => children;
const Route = () => null;
const Link = ({ to, ...props }) => <a href={to} {...props} />;
const Routes = ({ children }) =>
  React.Children.map(children, (child) =>
    child.props.path === location.pathname ? child.props.element : null
  );

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
