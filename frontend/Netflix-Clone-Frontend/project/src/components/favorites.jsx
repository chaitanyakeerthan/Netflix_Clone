import React, { useEffect, useState } from "react";
import "../Styles/Favorite.css";
import Api from "./Api";
import { toast } from "react-toastify";


const Favorites = () => {

  const [movieIds, setMovieIds] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const fetchFavoriteIds = async () => {
    try {
      const response = await Api.get("/api/movies/favorites");
      setMovieIds(response.data); 
    } catch (error) {
      console.error("Error fetching favorite IDs:", error);
      toast.error("Failed to fetch favorite IDs");
    }
  };

  useEffect(() => {
    fetchFavoriteIds();
  }, []);

  
  useEffect(() => {
    if (movieIds.length === 0) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          movieIds.map(id => Api.get(`/api/movies/${id}`))
        );
        toast.success("Fetched favorite movies successfully!");

        setMovies(responses.map(res => res.data));
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch movies");
      }
      setLoading(false);
    };

    fetchMovies();
  }, [movieIds]);

  
  const handleVideo = async (movieId) => {
    try {
      const response = await Api.get(`/api/movies/${movieId}/trailer`);
      const trailer = response.data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        window.open(
          `https://www.youtube.com/watch?v=${trailer.key}`,
          "_blank"
        );
      } else {
        toast.info("Trailer not available 🎬");
      }
    } catch (error) {
      console.error("Trailer error", error);
      toast.error("Failed to fetch trailer ");
    }
  };

  const handleRemoveFavorites = async (movieId) => {
  try {
    await Api.delete(`/api/movies/${movieId}/favorites`);
setMovies(prev => prev.filter(m => m.id !== movieId));
setMovieIds(prev => prev.filter(id => id !== movieId));


    toast.success("Removed from favorites");
  } catch (error) {
    console.error("Error removing from favorites:", error);
    toast.error("Failed to remove favorite ❌");

  }
};


  return (
    <div className="favorites">
      <h2>My Favorites ❤️</h2>

      {loading && <p>Loading...</p>}

      {movies.length === 0 && !loading ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="favorites-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => handleVideo(movie.id)}
              />
              <h3>{movie.title}</h3>
              <button className="remove-favorite button" onClick={()=>{handleRemoveFavorites(movie.id)}}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
