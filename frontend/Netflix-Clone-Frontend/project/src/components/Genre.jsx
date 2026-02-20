import React, { useEffect, useState } from "react";
import "../Styles/Genre.css";
import axios from "axios";
import Navbar2 from "./Navbar2";
import api from './Api';
import { toast } from "react-toastify";




const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 80, name: "Crime" },
  { id: 53, name: "Thriller" },
  { id: 99, name: "Documentary" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const Genre = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedGenre) fetchMovies();
  }, [page, selectedGenre]);

  useEffect(()=>
  {
    setMovies([]);
    setPage(1);
  }, [selectedGenre]);

const fetchMovies = async () => {
  if(loading || page>totalPages)
    return;

  setLoading(true);
  try {
    const response = await api.get(
      "http://localhost:8080/api/movies/discover",
      {
        params: {
          genre: selectedGenre,
          page: page
        }
      }
    );

    setMovies(prev => [...prev, ...response.data.results]);
    setTotalPages(response.data.total_pages);

    toast.success("Movies fetched successfully!");

    setLoading(false);

  } catch (error) {
    console.error("Error fetching movies", error);
    toast.error("Failed to fetch movies");
  }
};

 React.useEffect(()=>
  {
    const handleScroll=()=>
    {
      const bottomReached=window.innerHeight + window.scrollY >= document.documentElement.scrollHeight-200;
      if(bottomReached && !loading)
      {
        setPage(prev=>prev+1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, movies]);

    const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleVideo = async (movieId) => {
    

    try {
      const response = await api.get(
        `http://localhost:8080/api/movies/${movieId}/trailer`
      );

      const trailer = response.data.results.find(
        video => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        const youtubeURL = `https://www.youtube.com/watch?v=${trailer.key}`;
        window.open(youtubeURL, "_blank");  
      } else {
        toast.info("Trailer not available 🎬");

      }

    } catch (error) {
      console.error("Error fetching video data:", error);
      toast.error("Failed to fetch trailer ");
    }
  };

  const handleFavorite=async(movieId)=>{
    try{
      await api.post(`/api/movies/${movieId}/favorites`);
      toast.success("Added to favorites ❤️");

    }
    catch(error)
    {
      console.error("Favorite error",error);
      toast.error("Failed to add to favorites");
    }
  }

  return (

    <div className="genre-container">
      
      <h2>Genres</h2>

      <ul className="genre-list">
        {genres.map((g) => (
          <li
            key={g.id}
            className="genre-item"
            onClick={() => {
              setSelectedGenre(g.id);
              setPage(1);
            }}
          >
            {g.name}
          </li>
        ))}
      </ul>

      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title} onClick={()=>handleVideo(movie.id)}
              />
               <button className="favorite-button" onClick={() => handleFavorite(movie.id)}>❤️</button>
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      )}
        <div className='pagination'>
        <button onClick={prev} disabled={page === 1}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={next} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Genre;
