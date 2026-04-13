import {createBrowserRouter} from 'react-router-dom';
import { NotesList } from './components/NotesList';
import { NoteCard } from './components/NoteCard';
import { EditNote } from './components/EditNote';
import { CreateNote } from './components/CreateNote';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <NotesList/>,
    },
    {
        path: '/notes/:id/get',
        element: <NoteCard/>,
    },
    {
        path: '/notes/:id/edit',
        element: <EditNote/>,
    },
    {
        path: '/notes/new',
        element: <CreateNote/>,
    },
])