import React, { useCallback, ButtonHTMLAttributes } from "react";
import { NEGATIVE_SOUND_ID, POSITIVE_SOUND_ID } from "./SoundsContainer";

export interface WithSoundProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    soundType: "positive" | "negative";
    onClick: () => void;
}

// todo: implement HOC such way, that sound is played on wrapped component click
// you can play sounds from SoundsContainer by getting those sounds by id or through the context - your choice
export function withSound<P extends WithSoundProps>(Component: React.FC<P>): React.FC<P> {
    const ButtonWithSound: React.FC<P> = ({ soundType, onClick, ...props }) => {
        const handleClick = useCallback(async () => {
            const positiveSoundEl = document.getElementById(POSITIVE_SOUND_ID) as HTMLAudioElement;
            const negativeSoundEl = document.getElementById(NEGATIVE_SOUND_ID) as HTMLAudioElement;
            soundType === "positive" ? await positiveSoundEl.play() : await negativeSoundEl.play();
            onClick();
        }, [onClick, soundType]);

        return <Component {...props as P} onClick={handleClick} />;
    };

    return ButtonWithSound;
}
