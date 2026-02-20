import React from 'react'
import axios from 'axios';
import '../Styles/Search.css';
import api from './Api';
import { toast } from "react-toastify";

const Search = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading,setLoading]=React.useState(false);
 
  React.useEffect(()=>
  {
    setResults([]);
    setQuery("");
  }, [])

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    const res = await api.get("/api/movies/search", {
      params: { query }
    });

    setResults(prev=>[...prev,...res.data.results]);
    setLoading(false);
  };
  React.useEffect(()=>
  {
    const handleScroll=()=>
    {
      const bottomReached=window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if(bottomReached && !loading && results.length >0)
      {
        setLoading(prev=>prev+1);
      }
    }
    window.addEventListener("scroll",handleScroll);
    return ()=> window.removeEventListener("scroll",handleScroll);
  },[loading,results])

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
      toast.info("Trailer not available 🎬");

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
   <div className='SearchPage'>

  <div className="SearchBar">
    <input
      type="text"
      placeholder='Search for movies or shows...'
      className='SearchInput'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

    <button className='SearchButton' onClick={handleSearch}>
      Search
    </button>
  </div>

  <div className="SearchResults">
    {results.map((item) => (
      <div key={item.id} className="ResultCard">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title || item.name} onClick={() => handleVideo(item.id)}
        />
         <button className="favorite-button" onClick={() => handleFavorite(item.id)}>❤️</button>
        <h4>{item.title || item.name}</h4>
      </div>
    ))}
  </div>

</div>

  )
}

export default Search;
