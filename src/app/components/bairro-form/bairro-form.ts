// Em: sexo-form.ts
import { Component, OnInit } from '@angular/core';
import { Bairro, Bairroservice } from '../../services/bairroservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bairro-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './bairro-form.html',
  styleUrl: './bairro-form.scss'
})
export class BairroForm implements OnInit {
  bairro: Bairro = { nomebairro: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bairroService: Bairroservice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bairroService.getBairro(+id).subscribe({
        next: (data) => (this.bairro = data),
        error: (err) => console.error('Erro ao carregar bairro: ', err)
      });
    }
  }

  onSubmit(): void {
    const action = this.isEdit
      ? this.bairroService.updateBairro(this.bairro.codbairro!, this.bairro)
      : this.bairroService.createBairro(this.bairro);

    // O serviço agora atualiza a lista automaticamente.
    // Após a conclusão, apenas navegamos de volta.
    action.subscribe({
      next: () => this.router.navigate(['/bairros']),
      error: (err) => console.error('Erro ao salvar bairro: ', err)
    });
  }
}