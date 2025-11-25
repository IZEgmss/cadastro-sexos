// Em: sexo-form.ts
import { Component, OnInit } from '@angular/core';
import { Cep, Cepservice } from '../../services/cepservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cep-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cep-form.html',
  styleUrl: './cep-form.scss'
})
export class CepForm implements OnInit {
  cep: Cep = { numerocep: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cepService: Cepservice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cepService.getCep(+id).subscribe({
        next: (data) => (this.cep = data),
        error: (err) => console.error('Erro ao carregar cep: ', err)
      });
    }
  }

  onSubmit(): void {
    const action = this.isEdit
      ? this.cepService.updateCep(this.cep.codcep!, this.cep)
      : this.cepService.createCep(this.cep);

    // O serviço agora atualiza a lista automaticamente.
    // Após a conclusão, apenas navegamos de volta.
    action.subscribe({
      next: () => this.router.navigate(['/ceps']),
      error: (err) => console.error('Erro ao salvar cep: ', err)
    });
  }
}