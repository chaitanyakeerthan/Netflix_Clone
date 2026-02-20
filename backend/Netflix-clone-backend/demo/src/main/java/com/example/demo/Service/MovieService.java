package com.example.demo.Service;

import com.example.demo.Entity.Favorite;
import com.example.demo.Repository.FavoriteRepository;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

import static java.util.Arrays.stream;

@Service
@Transactional
public class MovieService {

    private final WebClient webClient;

    @Value("${tmdb.api.key}")
    private String apiKey;

    public MovieService(WebClient webClient) {
        this.webClient = webClient;
    }


    public String getMovies(String category, int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{category}")
                        .queryParam("api_key", apiKey)
                        .queryParam("page", page)
                        .build(category))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }


    public String getMovieTrailer(Long movieId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{id}/videos")
                        .queryParam("api_key", apiKey)
                        .build(movieId))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }


    public String discoverMovies(int genre, int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/discover/movie")
                        .queryParam("api_key", apiKey)
                        .queryParam("with_genres", genre)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }


    public String popularShows(int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/popular")
                        .queryParam("api_key", apiKey)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }


    public String getShowTrailer(Long showId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/tv/{id}/videos")
                        .queryParam("api_key", apiKey)
                        .build(showId))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public @Nullable String getAllMovies(int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/popular")
                        .queryParam("api_key", apiKey)
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public @Nullable String getSearch(String query) {


        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/multi")
                        .queryParam("api_key", apiKey)
                        .queryParam("query", query)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();


    }

    @Autowired
    private FavoriteRepository favoriteRepository;

    public @Nullable String favorites(long id) {

        if (favoriteRepository.existsByMovieId(id)) {
            return "movie already in favorites";
        }

        Favorite favorite = new Favorite();

        favorite.setMovieId(id);

        favoriteRepository.save(favorite);

        return "Movie added to favorites";

    }


    public List<Long> getFavorites() {
        return favoriteRepository.findAll()
                .stream()
                .map(Favorite::getMovieId)
                .toList();
    }


    public String getMovieById(long id) {
        return webClient.get()
                .uri("/movie/{id}?api_key={key}", id, apiKey)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public void deleteFavorites(Long movieId) {
        if (!favoriteRepository.existsByMovieId(movieId)) {
            throw new RuntimeException("Favorite not found");
        }
        favoriteRepository.deleteByMovieId(movieId);
    }

}

