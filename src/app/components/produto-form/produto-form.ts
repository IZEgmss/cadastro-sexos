import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// Services
import { Produto, ProdutoService } from '../../services/produtoservice';
import { Marca, Marcaservice } from '../../services/marcaservice';
import { Tipo, Tiposervice } from '../../services/tiposervice';

@Component({
  selector: 'app-produto-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss'
})
export class ProdutoForm implements OnInit {
  produto: Produto = { 
    nomeproduto: '', 
    valor: 0, 
    quantidade: 0 
  };
  
  isEdit = false;

  // Listas para os dropdowns
  marcas$!: Observable<Marca[]>;
  tipos$!: Observable<Tipo[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private marcaService: Marcaservice,
    private tipoService: Tiposervice
  ) {}

  ngOnInit(): void {
    // 1. Carregar listas auxiliares
    this.marcas$ = this.marcaService.marcas$;
    this.marcaService.loadMarcas();

    this.tipos$ = this.tipoService.tipos$;
    this.tipoService.loadTipos();

    // 2. Verificar se é edição
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.produtoService.getProduto(+id).subscribe({
        next: (data) => {
          this.produto = data;
        },
        error: (err) => console.error('Erro ao carregar produto', err)
      });
    }
  }

  // Função para o Angular saber comparar objetos no <select> (Essencial para Edição)
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.codmarca === c2.codmarca || c1.codtipo === c2.codtipo : c1 === c2;
  }
  // Alternativa genérica se os IDs forem diferentes
  compareMarca(m1: Marca, m2: Marca): boolean {
    return m1 && m2 ? m1.codmarca === m2.codmarca : m1 === m2;
  }
  compareTipo(t1: Tipo, t2: Tipo): boolean {
    return t1 && t2 ? t1.codtipo === t2.codtipo : t1 === t2;
  }

  onSubmit(): void {
  const action = this.isEdit
    ? this.produtoService.updateProduto(this.produto.codproduto!, this.produto)
    : this.produtoService.createProduto(this.produto);

  action.subscribe({
    next: () => this.router.navigate(['/produtos']),
    error: (err) => {
      console.log('Erro recebido:', err); // Para debug
      if (err.status === 200) {
        this.produtoService.loadProdutos(); // Recarrega a lista
        this.router.navigate(['/produtos']); // Volta para a tela de listagem
      } else {
        console.error('Erro real ao salvar produto: ', err);
      }
    }
  });
}
}