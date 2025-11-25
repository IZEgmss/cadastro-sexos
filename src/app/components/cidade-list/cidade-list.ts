import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Cidade, CidadeService } from '../../services/cidadeservice';

@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cidade-list.html',
  styleUrl: './cidade-list.scss'
})
export class CidadeList implements OnInit {
  cidades$!: Observable<Cidade[]>;

  constructor(private cidadeService: CidadeService) {}

  ngOnInit(): void {
    this.cidades$ = this.cidadeService.cidades$;
    this.cidadeService.loadCidades();
  }

  deleteCidade(id: number): void {
    if (confirm('Deseja realmente excluir esta cidade?')) {
      this.cidadeService.deleteCidade(id).subscribe();
    }
  }
}