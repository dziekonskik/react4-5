import React, { createContext, useState, useMemo, useCallback, useContext } from "react";
import { Language } from "../types";
import { TRANSLATIONS, TranslationKey } from "./translations";

interface LanguageState {
    currentLanguage: Language;
    toggleLanguage: () => void;
    getTranslatedValue: (key: string) => string;
}

const LanguageContext = createContext<LanguageState | null>(null);

interface LanguageProviderProps {
    children: React.ReactNode;
}

/*
 * todo: replace mock provider with real one
 * hint: TranslateText is used as component and main consumer of translation context
 * hint: LanguageSwitchButton is a component that uses the context to change the language
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

    const toggleLanguage = useCallback(() => {
        currentLanguage === "en" ? setCurrentLanguage("es") : setCurrentLanguage("en");
    }, [currentLanguage]);

    const getTranslatedValue = useCallback((key: TranslationKey) => TRANSLATIONS[currentLanguage][key], [currentLanguage]);

    const langageContextValue = useMemo(() => ({ currentLanguage, toggleLanguage, getTranslatedValue }),
        [currentLanguage, toggleLanguage, getTranslatedValue]);

    return <LanguageContext.Provider value={langageContextValue}>{children}</LanguageContext.Provider>;
};

export const useTranslation = () => {
    const lang = useContext(LanguageContext);

    if (!lang) {
        throw new Error("You forgot LanguageProvider!");
    }

    return lang;
};
