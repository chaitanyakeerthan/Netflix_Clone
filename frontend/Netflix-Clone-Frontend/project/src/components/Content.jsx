import React, { useEffect, useState } from "react";
import "../Styles/Home-content.css";
import api from "./Api";
import { toast } from "react-toastify";


const Content = () => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("popular");
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    fetchMovies();
  }, [page, category]);

  useEffect(()=>{
    setMovies([]);
    setPage(1);
  },[category]);

  const fetchMovies = async () => {

    if(loading || page>totalPages) 
      return;

    setLoading(true);
    try {
      const response = await api.get("/api/movies", {
        params: { category, page }
      });

      setMovies(prev=>[...prev,...response.data.results]);
      setTotalPages(response.data.total_pages);

    } catch (error) {
      console.error("Error fetching movies", error);
      toast.error("Failed to fetch movies");
    }
    setLoading(false);
  };
  useEffect(()=>{
    const handleScroll=()=>
    {
      const bottomReached=window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if(bottomReached && !loading )
      {
        setPage(prev=>prev+1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[loading]);

  const handleVideo = async (movieId) => {
    try {
      const response = await api.get(`/api/movies/${movieId}/trailer`);

      const trailer = response.data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        toast.info("Trailer not available 🎬");

      }
    } catch (error) {
      console.error("Trailer error", error);
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
    <div className="page-container">

      <div className="category-Buttons">
        <button onClick={() => setCategory("popular")}>Popular</button>
        <button onClick={() => setCategory("top_rated")}>Top Rated</button>
        <button onClick={() => setCategory("upcoming")}>Upcoming</button>
        <button onClick={() => setCategory("now_playing")}>Now Playing</button>
      </div>

      <div className="Home-content">
        {movies.map(movie => (
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handleVideo(movie.id)}
            />
            <button className="favorite-button" onClick={() => handleFavorite(movie.id)}>❤️</button>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Content;
