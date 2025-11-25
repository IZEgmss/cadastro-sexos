// Em: sexo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; // Importe o Observable
import { Uf, Ufservice } from '../../services/ufservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-uf-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './uf-list.html',
  styleUrl: './uf-list.scss'
})
export class UfList implements OnInit {
  // A propriedade agora será um Observable da lista de sexos
  ufs!: Observable<Uf[]>;

  constructor(private ufservice: Ufservice) {}

  ngOnInit(): void {
    // 1. Atribua o observable do serviço à propriedade do componente
    this.ufs = this.ufservice.ufs$;
    // 2. Peça ao serviço para carregar os dados iniciais
    this.ufservice.loadUfs();
  }

  deleteUf(id: number): void {
    if (confirm('Tem certeza que deseja excluir o Uf?')) {
      // O método no serviço já cuidará de recarregar a lista
      this.ufservice.deleteUf(id).subscribe({
        error: (err) => console.error('Erro ao Excluir Uf', err)
      });
    }
  }
}