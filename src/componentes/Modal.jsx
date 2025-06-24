import estilos from './Modal.module.css';
import sem_foto from '../assets/sem_foto.png';

export function Modal({ personagem, onClose }) {
    const imagem = personagem.image || sem_foto;
    // se não houver filme selecionado, não renderiza nada
    if (!personagem) {
        return null;
    }

    console.log(personagem); // mostra o filme no console (para debug)

    return (
        // fundo escurecido do modal
        <div className={estilos.modalback}>
            <div className={estilos.modalContainer}>
                <div className={estilos.modalHeader}>
                    
                    

                    {/* título do filme */}
                    <h2>{personagem.name}</h2>

                    {/* imagem do pôster do filme */}
                    <img 
                        className={estilos.imgModal} 
                        src={imagem} 
                    />

                    {/* mostra os detalhes do filme */}
                    <div>
                        <ul className={estilos.movieDetails}>
                            <li>{`Casa: ${personagem.house}`}</li>
                            <li>{`Ator: ${personagem.actor}`}</li>
                            <li>{`Data de nascimento: ${personagem.dateOfBirth}`}</li>
                            <li>
                                <button className={estilos.containerButton} onClick={onClose}>Fechar</button>
                            </li>
                            
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
