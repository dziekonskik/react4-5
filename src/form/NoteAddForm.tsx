import React, { useEffect, useState } from "react";
import { GradesInput } from "./GradesInput";
import { ButtonWithSound } from "../sound/ButtonWithSound";
import { TranslateText } from "../lang/TranslateText";
import { useNoteReducer } from "../context/NoteReducerContext";
import { inputDisplayDate, hasErrors } from "../functions";
import { useRequest } from "../network/useRequest";
import { NetworkHandler } from "../network/NetworkHandler";
import { useOverlay } from "../context/OverlayContext";

import "./NoteAddForm.css";

import type { Note } from "../types";

export const NoteAddForm: React.FC = () => {
    const [editedNote, setEditedNote] = useState<Note>();
    const { state, handleCity, handleDate, handleDishName, handleDishNote, handleGrades, handleReset } = useNoteReducer();
    const { isLoading, makeRequest, response } =
    useRequest<Note[]>(() => editedNote ? NetworkHandler.editNote(state) : NetworkHandler.addNote(state));
    const notes = useRequest(() => NetworkHandler.getNotes());
    const { city, favouriteDish, grades, date } = state;
    const { overlay, setOverlay } = useOverlay();

    useEffect(() => {
        const responseError = response instanceof Error;
        const successfulResponse = response && !responseError;

        setOverlay(isLoading);

        if (responseError) {
            console.log("Request failed: and nothing else matters...");
        }

        if (successfulResponse) {
            handleReset();
        }
    }, [response, handleReset, isLoading, setOverlay]);

    useEffect(() => {
        if (!notes.response || overlay) {
            notes.makeRequest();
        }
        if (notes.response && !(notes.response instanceof Error)) {
            const foundNote = notes.response.find(note => note.id === state.id);
            setEditedNote(foundNote);
        }
    }, [notes, state.id, notes.response, overlay]);

    return (
        <div data-test="note-add-form">
            <h3 data-test="form-header">
                <TranslateText translationKey="form.header.add" />
            </h3>
            <label htmlFor="city-name">
                <TranslateText translationKey="form.label.city" />
            </label>
            <input
                data-test="form-city"
                type="text"
                placeholder="Kyiv"
                id="city-name"
                value={city}
                onChange={handleCity}
            />
            <label htmlFor="city-name">
                <TranslateText translationKey="form.label.favouriteDish" />
            </label>
            <input
                data-test="form-dish"
                type="text"
                placeholder="Chicken Kyiv"
                id="favourite-dish"
                value={favouriteDish.name}
                onChange={handleDishName}
            />
            <label htmlFor="note-field">
                <TranslateText translationKey="form.label.notes" />
            </label>
            <textarea
                data-test="form-dish-note"
                style={{ resize: "vertical" }}
                placeholder="Dear Slim, I wrote you but you still ain't callin'"
                id="note-field"
                value={favouriteDish.note}
                onChange={handleDishNote}
            />
            <label htmlFor="grades-field">
                <TranslateText translationKey="form.label.grades" />
            </label>
            <GradesInput grades={grades} handleGrades={handleGrades} />
            <label htmlFor="visit-date">
                <TranslateText translationKey="form.label.date" />
            </label>
            <input
                data-test="form-date"
                type="date"
                id="visit-date"
                onChange={handleDate}
                value={inputDisplayDate(date)}
            />
            <div className="submit-button-container">
                {response instanceof Error && (
                    <div className="form-error" data-test="form-error">
                        <TranslateText translationKey="form.error" />
                    </div>
                )}
                <ButtonWithSound
                    dataTest="form-save-button"
                    className="button-primary disabled"
                    type="submit"
                    value="Save note"
                    onClick={makeRequest}
                    disabled={hasErrors(state) || isLoading}
                    translationKey="form.button.save"
                    soundType="positive"
                />
            </div>
        </div>
    );
};
