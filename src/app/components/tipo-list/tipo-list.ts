// Em: sexo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; // Importe o Observable
import { Tipo, Tiposervice } from '../../services/tiposervice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tipo-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './tipo-list.html',
  styleUrl: './tipo-list.scss'
})
export class TipoList implements OnInit {
  // A propriedade agora será um Observable da lista de sexos
  tipos!: Observable<Tipo[]>;

  constructor(private tiposervice: Tiposervice) {}

  ngOnInit(): void {
    // 1. Atribua o observable do serviço à propriedade do componente
    this.tipos = this.tiposervice.tipos$;
    // 2. Peça ao serviço para carregar os dados iniciais
    this.tiposervice.loadTipos();
  }

  deleteTipo(id: number): void {
    if (confirm('Tem certeza que deseja excluir o tipo?')) {
      // O método no serviço já cuidará de recarregar a lista
      this.tiposervice.deleteTipo(id).subscribe({
        error: (err) => console.error('Erro ao excluir tipo', err)
      });
    }
  }
}