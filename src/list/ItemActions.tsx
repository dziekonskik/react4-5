import React, { useCallback, useEffect } from "react";
import { ButtonWithSound } from "../sound/ButtonWithSound";
import "./ItemActions.css";
import { TranslateText } from "../lang/TranslateText";
import { NetworkHandler } from "../network/NetworkHandler";
import { useRequest } from "../network/useRequest";
import { useOverlay } from "../context/OverlayContext";
import { useNoteReducer } from "../context/NoteReducerContext";

interface ItemActionsProps {
    id: string;
}

export const ItemActions: React.FC<ItemActionsProps> = ({ id }) => {
    const { makeRequest, isLoading: removalLoading } = useRequest(() => NetworkHandler.removeNote(id));
    const notes = useRequest(() => NetworkHandler.getNotes());
    const { handleEdit, handleReset } = useNoteReducer();

    const { setOverlay, overlay } = useOverlay();

    useEffect(() => {
        setOverlay(removalLoading);
    }, [removalLoading, setOverlay]);

    useEffect(() => {
        if (notes.response && !(notes.response instanceof Error)) {
            const foundNote = notes.response.find(r => r.id === id);
            if (foundNote) {
                handleEdit(foundNote);
            }
        }
    }, [notes.response, id, handleEdit]);

    const handleRemove = useCallback(() => {
        makeRequest();
        handleReset();
    }, [handleReset, makeRequest]);

    return (
        <div className="item-actions">
            <button data-test="edit-item-button" className="button button-small" disabled={overlay} onClick={notes.makeRequest}>
                <TranslateText translationKey="actions.edit" />
            </button>
            <ButtonWithSound
                dataTest="remove-item-button"
                className="button button-small"
                onClick={handleRemove}
                disabled={overlay}
                translationKey="actions.remove"
                soundType="negative"
            />

        </div>
    );
};
