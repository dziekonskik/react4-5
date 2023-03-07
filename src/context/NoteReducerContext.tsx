import React, { useReducer, useCallback, createContext, useContext, useMemo } from "react";
import { storageDate, uuid } from "../functions";

import type { Note } from "../types";
import type { FormAction, NotesActions, NotesContext } from "./types";

const INITIAL_STATE: Note = {
    city: "",
    date: "",
    favouriteDish: {
        name: "",
        note: "",
    },
    grades: [],
    id: uuid(),
};

const NoteReducerContext = createContext<NotesContext | null>(null);

function reducer(state: Note, action: NotesActions): Note {
    switch (action.type) {
        case "constructNote":
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        case "resetState":
            return { ...INITIAL_STATE, id: uuid() };
        case "edit":
            return action.payload;
        default:
            return state;
    }
}

interface NotesReducerContextProps {
    children: React.ReactNode;
}

export const NoteReducerContextProvider: React.FC<NotesReducerContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { favouriteDish } = state;

    const handleCity: FormAction<HTMLInputElement> = useCallback(({ target }) => {
        dispatch({ type: "constructNote", payload: { name: "city", value: target.value } });
    }, []);
    const handleDate: FormAction<HTMLInputElement> = useCallback(({ target }) => {
        const formattedDate = storageDate(target.value);
        dispatch({ type: "constructNote", payload: { name: "date", value: formattedDate } });
    }, []);
    const handleDishName: FormAction<HTMLInputElement> = useCallback(({ target }) => {
        dispatch({
            type: "constructNote",
            payload: {
                name: "favouriteDish",
                value: {
                    name: target.value,
                    note: favouriteDish.note,
                },
            },
        });
    }, [favouriteDish.note]);
    const handleDishNote: FormAction<HTMLTextAreaElement> = useCallback(({ target }) => {
        dispatch({
            type: "constructNote",
            payload: {
                name: "favouriteDish",
                value: {
                    name: favouriteDish.name,
                    note: target.value,
                },
            },
        });
    }, [favouriteDish.name]);
    const handleGrades = useCallback((grades: number[]) => {
        dispatch({ type: "constructNote", payload: { name: "grades", value: grades } });
    }, []);
    const handleReset = useCallback(() => {
        dispatch({ type: "resetState" });
    }, []);
    const handleEdit = useCallback((noteToEdit: Note) => {
        dispatch({ type: "edit", payload: noteToEdit });
    }, []);

    const providerValue = useMemo(() => {
        return {
            state,
            handleCity,
            handleDate,
            handleDishName,
            handleDishNote,
            handleGrades,
            handleReset,
            handleEdit,

        };
    }, [handleCity, handleDate, handleDishName, handleDishNote, handleGrades, handleEdit, handleReset, state]);

    return (
        <NoteReducerContext.Provider value={providerValue}>
            {children}
        </NoteReducerContext.Provider>
    );
};

export const useNoteReducer = () => {
    const note = useContext(NoteReducerContext);

    if (!note) {
        throw new Error("You forgot NotesReducerContextProvider");
    }

    return note;
};
