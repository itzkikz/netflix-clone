import React, { useState, useEffect } from "react";
import instance from "../axios";
import "../Styles/Row.css";
import YouTube from "react-youtube";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLarge, focusInit, focus }) => {
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  var startTime;

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      const filtered = request.data.results.filter(function (el) {
        return (
          el.backdrop_path !== null &&
          el.poster_path !== undefined &&
          el.backdrop_path !== undefined
        );
      });
      setMovies(filtered);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const focusIn = (id, title, media_type) => {
    getTrailer(id, media_type);
    startTime = setTimeout(() => {
      focusInit(id + title);
    }, 1000);
  };

  async function getTrailer(id, media_type) {
    media_type = media_type === undefined ? "movie" : media_type;
    // fetch data from a url endpoint
    const trailerReq = await instance.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=a03ea1318f52e3e74dc23f6654649453`
    );
    trailerReq.data.results[0] === undefined
      ? setTrailerUrl("OuNJ8bkkoJM")
      : setTrailerUrl(trailerReq.data.results[0].key);

    return trailerReq;
  }

  const focusOut = () => {
    clearTimeout(startTime);
    focusInit("");
  };

  var elmnt = document.getElementsByClassName("row__poster");
  const opts = {
    height: elmnt.offsetHeight,
    width: elmnt.offsetWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0,
      controls: 0,
      enablejsapi: 1,
      modestbranding: 1,
      origin: "https://kikz-netflix-clone.web.app/",
    },
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div
        className={isLarge ? "row__postersLarge" : "row__posters"}
        onMouseLeave={isLarge ? () => {} : focusOut}
      >
        {movies.map((movie) => {
          if (focus !== movie.id + title) {
            return (
              <img
                onMouseEnter={
                  isLarge
                    ? () => {}
                    : () => {
                        focusIn(movie.id, title, movie?.media_type);
                      }
                }
                onMouseLeave={isLarge ? () => {} : focusOut}
                className={`row__poster ${isLarge && "row__posterLarge"}`}
                key={movie.id}
                src={
                  IMAGE_URL +
                  (isLarge ? movie.poster_path : movie.backdrop_path)
                }
                alt={movie.name}
              />
            );
          }
          return (
            <div
              key={movie.id}
              onMouseEnter={() => {
                focusIn(movie.id, title, movie?.media_type);
              }}
              onMouseLeave={focusOut}
              className="row__video"
            >
              <YouTube key={movie.id} videoId={trailerUrl} opts={opts} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
