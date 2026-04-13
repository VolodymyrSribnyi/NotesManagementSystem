import {Link} from 'react-router-dom';
import { getStatusText } from '../utils/statusHelper';
import { useGetNotes,useDeleteNote } from '../api/useNotes';
const MOCK_NOTES = [
  { id: '1', name: 'Купити продукти', description: 'Молоко, хліб, яйця', status: 0 },
  { id: '2', name: 'Вивчити React', description: 'Пройти туторіал по TanStack Query', status: 1 },
];

export const NotesList = () => {
    const {data: notes, isLoading,isError} = useGetNotes();
    const {mutate: deleteNote} = useDeleteNote();
    if (isLoading) {
    return <div className="text-center mt-20 text-gray-500">Loading notes... ⏳</div>;
    }
    if (isError) {
    return <div className="text-center mt-20 text-red-500">Error connecting to the server. 🛑</div>;
    }
    return (
        <div className='max-w-4xl mx-auto p-4 mt-8'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>My notes</h1>
                <Link
                    to='/notes/new'
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors'
                >
                    + Create note
                </Link>
            </div>

            <div className='flex flex-col gap-4'>
                {notes?.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">You don't have any notes yet.</p>
                ) : (
                notes?.map((note: any) => (
                    <div
                        key={note.id}
                        className='bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                        >
                            <div className='flex justify-between items-start'>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{note.name}</h2>
                                    <span className="text-sm font-medium text-gray-500">
                                        Статус: {getStatusText(note.status)}
                                    </span>
                                    <p className="text-gray-600 mt-2">{note.description}</p>
                                </div>

                                <div className='flex gap-3 text-sm font-medium'>
                                    <Link
                                        to={`/notes/${note.id}/edit`}
                                        className='text-blue-600 hover:text-blue-800 hover:underline'>
                                        Edit
                                    </Link>
                                    <button className='text-red-600 hover:text-red-800 hover:underline'
                                        onClick ={() => {if(window.confirm("Are you sure?"))
                                                        deleteNote(note.id)}}>
                                    </button>
                                </div>
                            </div>
                    </div>
                )))}
            </div>
        </div>
    )
}