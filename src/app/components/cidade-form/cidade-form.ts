import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Cidade, CidadePayload, CidadeService } from '../../services/cidadeservice';
import { Uf, Ufservice } from '../../services/ufservice';

@Component({
  selector: 'app-cidade-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cidade-form.html',
  styleUrl: './cidade-form.scss'
})
export class CidadeForm implements OnInit {
  nomeCidade: string = '';
  selectedUf?: Uf; // Objeto selecionado no dropdown
  codCidade?: number;
  
  isEdit = false;
  ufs$!: Observable<Uf[]>;

  constructor(
    private cidadeService: CidadeService,
    private ufService: Ufservice,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ufs$ = this.ufService.ufs$;
    this.ufService.loadUfs();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.codCidade = +id;
      this.cidadeService.getCidade(+id).subscribe(cidade => {
        this.nomeCidade = cidade.nomecidade;
        // O compareWith no HTML vai lidar com a seleção correta do objeto UF
        this.selectedUf = cidade.uf; 
      });
    }
  }

  compareUf(u1: Uf, u2: Uf): boolean {
    return u1 && u2 ? u1.coduf === u2.coduf : u1 === u2;
  }

  onSubmit(): void {
    if (!this.selectedUf) return;

    // Prepara o payload conforme o backend espera (nomeuf string)
    const payload: CidadePayload = {
      codcidade: this.codCidade,
      nomecidade: this.nomeCidade,
      nomeuf: this.selectedUf.nomeuf 
    };

    const action = this.isEdit
      ? this.cidadeService.updateCidade(this.codCidade!, payload)
      : this.cidadeService.createCidade(payload);

    action.subscribe({
      next: () => this.router.navigate(['/cidades']),
      error: (err) => console.error('Erro ao salvar cidade', err)
    });
  }
}