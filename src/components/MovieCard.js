import React, { Component } from 'react'
import './MovieCard.css'

class MovieCard extends Component {

    render() {

        const { name, releaseDate, popularity, voteAverage, overview, picture }=this.props

        return (
            <div className="card horizontal" style={ { margin: 'auto' } }>
                <div className="card-image weather-img-container">
                    <img alt="city" className="weather-img" src={ picture } />
                </div>
                <div className="card-stacked">
                    <div className="card-content">

                        <div className="weather-data">
                            <p>
                                <i className="material-icons">info</i>
                                <span>{ overview }</span>
                                <p>
                                    <span style={ { fontSize: 18 } }>Release Date: { releaseDate }</span>
                                </p>
                            </p>
                            <span className="card-title">
                                Popularity { popularity }

                            </span>
                            Review { voteAverage } %
                        </div>
                    </div>
                    <div className="card-action center-align">
                        <a className="weather-city" href="#" onClick={ e => e.preventDefault() }>{ name }</a>
                        <i className="material-icons">shopping_cart</i>
                    </div>
                </div>
            </div>
        )
    }

}

export default MovieCard
//<span className="new badge"></span>
//Mansour CHAUVIN Arnaud Azam