import {useState} from 'react';
import { Row, Col, Card, Container} from 'react-bootstrap';
import data from '../json/data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import IMovie from '../models/IMovie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

type Props = {
    typeOfMovie: string | 'movies-in-theaters' | 'movies-coming' | 'top-rated-india' | 'top-rated-movies' | 'favourites',
    isFavourites: boolean,
    searchText : string | null
}

const MoviesList= ({typeOfMovie, isFavourites
    , searchText} : Props) =>
{      
// console.log(searchText);
   let  searchResultData = [] as IMovie[];
   
    
const [ favouritesList, setFavouriteslist ] = useState<{ movie: IMovie, favouritess : number }[]>( [] );
const [ showMovieList, setShowMovieList ] = useState<boolean>(false);
const [ movieDetails, setMovieDetails ] = useState<IMovie | null>(null);
const [imageIsOpen , setImageIsOpen] = useState<boolean>(false);

const addToFavourites
 = (movieValue : IMovie) =>
{
    const movie = {
        title : movieValue.title as string,  
        posterurl :  movieValue.posterurl as string,
        genres :  movieValue.genres as string[],
        ratings : movieValue.ratings as number[],
        contentRating : movieValue.contentRating as string,
        averageRating : movieValue.averageRating as number,
        actors : movieValue.actors as string[],
        imdbRating : movieValue.imdbRating as number
    } as Omit<IMovie, 'id | poster | duration| releaseDate |  originalTitle'>;
   
    const match = favouritesList.find(
        p => p.movie.title === movieValue.title
        && p.movie.posterurl === movieValue.posterurl
    );
    if(!match){
    setFavouriteslist([
        ...favouritesList,
        {
            movie,
            favouritess: 1
        }
    ]);
    toast.success('Movie added to favourites!', {
        position: "top-right",        autoClose: 3000,        hideProgressBar: true,
        closeOnClick: true,        pauseOnHover: false,        draggable: true,
        progress: 0,        });
}
else
{
    toast.error(' Movie already exist in favorites', {
        position: "top-right",        autoClose: 3000,        hideProgressBar: true,
        closeOnClick: true,        pauseOnHover: true,        draggable: true,
        progress: 0,        });
}
}

const removeFromFavourites
 = (movie : IMovie) =>
{
    const  newFavourites
     = [] as { movie: IMovie, favourites
         : number  }[];

    favouritesList.forEach(
        p => {
            if( p.movie.title !== movie.title &&  p.movie.posterurl !== movie.posterurl) {
                newFavourites.push(p);
            }
        }
    );

    setFavouriteslist(newFavourites);
   
    toast.success(' Movie removed from favorite', {
        position: "top-right",        autoClose: 3000,        hideProgressBar: true,
        closeOnClick: true,        pauseOnHover: true,        draggable: true,
        progress: 0,        });

}
    
 if(searchText != null)
 {
    searchResultData = [] as IMovie[];
    if(isFavourites
        )
    {
        searchResultData = [] as IMovie[];
        console.log(isFavourites
            );
        console.log(searchText);
        favouritesList.forEach(
            p => {
                if(p.movie.title.toLowerCase().startsWith(searchText.toLowerCase())) {
                    searchResultData.push( p.movie );
                }
            }
        );
    }
    else {
        console.log(isFavourites
            );
    console.log(searchText);
    data[typeOfMovie].forEach((p: IMovie) => {
            if(  p.title.toLowerCase().startsWith(searchText.toLowerCase())) {
                searchResultData.push( p as IMovie);
            }
        }
    );
    }
 }
 else
 {
    
    if(isFavourites)
    {
        favouritesList.forEach(
            p => {
                if( true) {
                    searchResultData.push( p.movie );
                }
            }
        );        
    }
    else
    {
        searchResultData = data[typeOfMovie] as IMovie[];
    }
 }

 const showMovieDetails = (movie : IMovie) =>
 {
    
    setShowMovieList(true);
    setMovieDetails(movie);
 }

 const backToHome = () =>
 {
    setShowMovieList(false);
    setMovieDetails(null);
    typeOfMovie= 'movies-in-theaters';
 }


 const handleShowDialog = () =>
 {
    console.log(!imageIsOpen)
    setImageIsOpen(!imageIsOpen);
 }

 console.log(favouritesList);
    return (  
        <>
        {!showMovieList && (
            
        <Row xs={1} lg={6} key={new Date().getTime()}>

       {!isFavourites
        && (searchResultData.map((movie) => (
            <Col key={movie.posterurl} className="my-2 d-flex align-items-stretch">
                <Card>
                    <Card.Img variant="top" src={movie.posterurl} style= {{height: '17rem'}} onClick={() => showMovieDetails(movie)}/>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1rem'}}>{movie.title}</Card.Title>
                        <Card.Text className='addToFavourites
                        ' onClick={ () => addToFavourites
                            ( movie )}>
                            Add to Favourites
                             
                            <FontAwesomeIcon icon={faHeart} style={ {color : 'red', paddingLeft : '0.3rem'}} 
                         />
                         
                        </Card.Text>
                     </Card.Body>
                </Card>
            </Col>
        )))}

        { isFavourites
         && (searchResultData.length === 0) &&
          <div className='my-2 mr-4 align-items-stretch'>No data found!</div>  }
        { isFavourites
         && (searchResultData.map(
            item => (
            <Col key={item.title} className="my-2 d-flex align-items-stretch">
                <Card>
                    <Card.Img variant="top" src={item.posterurl} style= {{height: '17rem'}} onClick={() => showMovieDetails(item)}/>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1rem'}}>{item.title}</Card.Title>
                        <Card.Text className='addToFavourites
                        ' onClick={ () => removeFromFavourites
                        ( item )}
                         style={{ fontSize: '0.9rem'}}>
                            Remove from Favourites
                               
                            <FontAwesomeIcon icon={faRectangleXmark} style={ {color : 'black', paddingLeft : '0.3rem'}}  />
                         
                        </Card.Text>
                     </Card.Body>
                </Card>
            </Col>
        )))}    

    </Row>
   
        )}
       { showMovieList && (
        <>
        <div>
            <a onClick={() => backToHome()} style={{ textDecoration : 'none', color : 'blue', cursor: 'pointer', padding : '3rem'}} >Back to details</a></div>
        <hr/>
          <Row xs={1} lg={2} key={ `${new Date().getTime()} ${movieDetails?.title}`} style={{paddingLeft : '2rem'}}>
                 <Col key={`${new Date().getTime()} ${movieDetails?.title}`} className="my-2 d-flex align-items-stretch" style={{width : '275px'}}>
                <Card>
                
                    <img src={movieDetails?.posterurl}  style= { { height : '22rem', width : '14rem' } }
                    onClick={ () => handleShowDialog()} />
                     {imageIsOpen && (
                        <dialog
                          className="dialog"
                          style={{ position: 'absolute' }}
                          open
                          onClick={() => handleShowDialog()}
                        >
                          <img
                            className="image"
                            src={movieDetails?.posterurl}
                            onClick={() => handleShowDialog()}
                            alt="no image"
                          />
                        </dialog>
                      )}
                    </Card>
                    </Col>
            <Col key={movieDetails?.title} className="">
                <h3 className="text-left text-md-left">    {`${movieDetails?.title} (${movieDetails?.year})`} </h3>
                <Table>
                    <tbody>
                    <tr>
                  <td>imdbRating</td>
                  <td>{movieDetails?.imdbRating}</td>                
                 </tr>
                 <tr>
                  <td>Content Rating</td>
                  <td>{movieDetails?.contentRating}</td>                
                 </tr>
                 <tr>
                  <td>Average Rating</td>
                  <td>{movieDetails?.averageRating}</td>                
                 </tr>
                 <tr>
                  <td>Duration</td>
                  <td>{movieDetails?.duration}</td>                
                 </tr>
                 <tr>
                  <td>Genres</td>
                  <td>{movieDetails?.genres}</td>                
                 </tr>
                 <tr>
                  <td>Actors</td>
                  <td>{movieDetails?.actors}</td>                
                 </tr>
                 <tr>
                  <td>Release Date</td>
                  <td>{movieDetails?.releaseDate}</td>                
                 </tr>
                 <tr>
                  <td>Story Line</td>
                  <td>{movieDetails?.storyline}</td>                
                 </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </>
        )
       }

    </>
    );

}
MoviesList.defaultProps = {
    typeOfMovie : 'movies-in-theaters',
    isFavourites
     : false,
    searchText  : null
}


export default MoviesList;