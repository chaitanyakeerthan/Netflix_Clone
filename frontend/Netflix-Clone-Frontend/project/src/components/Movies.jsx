import React from 'react';
import '../Styles/Movies.css';
import api from './Api';
import { toast } from "react-toastify";


const Movies = () => {

  const [shows, setShows] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchShows();
  }, [page]);

  

  const fetchShows = async () => {
    if(loading || page>totalPages)
      return;

    setLoading(true);
    try {
      const response = await api.get("/api/movies/allmovies", {
        params: { page }
      });

      setShows(prev => [...prev, ...response.data.results]);
      setTotalPages(response.data.total_pages);

      toast.success("Movies fetched successfully!");

    } catch (error) {
      console.log("Error fetching shows", error);
      toast.error("Failed to fetch shows");
    }
    setLoading(false);
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
  }, [loading]);


  const prev = () => {
    if (page > 1) setPage(page - 1);
  };

  const next = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleVideo = async (movieId) => {
    try {
      const response = await api.get(`/api/movies/${movieId}/trailer`);

      const trailer = response.data.results.find(
        video => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        window.open(
          `https://www.youtube.com/watch?v=${trailer.key}`,
          "_blank"
        );
      } else {
        alert("Trailer not available");
      }

    } catch (error) {
      console.error("Error fetching trailer:", error);
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
    <div className='movie-container'>
      <h2> Popular Movies</h2>

      {shows.map(show => (
        <div key={show.id} className='movie'>
          <img
            src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
            alt={show.title}
            className="movie_img"
            onClick={() => handleVideo(show.id)}
          />
           <button className="favorite-button" onClick={() => handleFavorite(show.id)}>❤️</button>
          <h3>{show.title}</h3>
        </div>
      ))}

      <div className='pagination'>
        <button onClick={prev} disabled={page === 1}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={next} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Movies;
