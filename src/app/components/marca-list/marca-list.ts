// Em: sexo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; // Importe o Observable
import { Marca, Marcaservice } from '../../services/marcaservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-marca-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './marca-list.html',
  styleUrl: './marca-list.scss'
})
export class MarcaList implements OnInit {
  // A propriedade agora será um Observable da lista de sexos
  marcas!: Observable<Marca[]>;

  constructor(private marcaservice: Marcaservice) {}

  ngOnInit(): void {
    // 1. Atribua o observable do serviço à propriedade do componente
    this.marcas = this.marcaservice.marcas$;
    // 2. Peça ao serviço para carregar os dados iniciais
    this.marcaservice.loadMarcas();
  }

  deleteMarca(id: number): void {
    if (confirm('Tem certeza que deseja excluir a marca?')) {
      // O método no serviço já cuidará de recarregar a lista
      this.marcaservice.deleteMarca(id).subscribe({
        error: (err) => console.error('Erro ao excluir marca', err)
      });
    }
  }
}