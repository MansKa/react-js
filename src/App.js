/* ROOT Component of your App  */
import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const Materialize=window.Materialize

const APP_TITLE='TP React'
document.title=APP_TITLE

//web api utils
import { get, ENDPOINTS, KEYS } from './utils/api'

//components
import MovieCard from './components/MovieCard'

class App extends Component {

    /* React state initialization DOCUMENTATION : https://facebook.github.io/react/docs/react-without-es6.html#setting-the-initial-state */

    constructor( props ) {
        super( props )
        this.state={
            results: undefined,
            input: '',
            filter: 'false'
        }
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>{ APP_TITLE }</h1>
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>

                <nav className="nav-extended">
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><a href="#test1">Classic Search</a></li>

                            <li className="tab"><form onSubmit={ this.discover }>
                                <button type="submit" className="waves-effect waves-light btn">
                                    Discover
                            </button>

                            </form><a href="#test2">Discover</a></li>

                            <li className="tab"><form onSubmit={ this.history }>
                                <button type="submit" className="waves-effect waves-light btn">
                                    History
                            </button>

                            </form><a href="#test3">History</a></li>

                        </ul>
                    </div>
                </nav>
                <body>
                    <div className="App-content">

                        <div className="center-align">

                            <form onSubmit={ this.fetchQuery }>

                                <div className="row" style={ { marginBottom: 0 } }>
                                    <div className="input-field col s6 offset-s3">
                                        <input id="gameInput" type="text" value={ this.state.input } onChange={ this.handleChange } />
                                        <label htmlFor="gameInput">Movie</label>
                                    </div>
                                </div>
                                <div className="switch">
                                    <label>
                                        Everything
      <input type="checkbox" onChange={ this.switch } />
                                        <span className="lever"></span>
                                        Popular
    </label>
                                </div>
                                <button type="submit" className="waves-effect waves-light btn">
                                    <i className="material-icons dp48">search</i>Search
                            </button>

                            </form>
                        </div>

                        <div className="row" style={ { marginTop: 20 } } >
                            <div className="col s12 m6 offset-m3">
                                { this.displayResultInfo() }
                            </div>
                        </div>
                    </div>

                </body>
                <footer className="page-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col l4 ">
                                <h5 className="white-text">Delivered by IF-4</h5>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                            © 2017 Copyright Arnaud Azam & Mansour Chauvin <a className="grey-text text-lighten-3" href="https://github.com/MansKa/react-js">Github</a>
                        </div>
                    </div>
                </footer>

            </div>

        )
    }



    handleChange=( event ) => {
        this.setState( {
            input: event.target.value
        })
    }
    switch=( event ) => {
        this.setState( {
            filter: event.target.checked
        })
    }

    //Arrow function syntax used for Autobinding,MC AZ see details here : https://facebook.github.io/react/docs/react-without-es6.html#autobinding 
    fetchQuery=async ( event ) => {

        event.preventDefault()

        /* ASYNC - AWAIT DOCUMENTATION : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await */
        try {
            let results=await get( ENDPOINTS.MOVIE_SEARCH_URL, {
                api_key: KEYS.MOVIE_API_KEY,
                query: this.state.input,
                language: 'en-US',
                include_adult: 'false'
            })
            //checking that we received a well-formated game object
            if( results.total_results!==0 ) {
                //data is now received from the server thanks to async-await
                // React state DOCUMENTATION : https://facebook.github.io/react/docs/lifting-state-up.html 

                //We only keep the high popularity movie
                function highPopularity( element ) {
                    return element.popularity>=12;
                }
                if( this.state.filter===true ) {
                    results=results.results.filter( highPopularity )
                }
                else {
                    results=results.results
                }

                var results=results.map( function ( movie ) {
                    movie.vote_average=movie.vote_average*10
                    return movie;
                });
                this.setState( {

                    results: results
                })
            }
            //handling error
            else {

                console.log( results )
                Materialize.toast( results.error, 8000, 'error-toast' )
                //Using Materialize toast component to display error messages - see http://materializecss.com/dialogs.html
            }

            console.log( results )

        }
        catch( error ) {
            Materialize.toast( error+'No results', 8000, 'error-toast' )
            console.log( 'Failed fetching data: ', error )
        }

    }

    //Allow the user to discover recent movies (randomly thanks to shuffle function)
    discover=async ( event ) => {
        event.preventDefault()

        try {

            let results=await get( ENDPOINTS.MOVIE_DISCOVER_URL, {
                api_key: KEYS.MOVIE_API_KEY,
                language: 'en-US',
                include_adult: 'false',
                sort_by: 'popularity.desc'
            })
            //checking that we received a well-formated game object
            if( results.total_results!==0 ) {
                var results=results.results.map( function ( movie ) {
                    movie.vote_average=movie.vote_average*10
                    return movie;
                });
                this.setState( {
                    results: shuffle( results )
                })
            }
            //handling error
            else {

                console.log( results )
                Materialize.toast( results.error, 8000, 'error-toast' )
            }

            console.log( results )

        }
        catch( error ) {
            Materialize.toast( error, 8000, 'error-toast' )
            console.log( 'Failed fetching data: ', error )
        }

    }

    fetchGenre=async ( genre_ids ) => {

        event.preventDefault()

        try {

            let genres=await get( ENDPOINTS.MOVIE_GENRE_URL, {
                api_key: KEYS.MOVIE_API_KEY,
                language: 'en-US'
            })
            //checking that we received a well-formated game object
            if( genres!==0 ) {
                genres.name=''
                /*var tableauOrig=[ { clé: 1, valeur: 10 }, { clé: 2, valeur: 20 }, { clé: 3, valeur: 30 }];
                var tableauFormaté=tableauOrig.map( function ( obj ) {
                    var rObj={};
                    rObj[ obj.clé ]=obj.valeur;
                    return rObj;
                });*/
            }
            //handling missing genre
            else {
                genres.name=''
            }

            console.log( genres )

        }
        catch( error ) {
            Materialize.toast( error, 8000, 'error-toast' )
            console.log( 'Failed fetching genre: ', error )
        }
    }

    //Search History
    history=async ( event ) => {
        event.preventDefault()
        var text=''
        for( var i=0; i<localStorage.length; i++ ) {
            text+=localStorage[ i ]+"<br>";
        }
        Materialize.toast( text, 8000, 'history-toast' )
    }



    //handle display of the received results object
    displayResultInfo=() => {
        const results=this.state.results

        if( results ) {

            const movieName=results[ 0 ].original_title
            const releaseDate=results[ 0 ].release_date
            const popularity=results[ 0 ].popularity
            const voteaverage=results[ 0 ].vote_average
            const overview=results[ 0 ].overview
            //const genre=this.fetchGenre( results[ 0 ].genre_ids )

            const picture='https://image.tmdb.org/t/p/w500/'+results[ 0 ].poster_path
            localStorage.setItem( localStorage.length+1, results[ 0 ].original_title )
            return (
                <MovieCard
                    name={ movieName }
                    releaseDate={ releaseDate }
                    popularity={ popularity }
                    voteAverage={ voteaverage }
                    overview={ overview }
                    picture={ picture } />
            )
        }

        return null
    }

}
/*                                <!--
                                <p>
                    <input type="checkbox" id="test5" value={ this.state.explicit } />
                    <label for="test5">Explicit Content</label>
                </p>
                -->*/
export default App

function shuffle( array ) {
    var currentIndex=array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while( 0!==currentIndex ) {

        // Pick a remaining element...
        randomIndex=Math.floor( Math.random()*currentIndex );
        currentIndex-=1;

        // And swap it with the current element.
        temporaryValue=array[ currentIndex ];
        array[ currentIndex ]=array[ randomIndex ];
        array[ randomIndex ]=temporaryValue;
    }

    return array;
}