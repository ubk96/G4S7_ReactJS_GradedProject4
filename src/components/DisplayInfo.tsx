import data from './../Data/data.json'
import React from 'react'
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './DisplayInfo.css'
export default function DisplayDetails() {
    const { id } = useParams()
    let movie;

    if (id !== undefined && parseInt(id) > 369)
        movie = data.top_rated_movies.find((x: any) => x.id === id);
    if (id !== undefined && parseInt(id) < 369 && parseInt(id) > 120)
        movie = data.top_rated_india.find((x: any) => x.id === id);
    if (id !== undefined && parseInt(id) > 95 && parseInt(id) < 370)
        movie = data.movies_in_theaters.find((x: any) => x.id === id);
    if (id !== undefined && parseInt(id) < 96)
        movie = data.movies_coming.find((x: any) => x.id === id);

    console.log(movie)
    return (
        <>
            <Card className='card-in-displayInfo'>
                <Card.Img className='card-in-displayInfo-img' variant="top" src={movie?.posterurl} style={{ width: '18rem', height:'20rem', margin: '2px' }} />
                <Card.Body>
                    <Card.Text style={{fontFamily: "Lucida Console"}}>
                        Title &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{movie?.title} <br/>
                        IMDB Rating &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{movie?.imdbRating}  <br/>
                        Content Rating&nbsp;&nbsp;&nbsp;:{movie?.contentRating}  <br/>
                        Average Rating&nbsp;&nbsp;&nbsp;:{movie?.averageRating}  <br/>
                        Duration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{movie?.duration}  <br/>
                        Genres &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{movie?.genres.map((genre)=>(
                            genre + ", "
                        ))}  <br/>
                        Actors &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{movie?.actors.map((actor)=>(
                            actor + ", "
                        ))}  <br/>
                        Story Line &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{movie?.storyline}  <br/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}