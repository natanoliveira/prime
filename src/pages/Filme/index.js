import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../../services/api"

import './filme-info.css'

import { toast } from 'react-toastify'

function Filme() {

    const { id } = useParams()

    const navigation = useNavigate()

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "9e2389528563f64554f69f688a57dc65",
                    language: "pt-BR",
                }
            }).then((response) => {

                // console.log(response.data)
                setFilme(response.data)
                setLoading(false)

            }).catch(() => {
                // console.log('Filme não encontrado')
                // Redirecionamento: Enviando para home caso o erro
                navigation("/", { replace: true })
                return
            })
        }

        // console.log(response.data)
        loadFilme()

        return () => {
            // console.log('Componente desmontado')
            // toast.success('Componente desmontado')
        }
    }, [navigation, id])

    function salvarFilme() {

        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || []

        // Verrificando se o filme está salvo
        const temFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if (temFilme) {
            // alert('Este filme já está na lista de favoritos')
            toast.warning('Este filme já está na lista de favoritos')
            return
        }

        // Caso não exista vamos adiciona-lo
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        // alert('Filme Salvo com sucesso!')
        toast.success('Filme salvo com sucesso')
    }


    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">

            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <p><strong>Avaliação: </strong>{filme.vote_average} / 10</p>

            <p>
                <strong>Genero: </strong>
                {
                    filme.genres.map((item) => {
                        return (
                            ` [${item.name}] `
                        )
                    })
                }
            </p>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button><a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">Trailer</a></button>
                <button><Link to="/">Voltar</Link></button>
            </div>
        </div >
    )
}

export default Filme