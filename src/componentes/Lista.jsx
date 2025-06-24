import axios from "axios";
import React, {useState, useEffect} from "react";
import { Card } from './Card'; 
import { Modal } from './Modal'
import estilos from './Lista.module.css'

// URL base e chave da API do TMDB
const API_URL = 'https://hp-api.onrender.com/api/characters';

// Função para remover duplicações de personagens por nome
const uniqueByName = (arr) => {
    const seen = new Set();
    return arr.filter((char) => {
        if (seen.has(char.name)) return false;
        seen.add(char.name);
        return true;
    });
};

export function Lista(){
    // Estado para armazenar os personagens recebidos da API
    const [personagens, setPersonagens] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroCasa, setFiltroCasa] = useState('');

    // Estado para controlar o personagem selecionado (para o modal)
    const [SelectedPersonagem, setSelectedPersonagem] = useState(null);

    // Hook useEffect é executado ao carregar o componente (lista os filmes)
    useEffect(() => {
        axios.get(`${API_URL}`)
            .then(response => {
                const personagensUnicos = uniqueByName(response.data); // Remove duplicações
                setPersonagens(personagensUnicos); // Atualiza o estado com os personagens únicos
            })
            .catch(error => {
                console.log('Erro ao buscar personagens:', error);
            });
    }, []);


    // Filtrando personagens com base no nome e casa
    const personagensFiltrados = personagens.filter(personagem => {
        const nomePersonagem = personagem.name.toLowerCase();
        const nomeFiltro = filtroNome.toLocaleLowerCase();

        const nome = nomeFiltro === '' || nomePersonagem.startsWith(nomeFiltro);
        const casa = filtroCasa === '' || personagem.house === filtroCasa;

        return nome && casa;
    });

    // Abre o modal com os detalhes do personagem
    const handleOpenModal = (personagem) => {
        setSelectedPersonagem(personagem);
    }

    // Fecha o modal
    const handleCloseModal = () => {
        setSelectedPersonagem(null);
    }

    return(
        <>

            <section className={estilos.faixaSuperior}>
                <h2 className={estilos.tituloDestaque}>Personagens Harry Potter</h2>
                <div className={estilos.filtros}>
                    <div className={estilos.busca}>
                        <label>Busque o seu personagem favorito</label>
                        <input
                            type="text"
                            placeholder="Buscar por nome"
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                        />
                    </div>
                    <div className={estilos.casa}>
                        <label>Filtre por casa</label>
                        <select value={filtroCasa} onChange={(e) => setFiltroCasa(e.target.value)}>
                            <option value="">Todas as casas</option>
                            <option value="Gryffindor">Grifinória</option>
                            <option value="Slytherin">Sonserina</option>
                            <option value="Hufflepuff">Lufa-Lufa</option>
                            <option value="Ravenclaw">Corvinal</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className={estilos.conteiner}>
                {personagensFiltrados.length === 0 ? (
                    <p className={estilos.mensagemErro}>Personagem não encontrado</p>
                ) : (
                    <figure>
                    {personagensFiltrados.map(personagem => (
                        <Card 
                            key={personagem.name}
                            personagem={personagem}
                            onOpenModal={handleOpenModal} 
                        />
                    ))}
                </figure>
                )}
                

                {/* Se um personagem estiver selecionado, mostra o modal */}
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
