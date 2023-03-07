import React, { createContext, useContext, useMemo, useState } from "react";

import type { RefreshApp } from "./types";

const OverlayContext = createContext<RefreshApp | null>(null);

interface OverlayContextProviderProps {
    children: React.ReactNode;
}

export const OverlayContextProvider: React.FC<OverlayContextProviderProps> = ({ children }) => {
    const [overlay, setOverlay] = useState(false);

    const refetchContext = useMemo(() => ({ overlay, setOverlay }), [overlay]);

    return (
        <OverlayContext.Provider value={refetchContext}>
            {children}
        </OverlayContext.Provider>
    );
};

export const useOverlay = () => {
    const overlay = useContext(OverlayContext);

    if (!overlay) {
        throw new Error("You forgot OverlayContextProvider!");
    }

    return overlay;
};
