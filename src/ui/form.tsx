"use client";
import {Button} from "@/ui/button";
import {ReactNode, TransitionFunction, useActionState} from "react";

type GeneralFormProps<T> = {
    formAction: TransitionFunction<void, T>
    buttonTitle: string,
    children?: ReactNode|undefined
};

export function GeneralForm<T extends Record<string, any>>({
    formAction,
    buttonTitle,
    children
}: GeneralFormProps<T>) {

    const [state, action, pending] = useActionState(formAction, null)

    return <form action={action}>
            {children}
            <Button pending={pending} caption={buttonTitle} type={'submit'}/>
        </form>
}
