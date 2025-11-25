// Em: sexo-form.ts
import { Component, OnInit } from '@angular/core';
import { Uf, Ufservice } from '../../services/ufservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uf-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './uf-form.html',
  styleUrl: './uf-form.scss'
})
export class UfForm implements OnInit {
  uf: Uf = {
    nomeuf: '',
    sigla: ''
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ufService: Ufservice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.ufService.getUf(+id).subscribe({
        next: (data) => (this.uf = data),
        error: (err) => console.error('Erro ao carregar uf: ', err)
      });
    }
  }

  onSubmit(): void {
    const action = this.isEdit
      ? this.ufService.updateUf(this.uf.coduf!, this.uf)
      : this.ufService.createUf(this.uf);

    // O serviço agora atualiza a lista automaticamente.
    // Após a conclusão, apenas navegamos de volta.
    action.subscribe({
      next: () => this.router.navigate(['/ufs']),
      error: (err) => console.error('Erro ao salvar uf: ', err)
    });
  }
}