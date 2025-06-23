import estilo from './Card.module.css';
import sem_foto from '../assets/sem_foto.png';

export function Card({ personagem, onOpenModal}){
    const imagem = personagem.image || sem_foto;
    return(
        // estrutura base para o card do personagem
        <div className={estilo.conteiner}>
            <h3 className={estilo.titulo}>{personagem.name}</h3>
            <img className={estilo.image} src={imagem} onClick={() => onOpenModal(personagem)} />
        </div>
    );
}