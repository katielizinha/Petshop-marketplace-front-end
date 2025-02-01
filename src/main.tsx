import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Produto from './produtos.tsx'
import FuncionariosApp from './funcionarios.tsx'
import Donos from './donos.tsx'
import AnimaisApp from './animais.tsx'
import ConsultaApp from './consulta.tsx'
import CadastroDonos from './componentes/petshopProduto/cadastro/CadastroDonos.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CadastroProduto from './componentes/petshopProduto/cadastro/CadastroProduto.tsx'
import Header from './componentes/header/Header.tsx';
import AlterarProduto from './componentes/petshopProduto/alterar/AlterarProduto.tsx';
import AlterarDonos from './componentes/petshopProduto/alterar/AlterarDonos.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Produto/>,
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
    element: <Produto/>,
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
    element: <><Header/><AlterarProduto/></>
  },
  {path: "/alterar-donos/:id",
    element: <><Header/><AlterarDonos/></>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)