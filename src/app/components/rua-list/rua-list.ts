// Em: sexo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; // Importe o Observable
import { Rua, Ruaservice } from '../../services/ruaservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rua-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './rua-list.html',
  styleUrl: './rua-list.scss'
})
export class RuaList implements OnInit {
  // A propriedade agora será um Observable da lista de sexos
  ruas!: Observable<Rua[]>;

  constructor(private ruaservice: Ruaservice) {}

  ngOnInit(): void {
    // 1. Atribua o observable do serviço à propriedade do componente
    this.ruas = this.ruaservice.ruas$;
    // 2. Peça ao serviço para carregar os dados iniciais
    this.ruaservice.loadRuas();
  }

  deleteRua(id: number): void {
    if (confirm('Tem certeza que deseja excluir a rua?')) {
      // O método no serviço já cuidará de recarregar a lista
      this.ruaservice.deleteRua(id).subscribe({
        error: (err) => console.error('Erro ao excluir rua', err)
      });
    }
  }
}