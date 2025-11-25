import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Venda, VendaService } from '../../services/vendaservice';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './venda-list.html',
  styleUrl: './venda-list.scss'
})
export class VendaList implements OnInit {
  vendas$!: Observable<Venda[]>;

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.vendas$ = this.vendaService.vendas$;
    this.vendaService.loadVendas();
  }

  // Normalmente vendas não são excluídas, mas canceladas. 
  // Como o back tem delete, implementamos:
  deleteVenda(id: number): void {
    if (confirm('Deseja excluir esta venda? Os itens voltarão ao estoque.')) {
      // Você precisará adicionar o método deleteVenda no Service se ainda não tiver
      // this.vendaService.deleteVenda(id).subscribe(); 
      console.log('Implementar delete no service: ' + id);
    }
  }
}