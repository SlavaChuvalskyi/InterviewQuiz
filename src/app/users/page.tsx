'use server'
import { User } from '@shared/types';
import {fetchUsers} from "@/api/users";
import {GeneralForm} from "@/ui/form";
import Link from "next/link";
import {addUser} from "@/api/users";

type MyFormData = {
    name: string
}

export default async function Users() {

    const users:User[] = await fetchUsers();

    return (
     <div className={'p-4'}>
         <h1>Users</h1>
         <a href='mailto:"slavachuval@gmail.com"' target={'_blank'}>slavachuval@gmail.com</a>
         <ul>
             {users.map(u => (
                 <li key={u.id}>
                     <Link
                         href={`/users/${u.id}`}
                     >
                        {u.name}
                     </Link>
                 </li>
             ))}
         </ul>
         <GeneralForm<MyFormData>
             buttonTitle={'Add User'}
             formAction={addUser}
         >
             <input
                 id={'name'}
                 name={'name'}
                 type="text"
                 defaultValue={''}
                 placeholder="New user name"
             />
         </GeneralForm>
     </div>
    );
}