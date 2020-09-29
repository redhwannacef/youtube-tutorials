import React from "react";

const combine = (...names) => names.filter((name) => name).join(" ");

// UTILITIES

export const Flow = ({ className, component: Component = "div", ...rest }) => (
  <Component className={combine("flow", className)} {...rest} />
);

export const Wrapper = ({ className, component: Component = "div", ...rest }) => (
  <Component className={combine("wrapper", className)} {...rest} />
);

export const Splitter = ({ className, component: Component = "div", ...rest }) => (
  <Component className={combine("splitter", className)} {...rest} />
);

export const VisuallyHidden = ({ className, component: Component = "div", ...rest }) => (
  <Component className={combine("visually-hidden", className)} {...rest} />
);


// BLOCKS

export const Button = ({ className, component: Component = "button", ...other }) => (
  <Component className={combine("button", className)} {...other} />
);

export const Pill = ({ className, component: Component = "span", ...other }) => (
  <Component className={combine("pill", className)} {...other} />
);
