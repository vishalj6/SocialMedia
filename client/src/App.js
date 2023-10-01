import { Outlet, Route, Routes } from 'react-router-dom';
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
import { RequireAuth } from 'react-auth-kit';

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route exact index element={<RequireAuth loginPath={'/login'}><Home /> </RequireAuth> } />
        <Route exact path='/profile' element={<RequireAuth loginPath={'/login'}> <Profile /> </RequireAuth>} />
      </Route>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
