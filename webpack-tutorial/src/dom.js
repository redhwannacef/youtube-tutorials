export const elementWithText = (tagName, text) => {
  const element = document.createElement(tagName);
  const content = document.createTextNode(text);
  element.appendChild(content);

  return element;
}