package com.example.demo.Controller;

import com.example.demo.Entity.Favorite;
import com.example.demo.Service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // 🎬 Movies (popular, top_rated, upcoming, now_playing)
    @GetMapping
    public ResponseEntity<String> getMovies(
            @RequestParam String category,
            @RequestParam int page) {

        List<String> allowed = List.of(
                "popular",
                "top_rated",
                "upcoming",
                "now_playing"
        );

        if (!allowed.contains(category)) {
            return ResponseEntity.badRequest().body("Invalid category");
        }

        return ResponseEntity.ok(
                movieService.getMovies(category, page)
        );
    }

    // 🎞 Movie Trailer
    @GetMapping("/{movieId}/trailer")
    public ResponseEntity<String> movieTrailer(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieTrailer(movieId)
        );
    }

    // 🔍 Discover
    @GetMapping("/discover")
    public ResponseEntity<String> discoverMovies(
            @RequestParam int genre,
            @RequestParam int page) {

        return ResponseEntity.ok(
                movieService.discoverMovies(genre, page)
        );
    }

    // 📺 TV Shows
    @GetMapping("/shows")
    public ResponseEntity<String> popularShows(
            @RequestParam int page) {

        return ResponseEntity.ok(
                movieService.popularShows(page)
        );
    }
    @GetMapping("/allmovies")
    public ResponseEntity<String> showMovies(@RequestParam int page){
        return ResponseEntity.ok(movieService.getAllMovies(page));
    }

    @GetMapping("/search")
    public ResponseEntity<String> getSearch(@RequestParam String query)
    {
        return ResponseEntity.ok(movieService.getSearch(query));
    }
    @PostMapping("/{id}/favorites")
    public ResponseEntity<String> favorites(@PathVariable long id) {
        return ResponseEntity.ok(movieService.favorites(id));
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<Long>> getFavorites() {
        return ResponseEntity.ok(movieService.getFavorites());
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getMovie(@PathVariable long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }
    @DeleteMapping("/{movieId}/favorites")
    public ResponseEntity<Void> deleteFavorites(@PathVariable Long movieId) {
        movieService.deleteFavorites(movieId);
        return ResponseEntity.noContent().build();
    }

}
