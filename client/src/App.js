import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
// import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { DarkModeContext } from "./context/darkModeContext";
import "./style.scss";
import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContext } from './context/authContext';

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoute>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6, backgroundColor: "#272727" }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </ProtectedRoute>
    </QueryClientProvider>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route exact index element={<Home />} />
        <Route exact path='/profile/:id' element={<Profile />} />
      </Route>
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<Login />} />
    </Routes>
  );
}


const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};


export default App;
