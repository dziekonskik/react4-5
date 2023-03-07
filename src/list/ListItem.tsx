import React from "react";
import { ItemActions } from "./ItemActions";
import type { Note } from "../types";

interface ListItemProps {
    note: Note;
}

export const ListItem: React.FC<ListItemProps> = ({ note }) => {
    const { city, date, favouriteDish, grades, id } = note;
    return (
        <tr data-test="list-item" data-id={id}>
            <td data-test="list-item-city">{city}</td>
            <td data-test="list-item-date">{date}</td>
            <td data-test="list-item-dish">{favouriteDish.name}</td>
            <td data-test="list-item-grades">{grades.join(", ")}</td>
            <td data-test="list-item-actions"><ItemActions id={id} /></td>
        </tr>
    );
};
