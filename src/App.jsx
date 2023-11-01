import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import router from './routes';

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <ThemeSettings>
            <RouterProvider router={router} />
          </ThemeSettings>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
