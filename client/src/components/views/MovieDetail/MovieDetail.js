import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import ImageMain from "../LandingPage/Sections/ImageMain";
import MovieDesc from "./MovieDesc/MovieDesc";
import GridCards from "../Common/Gridcards";
import Favourite from "./Favourite";
import { Row } from "antd";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Actor, setActor] = useState([]);
  const [ToggleActors, setToggleActors] = useState(false);


  useEffect(() => {
    const endPointMovieDetail = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    fetch(endPointMovieDetail)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
        console.log("Res:", res)
      });

    setMovie();

    fetch(endPointCrew)
      .then((res) => res.json())
      .then((res) => {
        setActor(res.cast);
      });

    setMovie();
  }, []);

  const toggleActors = () => {
    console.log("toggle actor clicked!");
    setToggleActors(!ToggleActors);
  };

  

  return (
    <React.Fragment>
      <div>
        {Movie && (
          <ImageMain
            image={`${IMAGE_BASE_URL}/w1280/${Movie.backdrop_path}`}
            title={Movie.original_title}
            desc={Movie.overview}
          />
        )}
      </div>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{display:"flex", justifyContent: "flex-end"}}>
        {Movie &&  <Favourite  movieId={movieId} userFrom={localStorage.getItem("userId")} movieInfo={Movie} />}
        </div>

        {Movie && <MovieDesc movie={Movie} />}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActors}>Toggle Actor view</button>
        </div>

        {ToggleActors && (
          <Row gutter={[16, 16]}>
            {Actor &&
              Actor.map((actor, index) => (
                <div key={index}>
                  <GridCards
                    actor={true}
                    image={
                      actor.profile_path
                        ? `${IMAGE_BASE_URL}/w500/${actor.profile_path}`
                        : "/noProfile.jpg"
                    }
                    name={actor.name}
                  />
                </div>
              ))}
          </Row>
        )}
      </div>
      </React.Fragment>
  );
}

export default MovieDetail;
