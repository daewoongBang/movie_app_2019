import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Movie from "./Movie";
import "./MovieList.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        isLoading: true,
        data: [],
        error: null
      };
    case "SUCCESS":
      return {
        isLoading: false,
        data: action.data,
        error: null
      };
    case "ERROR":
      return {
        isLoading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const MovieList = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    data: null,
    error: null
  });

  const options = {
    url: "https://yts-proxy.now.sh/list_movies.json",
    method: "GET",
    params: {
      sort_by: "rating"
    }
  };

  // 비동기 함수 - 해당 함수를 기다려라
  const fetchMovies = async () => {
    dispatch({ type: "LOADING" });
    // axios가 끝날 때까지 기다렸다가 계속 진행.
    // movies.data.data.movies
    await axios(options)
      .then(response => {
        const {
          data: {
            data: { movies }
          }
        } = response;
        dispatch({ type: "SUCCESS", data: movies });
      })
      .catch(e => {
        dispatch({ type: "ERROR", error: e });
      });
  };

  // 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook.
  // 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 보아도 무방하다.
  useEffect(() => {
    fetchMovies();
  }, []);

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
