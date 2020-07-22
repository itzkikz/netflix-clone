import React, { useState } from "react";
import "./App.css";
import Row from "./Components/Row";
import requests from "./requests";
import Banner from "./Components/Banner";
import Nav from "./Components/Nav";

function App() {
  const [focus, setFocus] = useState("");

  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge
      />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="Top Rated"
        fetchUrl={requests.fetchTopRatedMovies}
      />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        focus={focus}
        focusInit={(test) => setFocus(test)}
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default App;
