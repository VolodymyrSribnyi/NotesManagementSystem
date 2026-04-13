import { useNavigate, useParams } from "react-router-dom"
import { NoteForm } from "./NoteForm"
import { useGetNote, useUpdateNote } from "../api/useNotes";
export const EditNote = () => {
    const navigate = useNavigate();
    const params = useParams();

    const {id} = params;
    if(!id)
            return(
        <div>Error Id is not found</div>
        )
    const {data: note, isLoading} = useGetNote(id);

    const{mutateAsync,isPending} = useUpdateNote();
    if (isLoading) {
        return <div className="text-center mt-20 text-gray-500">Loading notes... ⏳</div>;
    }
    const onSubmit = async(data: any) =>{
        
        console.log('Ready to be sent on backend:', data);
        try{
            await mutateAsync({id:id,updatedNote:data});
            navigate('/');
        }catch(error){
            console.log(error);
        }
            
    };

    return (
        
        <div className="max-w-2xl mx-auto p-4 mt-8">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-500 hover:text-gray-700 text-sm mb-4 inline-block"
                    >
                        Back to list
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Edit note</h1>
            </div>
            <NoteForm initialData={note} onSubmit={onSubmit} isLoading={isPending}/>
        </div>
    )
}