import { useNavigate } from "react-router-dom"
import { NoteForm } from "./NoteForm"
import { useCreateNote } from "../api/useNotes";

export const CreateNote = () => {
    const navigate = useNavigate();
    const {mutateAsync,isPending} = useCreateNote();

     const onSubmit = async(data: any) =>{
        console.log('Ready to be sent on backend:', data);
        try{
            await mutateAsync(data);
            navigate('/');
        }catch(error){
            console.log(error);
        }
            
    };

    return(
        <div className="max-w-2xl mx-auto p-4 mt-8">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-500 hover:text-gray-700 text-sm mb-4 inline-block"
                    >
                        Back to list
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Створити нотатку</h1>
            </div>
            <NoteForm onSubmit={onSubmit} isLoading={isPending}/>
        </div>
    )
}