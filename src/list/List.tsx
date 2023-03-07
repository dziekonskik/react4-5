import React, { useState, useEffect } from "react";
import { ListItem } from "./ListItem";
import { useRequest } from "../network/useRequest";
import { NetworkHandler } from "../network/NetworkHandler";
import { useOverlay } from "../context/OverlayContext";

import "./List.css";
import { TranslateText } from "../lang/TranslateText";
import type { Note } from "../types";

export const List: React.FC = () => {
    const [notes, setNotes] = useState<Error | Note[] | null>(null);
    const { makeRequest, response } = useRequest(() => NetworkHandler.getNotes());
    const { overlay } = useOverlay();

    useEffect(() => {
        if (!response || overlay) {
            makeRequest();
        }

        const responseError = response instanceof Error;
        if (!responseError) {
            setNotes(response);
        } else {
            console.log("Request failed:");
        }
    }, [makeRequest, response, overlay]);

    return (
        <table className="list">
            <thead>
                <tr>
                    <th><TranslateText translationKey="tableHeader.city" /></th>
                    <th><TranslateText translationKey="tableHeader.date" /></th>
                    <th><TranslateText translationKey="tableHeader.dish" /></th>
                    <th><TranslateText translationKey="tableHeader.grades" /></th>
                    <th style={{ width: "15rem" }}><TranslateText translationKey="tableHeader.actions" /></th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(notes) && notes.map(note => <ListItem note={note} key={note.id} />)}
            </tbody>
        </table>
    );
};
