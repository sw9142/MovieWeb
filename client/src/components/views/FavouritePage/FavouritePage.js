import React, {useEffect, useState} from 'react'
import Axios from "axios"
import "./Favourite.css";
import {Popover} from "antd"
import {IMAGE_BASE_URL} from "../../Config"


export default function FavouritePage() {

const [Favourites, setFavourites] = useState([])


useEffect(() => {
   fetchData();
   
}, [])

const fetchData = () =>{
    Axios.post("/api/favourite/getfavourites", { userFrom : localStorage.getItem("userId") })
   .then((res)=>{
       if(res.data.success){
            setFavourites(res.data.data);   
       }else{
           alert("not able to find your favorite movies from DB")
       }
   })
}


const removeHandler = (userFrom, movieId) => {
const data = {
    userFrom, movieId
}

Axios.post("/api/favourite/deletefrompage", data).then((res)=>{
console.log(res.data);
fetchData();
})
}

const FavouriteList = Favourites.map((movie, index) => {

console.log(movie);
      return <tr key={index}>
        <Popover content={movie.moviePost ? <img src={`${IMAGE_BASE_URL}/w500/${movie.moviePost}`} ></img> : "No Image"} >
          <td>{movie.movieTitle}</td>
        </Popover>

      <td>{movie.movieRunTime} mins</td>
      <td><button onClick={() => {
removeHandler(movie.userFrom, movie.movieId);
      }}>Remove</button></td>

  </tr>
})

 



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>

                    {FavouriteList}
        
                </tbody>
            </table>
        </div>
    )
}
