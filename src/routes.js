import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Paginas
import Home from './pages/Home'
import Filme from './pages/Filme'
import Favoritos from './pages/Favoritos'

// Pagina de erros
import Erro from './pages/Erro'

// Componentes
import Header from './components/Header'

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Filme />} />
                <Route path="/favoritos" element={<Favoritos />} />

                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp