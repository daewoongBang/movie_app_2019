import React, { useState, useEffect } from "react";
import "./MovieDetails.css";

const MovieDetails = props => {
  const [state, setState] = useState(null);
  useEffect(() => {
    console.log(props);
    const { location, history } = props;
    if (location.state === undefined) {
      history.push("/"); // Home으로 Redirect
    } else {
      setState(location.state);
    }
  }, [props]);
  console.log(state);
  if (state !== null) {
    return (
      <div className="movie_details">
        <h1>{state.title}</h1>
        <div>{state.summary}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default MovieDetails;
