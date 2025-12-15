"use client";
import { Button } from "@/components/ui/button-custom";
import { ReactNode, TransitionFunction, useActionState } from "react";

type GeneralFormProps = {
    formAction: (state: any, payload: FormData) => any
    buttonTitle: string,
    children?: ReactNode | undefined
};

export function GeneralForm({
    formAction,
    buttonTitle,
    children
}: GeneralFormProps) {

    const [state, action, pending] = useActionState(formAction, null)

    return <form action={action}>
        {children}
        <Button pending={pending} caption={buttonTitle} type={'submit'} />
    </form>
}
