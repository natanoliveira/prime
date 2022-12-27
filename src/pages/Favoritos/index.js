import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './favoritos.css'

import { toast } from 'react-toastify'

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        // Recuperando a lista de filmes gravadas local
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id) {

        // Retornando todos os filmes diferente do clicado, escolhido para exclusão
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        // Inserindo a lista menos o excluído
        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success('Filme removido com sucesso')
    }


    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes Favoritos</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo &#128533;</span>}

            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div><Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button className='button-excluir' onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default Favoritos