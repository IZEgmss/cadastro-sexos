// Em: sexo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; // Importe o Observable
import { Sexo, Sexoservice } from '../../services/sexoservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sexo-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './sexo-list.html',
  styleUrl: './sexo-list.scss'
})
export class SexoList implements OnInit {
  // A propriedade agora será um Observable da lista de sexos
  sexos!: Observable<Sexo[]>;

  constructor(private sexoservice: Sexoservice) {}

  ngOnInit(): void {
    // 1. Atribua o observable do serviço à propriedade do componente
    this.sexos = this.sexoservice.sexos$;
    // 2. Peça ao serviço para carregar os dados iniciais
    this.sexoservice.loadSexos();
  }

  deleteSexo(id: number): void {
    if (confirm('Tem certeza que deseja excluir o sexo?')) {
      // O método no serviço já cuidará de recarregar a lista
      this.sexoservice.deleteSexo(id).subscribe({
        error: (err) => console.error('Erro ao excluir sexo', err)
      });
    }
  }
}