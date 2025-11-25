import { Routes } from '@angular/router';

// Componentes já existentes
import { SexoList } from './components/sexo-list/sexo-list';
import { SexoForm } from './components/sexo-form/sexo-form';
import { UfList } from './components/uf-list/uf-list';
import { UfForm } from './components/uf-form/uf-form';
import { BairroList } from './components/bairro-list/bairro-list';
import { BairroForm } from './components/bairro-form/bairro-form';
import { CepList } from './components/cep-list/cep-list';
import { CepForm } from './components/cep-form/cep-form';
import { RuaList } from './components/rua-list/rua-list';
import { RuaForm } from './components/rua-form/rua-form';
import { MarcaList } from './components/marca-list/marca-list';
import { MarcaForm } from './components/marca-form/marca-form';
import { TipoList } from './components/tipo-list/tipo-list';
import { TipoForm } from './components/tipo-form/tipo-form';

// Novos Componentes (Certifique-se de ter criado eles)
import { ProdutoList } from './components/produto-list/produto-list';
import { ProdutoForm } from './components/produto-form/produto-form';
import { CidadeList } from './components/cidade-list/cidade-list';
import { CidadeForm } from './components/cidade-form/cidade-form';
import { ClienteList } from './components/cliente-list/cliente-list';
import { ClienteForm } from './components/cliente-form/cliente-form';
import { VendaList } from './components/venda-list/venda-list';
import { VendaForm } from './components/venda-form/venda-form';

export const routes: Routes = [
    // Rota padrão
    { path: '', redirectTo: '/vendas', pathMatch: 'full' },

    // Cadastros Simples
    { path: 'sexos', component: SexoList },
    { path: 'sexos/novo', component: SexoForm },
    { path: 'sexos/editar/:id', component: SexoForm },

    { path: 'ufs', component: UfList },
    { path: 'ufs/novo', component: UfForm },
    { path: 'ufs/editar/:id', component: UfForm },

    { path: 'bairros', component: BairroList },
    { path: 'bairros/novo', component: BairroForm },
    { path: 'bairros/editar/:id', component: BairroForm },

    { path: 'ceps', component: CepList },
    { path: 'ceps/novo', component: CepForm },
    { path: 'ceps/editar/:id', component: CepForm },

    { path: 'ruas', component: RuaList },
    { path: 'ruas/novo', component: RuaForm },
    { path: 'ruas/editar/:id', component: RuaForm },

    { path: 'marcas', component: MarcaList },
    { path: 'marcas/novo', component: MarcaForm },
    { path: 'marcas/editar/:id', component: MarcaForm },

    { path: 'tipos', component: TipoList },
    { path: 'tipos/novo', component: TipoForm },
    { path: 'tipos/editar/:id', component: TipoForm },

    // Cadastros Complexos
    { path: 'produtos', component: ProdutoList },
    { path: 'produtos/novo', component: ProdutoForm },
    { path: 'produtos/editar/:id', component: ProdutoForm },

    { path: 'cidades', component: CidadeList },
    { path: 'cidades/novo', component: CidadeForm },
    { path: 'cidades/editar/:id', component: CidadeForm },

    { path: 'clientes', component: ClienteList },
    { path: 'clientes/novo', component: ClienteForm },
    { path: 'clientes/editar/:id', component: ClienteForm },

    // Movimentação
    { path: 'vendas', component: VendaList },
    { path: 'vendas/novo', component: VendaForm }
];