import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Providers } from "./context/Providers";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!)
    .render(
        <React.StrictMode>
            <Providers>
                <App />
            </Providers>,
        </React.StrictMode>,
    );
