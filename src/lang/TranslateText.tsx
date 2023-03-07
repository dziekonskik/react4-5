import React from "react";
import { TranslationKey } from "./translations";
import { useTranslation } from "./LanguageContext";

interface TranslateTextProps {
    translationKey: TranslationKey;
}

// todo: use LanguageContext to get translated value
export const TranslateText: React.FC<TranslateTextProps> = ({ translationKey }) => {
    const { getTranslatedValue } = useTranslation();

    const translated = getTranslatedValue(translationKey);

    return (
        <span data-test="translated-text" data-test-key={translationKey}>{translated}</span>
    );
};
