import React, { useEffect, useState } from "react";
import "../Styles/Shows.css";
import api from "./Api";
import { toast } from "react-toastify";


const Shows = () => {

  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShows();
  }, [page]);

  const fetchShows = async () => {
    if(loading || page>totalPages)
      return;

    setLoading(true);
    try {
      const response = await api.get("/api/movies/shows", {
        params: { page }
      });

      setShows(prev=>[...prev,...response.data.results]);
      setTotalPages(response.data.total_pages);

      toast.success("Shows fetched successfully!");

    } catch (error) {
      console.error("Shows error", error);
      toast.error("Failed to fetch shows");
    }
    setLoading(false);
  };

  React.useEffect(()=>
  {
    const handleScroll=()=>
    {
      const bottomReached=window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if(bottomReached && !loading)
      {
        setPage(prev=>prev+1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  
  const prev = () => {
    if (page > 1) setPage(p => p - 1);
  };

  const next = () => {
    if (page < totalPages) setPage(p => p + 1);
  };


  const handleVideo = async (showId) => {
    try {
      const response = await api.get(`/api/shows/${showId}/trailer`);

      const trailer = response.data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
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
      console.error("Trailer error", error);
    }
  };

  const handleFavorite=async(showId)=>{
    try{
      await api.post(`/api/movies/${showId}/favorites`);
      toast.success("Added to favorites ❤️");

    }
    catch(error)
    {
      console.error("Favorite error",error);
      toast.error("Failed to add to favorites");
    }
  }
  return (
    <div className="show-container">
      <h2>Popular TV Shows</h2>

      
      <div className="show-grid">
        {shows.map(show => (
          <div key={show.id} className="show">
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
              className="show_img"
              onClick={() => handleVideo(show.id)}
            />
             <button className="favorite-button" onClick={() => handleFavorite(show.id)}>❤️</button>
            <h3>{show.name}</h3>
          </div>
        ))}
      </div>

     
      <div className="pagination">
        <button onClick={prev} disabled={page === 1}>
          Previous
        </button>

        <span> Page {page} of {totalPages} </span>

        <button onClick={next} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Shows;
