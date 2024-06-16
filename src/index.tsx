import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";

const App = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/movies/favourites'>Favourites</Link>
        </li>
        <li>
          <Link to='/movies/upcoming'>Upcoming</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/movies/favourites' element={<FavouriteMoviesPage />} />
        <Route path='/movies/:id' element={<MoviePage />} />
        <Route path='/movies/upcoming' element={<UpcomingMoviesPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
