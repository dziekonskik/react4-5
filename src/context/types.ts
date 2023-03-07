import type { Note } from "../types";

export type NotesActions = {
    type: "constructNote";
    payload: {
        name: keyof Note;
        value:
        | string
        | number[]
        | {
            name: string;
            note?: string;
        };
    };
} | {
    type: "resetState";
} | {
    type: "edit";
    payload: Note;
};

export type FormAction<E> = ({ target }: React.ChangeEvent<E>) => void;

export interface NotesContext {
    readonly state: Note;
    readonly handleCity: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
    readonly handleDate: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
    readonly handleDishName: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
    readonly handleDishNote: ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly handleGrades: (grades: number[]) => void;
    readonly handleReset: () => void;
    readonly handleEdit: (noteToEdit: Note) => void;
}

export interface RefreshApp {
    readonly overlay: boolean;
    readonly setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}
