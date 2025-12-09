"use server";
import { User } from "@shared/types";
import { revalidatePath } from 'next/cache'
import {redirect} from "next/navigation";

const URL = "http://localhost:5000/api/users/";

export async function fetchUsers() {
    const res = await fetch(URL);
    const data: User[] = await res.json();
    return data;
}

export async function getUser(id:string) {
    const res = await fetch(URL + id);
    const data: User = await res.json();
    return data;
}

export async function removeUser(id:string) {
    if (!id) return;
    const res = await fetch(URL + id, {
        method: 'DELETE',
    });

    console.log('res del = ', res)

    revalidatePath('/users')
    redirect('/users')
}

export async function addUser(_: void, formData: FormData) {
    const name = formData.get('name')
    if (!name) return;
    await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    revalidatePath('/users');
}