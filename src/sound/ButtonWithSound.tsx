import React from "react";
import { withSound, WithSoundProps } from "./withSound";
import { TranslateText } from "../lang/TranslateText";

interface ButtonWithSoundProps extends WithSoundProps {
    translationKey: string;
    dataTest: string;
}

export const ButtonWithSound = withSound<ButtonWithSoundProps>(({ onClick, translationKey, dataTest, ...props }) => (
    <button {...props} onClick={onClick} data-test={dataTest}>
        <TranslateText translationKey={translationKey} />
    </button>
));
