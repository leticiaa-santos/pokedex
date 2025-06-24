import { Cabecalho } from "../componentes/Cabecalho";
import { Outlet } from "react-router-dom"; // Componente que renderiza o conteúdo dinâmico da página
import { Rodape } from "../componentes/Rodape";
import estilo from './Inicial.module.css';

export function Inicial() {
    return (
        <div className={estilo.pageContainer}>
            <Cabecalho />
            <main className={estilo.conteudo}>
                <Outlet />
            </main>
            <Rodape />
        </div>
    );
}
