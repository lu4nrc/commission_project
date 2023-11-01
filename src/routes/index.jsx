import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Error from "../pages/error";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Business from "../pages/business";
import Salesman from "../pages/salesman";
import Payments from "../pages/payments";
import Kanban from "../pages/Kanban";
import Canva from "../pages/Kanban/Canva";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'business',
        element: <Business />,
      },
      {
        path: 'salesman',
        element: <Salesman />,
      },
      {
        path: 'logout',
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'payments',
        element: <Payments />,
      },
      {
        path: 'kanban',
        element: <Kanban />,
      },
      {
        path: 'kanban/canva/:canva_id',
        element: <Canva />,
      },
    ],
  },
]);

export default router;
