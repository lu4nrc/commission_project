import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Main from "./layouts/Main";
import Error from "./pages/error";
import Signup from "./pages/signup";
import { AuthProvider } from "./contexts/auth";
import Payments from "./pages/payments";
import Business from "./pages/business";
import Salesman from "./pages/salesman";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
         {
          path: "login",
          element: <Login />,
        }, 
         {
          path: "business",
          element: <Business />,
        }, 
        {
          path: "salesman",
          element: <Salesman />,
        },
        {
          path: "logout",
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "payments",
          element: <Payments />,
        },
      ],
    },
  ])
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export default App;
