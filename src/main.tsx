import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import FuncionariosApp from './funcionarios.tsx'
import Donos from './donos.tsx'
import AnimaisApp from './animais.tsx'
import ConsultaApp from './consulta.tsx'
import CadastroDonos from './componentes/petshopProduto/cadastro/CadastroDonos.tsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CadastroProduto from './componentes/petshopProduto/cadastro/CadastroProduto.tsx'
import Header from './componentes/header/Header.tsx';
import AlterarProduto from './componentes/petshopProduto/alterar/AlterarProduto.tsx';


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
  {
    path: "/alterar-produto/:id",
    element: <><Header/><AlterarProduto/></>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)