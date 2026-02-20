import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ActualHome from './components/ActualHome';
import Genre from './components/Genre';
import Shows from './components/Shows';
import Movies from './components/Movies';
import BeginnerHome from './components/BeginnerHome';
import Navbar2 from './components/Navbar2';
import Protected from './Auth/Protected';
import Paypal from './components/Paypal';
import Search from './components/Search';
import Favorites from './components/favorites';

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <Navbar2 />

      <Routes className="app-content">
        <Route
          path="/"
          element={token ? <Navigate to="/ActualHome" /> : <BeginnerHome />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/ActualHome" /> : <Login />}
        />

        <Route
          path="/signup"
          element={token ? <Navigate to="/ActualHome" /> : <SignUp />}
        />

        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />

        <Route
          path="/ActualHome"
          element={
            <Protected>
              <ActualHome />
            </Protected>
          }
        />

        <Route
          path="/genre"
          element={
            <Protected>
              <Genre />
            </Protected>
          }
        />

        <Route
          path="/shows"
          element={
            <Protected>
              <Shows />
            </Protected>
          }
        />

        <Route
          path="/movies"
          element={
            <Protected>
              <Movies />
            </Protected>
          }
        />

        <Route
          path="/favorites"
          element={
            <Protected>
              <Favorites />
            </Protected>
          }
        />

        <Route
          path="/paypal"
          element={
            <Protected>
              <Paypal />
            </Protected>
          }
        />

        <Route
          path="/search"
          element={
            <Protected>
              <Search />
            </Protected>
          }
        />
      </Routes>

      {/* ✅ ToastContainer MUST be here */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}


export default App;
