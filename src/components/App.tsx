import { useState } from 'react';
import NavigationBar from './NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import data from './../Data/data.json'
import Main from './Main'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = (props: any) => {
    var [movies, setMovies] = useState(data.movies_in_theaters);
    var [moviesBackup, setMoviesBackup] = useState(data.movies_in_theaters);
    const [favouriteMovies, setFavouriteMovies] = useState(data.favourite);
    const [selectedMovieCategory, setSelectedMovieCategory] = useState();

    const addToFavourates = (movie: any) => {
        const exists = favouriteMovies.find((x: any) => x.id === movie.id);
        if (!exists) {
            setFavouriteMovies([...favouriteMovies, { ...movie }])
            toast.success("Added to favourate", {
                position: 'top-right',
                autoClose: 3000, // time in milli secondes
                draggable: true
            });
        }
        else {
            toast.error("Already exists in favourate", {
                position: 'top-right',
                autoClose: 3000, // time in milli secondes
                draggable: true
            });
        }
    }

    const removeFromFavourates = (movie: any) => {
        const exists = favouriteMovies.find((x: any) => x.id === movie.id);
        if (exists) {
            let filteredArray = favouriteMovies.filter((x: any) => x.id !== movie.id)
            setFavouriteMovies(filteredArray)
            toast.success("Removed from favourate", {
                position: 'top-right',
                autoClose: 3000, // time in milli secondes
                draggable: true
            });
        }
        navigationBarCategorySelection(selectedMovieCategory)
    }

    const navigationBarCategorySelection = (movieCategory: any) => {
        setSelectedMovieCategory(movieCategory);
        switch (movieCategory) {
            case 'Movie in Threatres':
                setMovies(data.movies_in_theaters)
                setMoviesBackup(data.movies_in_theaters)
                break;
            case 'Coming Soon':
                setMovies(data.movies_coming)
                setMoviesBackup(data.movies_coming)
                break;
            case 'Top Rated Indian':
                setMovies(data.top_rated_india)
                setMoviesBackup(data.top_rated_india)
                break;
            case 'Top Rated Movies':
                setMovies(data.top_rated_movies)
                setMoviesBackup(data.top_rated_movies)
                break;
            case 'Favourites':
                setMovies(favouriteMovies)
                setMoviesBackup(favouriteMovies)
                break;
            default:
                break;
        }
    }

    const sortDataBasedOnInput = (input: any) => {
        if (input === '' || input === ' ') {
            setMovies(moviesBackup)
        }
        else {
            let filteredArray = [];
            for (let index = 0; index < moviesBackup.length; index++) {
                if (moviesBackup[index].title.toLowerCase().includes(input.toLowerCase()))
                    filteredArray.push(moviesBackup[index])
            }
            //let filteredArray = favouriteMovies.filter((x: any) => x.title.toLowerCase().includes(input.toLowerCase()))
            setMovies(filteredArray)
        }
    }

    return (
        <>
            <NavigationBar navigationBarCategorySelection={navigationBarCategorySelection}
                sortDataBasedOnInput={sortDataBasedOnInput} />
            <Main movies={movies} addToFavourates={addToFavourates}
                removeFromFavourates={removeFromFavourates} selectedMovieCategory={selectedMovieCategory}
                loadMoreData={props.loadMoreData} />
            <ToastContainer />
        </>
    )
}

export default App;