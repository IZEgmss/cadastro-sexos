import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { VendaService, VendaPayload } from '../../services/vendaservice';
import { ClienteService, Cliente } from '../../services/clienteservice';
import { ProdutoService, Produto } from '../../services/produtoservice';

// Interface auxiliar para a tabela visual antes de salvar
interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  subtotal: number;
}

@Component({
  selector: 'app-venda-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './venda-form.html',
  styleUrl: './venda-form.scss'
})
export class VendaForm implements OnInit {
  // Seleções principais
  selectedCliente?: Cliente;
  clientes$!: Observable<Cliente[]>;

  // Controle de adição de itens
  produtos$!: Observable<Produto[]>;
  tempProduto?: Produto;
  tempQtd: number = 1;

  // Carrinho local
  carrinho: ItemCarrinho[] = [];

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientes$ = this.clienteService.clientes$;
    this.clienteService.loadClientes();

    this.produtos$ = this.produtoService.produtos$;
    this.produtoService.loadProdutos();
  }

  adicionarItem(): void {
    if (this.tempProduto && this.tempQtd > 0) {
      this.carrinho.push({
        produto: this.tempProduto,
        quantidade: this.tempQtd,
        subtotal: this.tempProduto.valor * this.tempQtd
      });
      
      // Resetar campos de adição
      this.tempProduto = undefined;
      this.tempQtd = 1;
    }
  }

  removerItem(index: number): void {
    this.carrinho.splice(index, 1);
  }

  getTotal(): number {
    return this.carrinho.reduce((acc, item) => acc + item.subtotal, 0);
  }

  onSubmit(): void {
    if (!this.selectedCliente || this.carrinho.length === 0) return;

    const payload: VendaPayload = {
      clienteId: this.selectedCliente.codcliente!,
      itens: this.carrinho.map(item => ({
        produtoId: item.produto.codproduto!,
        quantidade: item.quantidade
      }))
    };

    this.vendaService.createVenda(payload).subscribe({
      next: () => this.router.navigate(['/vendas']),
      error: err => {
        console.error(err);
        alert('Erro ao realizar venda! Verifique o estoque.');
      }
    });
  }
}