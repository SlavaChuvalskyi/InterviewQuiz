'use client'
import { ChangeEvent } from "react";

export type OptionItem = {
    title: string;
    value: string;
}

type SelectProps = {
    id: string;
    options: OptionItem[];
    selectedOption?: OptionItem;
    labelTitle?: string;
    onChangeAction?: (e: ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    autocomplete?: "undefined";
    disabled?: boolean;
};

export default function Select(props: SelectProps) {
    const {
        id,
        options,
        selectedOption,
        labelTitle,
        onChangeAction,
        required = false,
        autocomplete = "undefined",
        disabled = false
    } = props;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChangeAction) {
            onChangeAction(e);
        }
    }

    return (
        <>
            <label htmlFor={id} className={`mb-1`}>
                {labelTitle}
                {required ? <span className={"error ml-1"}>*</span> : null}
            </label>
            <select
                id={id}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => handleChange(event)}
                disabled={disabled}
                autoComplete={autocomplete}
                className="bg-transparent border-none outline-none text-sm font-medium text-[var(--foreground)] cursor-pointer focus:ring-0"
            >
                {options.map((option) => (
                    <option key={option.value} selected={option.value === selectedOption?.value} value={option.value} className="bg-[var(--surface)] text-[var(--foreground)]">
                        {option.title}
                    </option>
                ))}
            </select>
        </>
    )
};