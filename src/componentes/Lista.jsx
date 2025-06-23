import axios from "axios";
import React, {useState, useEffect} from "react";
import { Card } from './Card'; 
import { Modal } from './Modal'
import estilos from './Lista.module.css'

// URL base e chave da API do TMDB
const API_URL = 'https://hp-api.onrender.com/api/characters';

export function Lista(){
    // Estado para armazenar os filmes recebidos da API
    const [personagens, setPersonagens] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroCasa, setFiltroCasa] = useState('');

    // Estado para controlar o filme selecionado (para o modal)
    const [SelectedPersonagem, setSelectedPersonagem] = useState(null);

    // Hook useEffect é executado ao carregar o componente (lista os filmes)
    useEffect(() => {
        axios.get(`${API_URL}`)
            .then(response => {
                console.log(response.data); 
                setPersonagens(response.data); 
            })
            .catch(error => {
                console.log('erro', error); 
            });
    }, []);


    const personagensFiltrados = personagens.filter(personagem => {
    const nomePersonagem = personagem.name;
    const nomeFiltro = filtroNome;

    const nome = nomeFiltro === '' || nomePersonagem.startsWith(nomeFiltro);
    const casa = filtroCasa === '' || personagem.house === filtroCasa;

    return nome && casa;
    });

    // Abre o modal com os detalhes do filme
    const handleOpenModal = (personagem) => {
        setSelectedPersonagem(personagem);
    }

    // Fecha o modal
    const handleCloseModal = () => {
        setSelectedPersonagem(null);
    }

    return(
        <>
            <h2 className={estilos.tituloDestaque}>Personagens Harry Potter</h2>

            <div className={estilos.filtros}>
                <input 
                    type="text"
                    placeholder="Buscar por nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                />

                <select value={filtroCasa} onChange={(e) => setFiltroCasa(e.target.value)}>
                    <option value="">Todas as casas</option>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Slytherin">Slytherin</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                </select>
            </div>

            <div className={estilos.conteiner}>
                <figure>
                    {personagensFiltrados.map(personagem => (
                        <Card 
                            key={personagem.name}
                            personagem={personagem}
                            onOpenModal={handleOpenModal} 
                        />
                    ))}
                </figure>

                {/* Se um filme estiver selecionado, mostra o modal */}
                {SelectedPersonagem && (
                    <Modal 
                        personagem={SelectedPersonagem} 
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    )
}
