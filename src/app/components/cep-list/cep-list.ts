// Em: sexo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; // Importe o Observable
import { Cep, Cepservice } from '../../services/cepservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cep-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './cep-list.html',
  styleUrl: './cep-list.scss'
})
export class CepList implements OnInit {
  // A propriedade agora será um Observable da lista de sexos
  ceps!: Observable<Cep[]>;

  constructor(private cepservice: Cepservice) {}

  ngOnInit(): void {
    // 1. Atribua o observable do serviço à propriedade do componente
    this.ceps = this.cepservice.ceps$;
    // 2. Peça ao serviço para carregar os dados iniciais
    this.cepservice.loadCeps();
  }

  deleteCep(id: number): void {
    if (confirm('Tem certeza que deseja excluir o cep?')) {
      // O método no serviço já cuidará de recarregar a lista
      this.cepservice.deleteCep(id).subscribe({
        error: (err) => console.error('Erro ao excluir cep', err)
      });
    }
  }
}