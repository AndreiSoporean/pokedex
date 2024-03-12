
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/home'
import PokemonDetails from './pages/pokemon-details/pokemon-details'
import Layout from './components/layout/layout'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path={`/pokemon/:name`} element={<Layout><PokemonDetails /></Layout>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
