import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MediaDetailsPage from "./pages/mediaDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MediaReviewPage from "./pages/mediaReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MediaContextProvider from "./contexts/mediaContext";
import MostPopularMoviesPage from "./pages/mostPopularMoviesPage";
import TVSeriesPage from "./pages/tvSeriesPage";
import FavouriteTVSeriesPage from "./pages/favouriteTVSeriesPage";
import ActorsPage from "./pages/actorsPage";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import ReviewFormPage from "./pages/reviewFormPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MediaContextProvider>
          <Routes>
            <Route path='/movies/favourites' element={<FavoriteMoviesPage />} />
            <Route path='/movies/:id' element={<MediaDetailsPage />} />
            <Route path='/movies/upcoming' element={<UpcomingMoviesPage />} />
            <Route path='/movies/popular' element={<MostPopularMoviesPage />} />
            <Route path='/tvseries' element={<TVSeriesPage />} />
            <Route path='/tvseries/:id' element={<MediaDetailsPage />} />
            <Route
              path='/tvseries/favourites'
              element={<FavouriteTVSeriesPage />}
            />
            <Route path='/actors' element={<ActorsPage />} />
            <Route path='/actors/:id' element={<MediaDetailsPage />} />
            <Route
              path='/actors/favourites'
              element={<FavouriteActorsPage />}
            />
            <Route path='/reviews/:id' element={<MediaReviewPage />} />
            <Route path='/reviews/form' element={<ReviewFormPage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </MediaContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
