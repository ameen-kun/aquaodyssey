import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/user/Home'
import Bookings from './pages/user/Bookings'
import Profile from './pages/user/Profile'
import Blogs from './pages/user/Blogs'
import BackgroundVideo from './components/BackgroundVideo'
import Boats from './pages/user/Boats'
import AdminHome from './pages/admin/AdminHome'
import AdminProfile from './pages/admin/AdminProfile'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminBoats from './pages/admin/AdminBoats'
import AdminTransactions from './pages/admin/AdminTransactions'
import AdminBookings from './pages/admin/AdminBookings'
import { useSelector } from 'react-redux'
import { Suspense } from 'react'

function App() {
  const role = useSelector((state) => state.login.role);

  return (
    <div className='App'>
      <BackgroundVideo/>
      <Suspense fallback={<div>Loading....</div>}>

      <Routes>
        <Route element={<Landing />} path="/" />
        {role === "USER" && (
          <>
            <Route element={<Home />} path="/home" />
            <Route element={<Bookings />} path="/bookings" />
            <Route element={<Blogs />} path="/blogs" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Boats />} path="/boats" />
          </>
        )}
        {role === "ADMIN" && (
          <>
            <Route element={<AdminHome />} path="/home" />
            <Route element={<AdminProfile />} path="/profile" />
            <Route element={<AdminBlogs />} path="/blogs" />
            <Route element={<AdminBoats />} path="/boats" />
            <Route element={<AdminTransactions />} path="/transactions" />
            <Route element={<AdminBookings />} path="/bookings" />
          </>
        )}
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
