import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MathJaxContext } from "better-react-mathjax";

const root = ReactDOM.createRoot(document.getElementById('root'));
const config = {
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]]
  },
  startup: {
    typeset: false
  }
};
root.render(
  <React.StrictMode>
    <MathJaxContext config={config}>
      <App />
    </MathJaxContext>
  </React.StrictMode>
);