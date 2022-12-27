
// Base da URL: https://api.themoviedb.org/3/
// URL DA API: movie/now_playing?api_key=9e2389528563f64554f69f688a57dc65&language=pt-BR
// Página especifica: movie/550?api_key=9e2389528563f64554f69f688a57dc65&language=pt-BR

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api