import React from "react";
import { createPortal } from "react-dom";

import "./LoadingOverlay.css";

interface LoadingOverlayProps {
    isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
    const targetEl = document.getElementById("loading-overlay") as HTMLDivElement;

    const portal = createPortal((
        <div data-test="loading-overlay" className="loader-overlay">
            <span className="loader" />
        </div>
    ), targetEl);

    return isVisible && targetEl
        ? portal
        : null;
};
