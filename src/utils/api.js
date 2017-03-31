import * as request from 'request-promise'

export const ENDPOINTS={

    GAME_SEARCH_URL: 'https://www.giantbomb.com/api/search/',
    GAME_URL: 'https://www.giantbomb.com/api/game/3030-4725/',
    TV_SEARCH_URL: 'http://api.tvmaze.com/search/shows',
    MOVIE_SEARCH_URL: 'https://api.themoviedb.org/3/search/movie',
    MOVIE_DISCOVER_URL: 'https://api.themoviedb.org/3/discover/movie',
    MOVIE_GENRE_URL: 'https://api.themoviedb.org/3/genre/movie/list'
}
export const KEYS={

    GAME_API_KEY: 'd390d94524f6a9fdf1a9b92f61ccf5b54f0e2d5d',
    MOVIE_API_KEY: '14b5bcdff4d38556110f715ae45bb996'
}

/* REQUEST (Promise) DOCUMENTATION */
/* https://github.com/request/request-promise */

export function get( url, queryParameters ) {

    //returns a Promise which can be used with the async - await syntax
    console.log( url )
    return request.get( {
        json: true,
        url: url,
        qs: queryParameters
    })
}
//Mansour CHAUVIN Arnaud Azam