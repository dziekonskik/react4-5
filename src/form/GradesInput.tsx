import React, { useState, useCallback, useMemo } from "react";
import { Grade } from "./Grade";
import { ButtonWithSound } from "../sound/ButtonWithSound";
import "./GradesInput.css";

interface GradesProps {
    grades: number[];
    handleGrades: (grades: number[]) => void;
}

export const GradesInput: React.FC<GradesProps> = ({ grades, handleGrades }) => {
    const [currentGrade, setCurrentGrade] = useState("");

    const handleCurrentGrade = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentGrade(e.target.value);
    }, [setCurrentGrade]);

    const onGradeRemove = useCallback((index: number) => () => {
        const newGrades = grades.filter((_, i) => i !== index);
        handleGrades(newGrades);
    }, [grades, handleGrades]);

    const onAddGrade = useCallback(() => {
        const newCurrentGrade = Number(parseFloat(currentGrade).toFixed(2));

        const newGrades = [...grades, newCurrentGrade];
        handleGrades(newGrades);
        setCurrentGrade("");
    }, [handleGrades, currentGrade, grades]);

    const disableGradesButton = useMemo(() => {
        const newCurrentGrade = Number(parseFloat(currentGrade).toFixed(2));

        if (!newCurrentGrade || newCurrentGrade < 0.1 || newCurrentGrade > 10) { return true; }

        return false;
    }, [currentGrade]);

    return (
        <div>
            <div className="grades-input-container">
                <input
                    id="grades-field"
                    data-test="add-grade-input"
                    className="grades-input"
                    type="number"
                    min={0.1}
                    max={10}
                    placeholder="10"
                    value={currentGrade}
                    onChange={handleCurrentGrade}
                />
                <ButtonWithSound
                    dataTest="add-grade-button"
                    onClick={onAddGrade}
                    disabled={disableGradesButton}
                    translationKey="form.button.addGrade"
                    soundType="positive"
                />

            </div>
            <div className="grades-list">
                {grades.map((grade, index) =>
                    <Grade key={index} value={grade} onRemove={onGradeRemove(index)} />,
                )}
            </div>
        </div>
    );
};
