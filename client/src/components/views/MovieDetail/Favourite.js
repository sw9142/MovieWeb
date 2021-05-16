import Axios from "axios";
import React, { useEffect, useState } from "react";
const {Button}  = require("antd")

function Favourite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavouriteNumber, setFavouriteNumber] = useState(0);
  const [Favourited, setFavourited] = useState(false);

  const data = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  useEffect(() => {
    Axios.post("/api/favourite/number", data).then((res) => {
      if (res.data.success) {
        setFavouriteNumber(res.data.data);
      } else {
        alert("Failed in delivering data");
      }
    });

    Axios.post("/api/favourite/favourited", data).then((res) => {
      console.log("/api/favoried in useEffect");
      if (res.data.success) {
        setFavourited(res.data.data);
        console.log(res.data.data)
      } else {
        alert("Failed in delivering data");
      }
    });
    
  }, []);

  const ToggleFavourite = () => {
    console.log("togglefaviourit!")
    console.log("favorited ?: ",Favourited)
    
    if (!Favourited) {
      Axios.post("/api/favourite/add", data).then((res) => {
    
        if (res.data.success) {
          console.log(res.data)
          setFavouriteNumber(FavouriteNumber + 1);
          setFavourited(!Favourited);
        } else {
          alert("Failed in adding faviourite");
        }
      });
    } else {
      Axios.post("/api/favourite/delete", data).then((res) => {
        if (res.data.success) {
          setFavouriteNumber(FavouriteNumber - 1);
          setFavourited(!Favourited);
        } else {
          alert("Failed in removing faviourite");
        }
      });
    }
  };

  return (
    <div>
   <Button onClick={ToggleFavourite}>{Favourited ? " Not Favorite" : "Add to Favorite "}  {FavouriteNumber}  </Button>
    </div>
  );
}

export default Favourite;
