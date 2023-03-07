import React from "react";
import { NoteReducerContextProvider } from "./NoteReducerContext";
import { OverlayContextProvider } from "./OverlayContext";
import { LanguageProvider } from "../lang/LanguageContext";

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <LanguageProvider>
            <NoteReducerContextProvider>
                <OverlayContextProvider>
                    {children}
                </OverlayContextProvider>
            </NoteReducerContextProvider>
        </LanguageProvider>
    );
};
