import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
const Login = lazy(() => import('./pages/Login.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Layout = lazy(() => import('./components/Layout.jsx'));
const Tv = lazy(() => import('./pages/Tv.jsx'))
const Movies = lazy(() => import('./pages/Movies.jsx'))
const Bookmark = lazy(() => import('./pages/Bookmark.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Details = lazy(() => import('./pages/Details.jsx'))
// import Login from './pages/Login.jsx';
// import SignUp from './pages/SignUp.jsx';
// import Home from './pages/Home.jsx';
// import Layout from './components/Layout.jsx'
// import Tv from './pages/Tv.jsx';
// import Movies from './pages/Movies.jsx'
// import Bookmark from './pages/Bookmark.jsx'
// import Profile from './pages/Profile.jsx'
// import Details from './pages/Details.jsx'



function App() {

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className='flex items-center justify-center min-h-screen bg-bgdarkb text-white'>Loading....</div>}>
          <div className="App min-w-screen min-h-screen">
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='tv' element={<Tv />} />
                <Route path='movies' element={<Movies />} />
                <Route path='bookmarks' element={<Bookmark />} />
                <Route path='profile' element={<Profile />} />
                <Route path=':id' element={<Details />} />
                <Route path='tv/:id' element={<Details />} />
                <Route path='movies/:id' element={<Details />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
