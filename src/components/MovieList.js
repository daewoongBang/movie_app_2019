import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./MovieList.css";
import useAsync from "./hook-custom/useAsync";

const getMovies = async () => {
  let movieList = null;
  const options = {
    url: "https://yts-proxy.now.sh/list_movies.json",
    method: "GET",
    params: {
      sort_by: "rating"
    }
  };

  await axios(options).then(response => {
    const {
      data: {
        data: { movies }
      }
    } = response;
    movieList = movies;
  });
  return movieList;
};

const MovieList = () => {
  const [state, refetch] = useAsync(getMovies, []);

  // console.log(state);
  const { isLoading, data: movies, error } = state;

  if (error) return <div>에러가 발생했습니다.</div>;
  if (!movies) return null;

  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map(movie => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieList;
