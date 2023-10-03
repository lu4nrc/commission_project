import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import Main from './layouts/Main';
import Kanban from './pages/Kanban';
import Business from './pages/business';
import Dashboard from './pages/dashboard';
import Error from './pages/error';
import Login from './pages/login';
import Payments from './pages/payments';
import Salesman from './pages/salesman';
import Canva from './pages/Kanban/Canva';

function App() {
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
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
