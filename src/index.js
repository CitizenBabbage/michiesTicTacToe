// import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./styles.css";

// import App from "./App";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles.css";
 
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);