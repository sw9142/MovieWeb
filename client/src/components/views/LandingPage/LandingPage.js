import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import ImageMain from "./Sections/ImageMain";
import GridCards from "../Common/Gridcards";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainImage, setMainImage] = useState(null);
  const [Page, setPage] = useState(0);

  useEffect(() => {
    const popularMovies = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(popularMovies);
  }, []);

  const fetchMovies = (popularMovies) => {
    fetch(popularMovies)
      .then((res) => res.json())
      .then((res) => {
        setMovies([...Movies, ...res.results]);
        setMainImage(res.results[0]);
        setPage(res.page);
      });
  };

  const loadNext = () => {

    const popularMovies = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      Page + 1
    }`;
    fetchMovies(popularMovies);
  };

  return (
    <>
      <div style={{ width: "100%", margin: "0" }}>
        {MainImage && (
          <ImageMain
            image={`${IMAGE_BASE_URL}/w1280/${MainImage.backdrop_path}`}
            title={MainImage.original_title}
            desc={MainImage.overview}
          />
        )}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2> Movies by latest</h2>
          <hr />

          {/* movies cards */}

          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <div key={index}>
                  <GridCards
                    id={movie.id}
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}/w500/${movie.backdrop_path}`
                        : null
                    }
                    title={movie.original_title}
                  />
                </div>
              ))}
          </Row>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadNext}>Load More...</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
