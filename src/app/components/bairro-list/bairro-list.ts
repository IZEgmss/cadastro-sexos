// Em: sexo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; // Importe o Observable
import { Bairro, Bairroservice } from '../../services/bairroservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bairro-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './bairro-list.html',
  styleUrl: './bairro-list.scss'
})
export class BairroList implements OnInit {
  // A propriedade agora será um Observable da lista de sexos
  bairros!: Observable<Bairro[]>;

  constructor(private bairroservice: Bairroservice) {}

  ngOnInit(): void {
    // 1. Atribua o observable do serviço à propriedade do componente
    this.bairros = this.bairroservice.bairros$;
    // 2. Peça ao serviço para carregar os dados iniciais
    this.bairroservice.loadBairros();
  }

  deleteBairro(id: number): void {
    if (confirm('Tem certeza que deseja excluir o bairro?')) {
      // O método no serviço já cuidará de recarregar a lista
      this.bairroservice.deleteBairro(id).subscribe({
        error: (err) => console.error('Erro ao excluir bairro', err)
      });
    }
  }
}