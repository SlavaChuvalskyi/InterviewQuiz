import {removeUser, getUser} from "@/api/users";
import {GeneralForm} from "@/ui/form";

type UserProps = {
    params: { id: string };
};

export default async function User({ params }: UserProps) {

    const { id } = await params;

    // Get user information
    const user = await getUser(id)

    // Server action
    async function submitForm() {
        'use server'
        await removeUser(id)
    }

    return (
     <div className={'p-4'}>
         <h1>{user.name}</h1>
         <h4>{id}</h4>

         <GeneralForm
             buttonTitle={'Remove User'}
             formAction={submitForm}
         />
     </div>
    );
}
