import type { Note } from "./types";

export function uuid(): string {
    return Math.random().toString();
}

export function storageDate(date: string): string {
    return date.split("-").reverse().join("/");
}

export function inputDisplayDate(date: string): string {
    return date.split("/").reverse().join("-");
}

export function hasErrors(note: Note): boolean {
    const optionalFields = ["note"];
    return Object.entries(note).some(([key, value]) => {
        const valueHasLength = typeof value === "string" || Array.isArray(value);
        if (!optionalFields.includes(key) && valueHasLength && !value.length) {
            return true;
        }
        if (typeof value === "object") {
            return hasErrors(value);
        }
        return false;
    });
}
