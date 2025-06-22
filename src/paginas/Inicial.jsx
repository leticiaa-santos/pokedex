import { Cabecalho } from "../componentes/Cabecalho";
import { Outlet } from "react-router-dom"; // Componente que renderiza o conteúdo dinâmico da página
import { Rodape } from "../componentes/Rodape";

export function Inicial() {
    return (
        <>
            <Cabecalho />        {/* Renderiza o cabeçalho da página*/}
            <Outlet />           {/*Ponto onde será exibido o conteúdo dinâmico*/}
            <Rodape />           {/*Renderiza o rodapé da página*/}
        </>
    );
}
