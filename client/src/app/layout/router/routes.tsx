import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../../../features/activities/dashboard/home/HomePage";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../../features/activities/dashboard/form/ActivityForm";
import ActivityDetailPage from "../../../features/activities/dashboard/details/ActivityDetailPage";
import Counter from "../../../features/activities/dashboard/counter/Counter";
import TestErrors from "../../../features/activities/dashboard/errors/TestErrors";
import NotFound from "../../../features/activities/dashboard/errors/NotFound";
import ServerError from "../../../features/activities/dashboard/errors/ServerError";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetailPage />},
            {path: 'createActivity', element: <ActivityForm key='create' />},
            {path: 'manage/:id', element: <ActivityForm />},
            {path: 'counter', element: <Counter />},
            {path: 'errors', element: <TestErrors/> },
            {path: 'not-found', element: <NotFound/> },
            {path: 'server-error', element: <ServerError /> },
            {path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])