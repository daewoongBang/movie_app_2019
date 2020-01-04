import React, { useState, useEffect } from "react";

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
    return <span>{state.title}</span>;
  } else {
    return null;
  }
};

export default MovieDetails;
