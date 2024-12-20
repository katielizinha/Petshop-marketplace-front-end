import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import FuncionariosApp from './funcionarios.tsx'
import Donos from './donos.tsx'
import AnimaisApp from './animais.tsx'
import ConsultaApp from './consulta.tsx'
import CadastroDonos from './componentes/petshopProduto/CadastroDonos.tsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CadastroProduto from './componentes/petshopProduto/CadastroProduto.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/cadastro-produto",
    element: <CadastroProduto/>,
  },
  {
    path: "/funcionarios",
    element: <FuncionariosApp/>,
  },
  {
    path: "/produtos",
    element: <App/>,
  },
  {path: "/donos",
    element: <Donos/>
  },
   {
    path: "/cadastro-dono",
    element: <CadastroDonos/>,
  },
  {
    path: "/animais",
    element: <AnimaisApp/>,
  },
  {
    path: "/consulta",
    element: <ConsultaApp/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)