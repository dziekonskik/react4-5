import React from "react";
import { Language } from "../types";
import { useTranslation } from "./LanguageContext";

import "./LanguageSwitch.css";

const langToFlagMap: Record<Language, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
};

export const LanguageSwitchButton: React.FC = () => {
    const { currentLanguage, toggleLanguage } = useTranslation();

    return (
        <div
            data-test="land-switch-button"
            data-lang={currentLanguage}
            className="lang-switch"
            onClick={toggleLanguage}
        >{langToFlagMap[currentLanguage]}
        </div>
    );
};
