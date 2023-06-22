import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from 'scenes/homePage/HomePage'; //this is the whole purpose of the jsconfig.json which allows us reference scenes instead of having to do relative imports like './scenes/homePage/HomePage'. // This means when we import different files into other files, we can just start from src
import LoginPage from 'scenes/loginPage/LoginPage';
import ProfilePage from 'scenes/profilePage/ProfilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/*Does a css reset for material ui */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
