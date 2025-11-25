import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto, ProdutoService } from '../../services/produtoservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produto-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.scss'
})
export class ProdutoList implements OnInit {
  produtos!: Observable<Produto[]>;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtos = this.produtoService.produtos$;
    this.produtoService.loadProdutos();
  }

  deleteProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe({
        error: (err) => console.error('Erro ao excluir produto', err)
      });
    }
  }
}