package com.example.demo.Repository;

import com.example.demo.Entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByMovieId(Long movieId);

    void deleteByMovieId(Long movieId);
}
