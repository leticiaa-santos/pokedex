import { Routes, Route } from 'react-router-dom'; // Importa componentes de roteamento
import { Inicial } from '../paginas/Inicial'; 
import { Lista } from '../componentes/Lista'; 

export function Rotas() {
    return (
        <Routes>
            {/* Rota principal que usa o 'Inicial' */}
            <Route path='/' element={<Inicial />}>
                
                {/* Rota padrão (index) que será exibida no <Outlet /> */}
                <Route index element={<Lista />} />
                
            </Route>
        </Routes>
    );
}
