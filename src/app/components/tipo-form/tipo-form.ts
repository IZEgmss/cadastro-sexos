// Em: sexo-form.ts
import { Component, OnInit } from '@angular/core';
import { Tipo, Tiposervice } from '../../services/tiposervice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './tipo-form.html',
  styleUrl: './tipo-form.scss'
})
export class TipoForm implements OnInit {
  tipo: Tipo = { nometipo: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoService: Tiposervice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tipoService.getTipo(+id).subscribe({
        next: (data) => (this.tipo = data),
        error: (err) => console.error('Erro ao carregar tipo: ', err)
      });
    }
  }

  onSubmit(): void {
    const action = this.isEdit
      ? this.tipoService.updateTipo(this.tipo.codtipo!, this.tipo)
      : this.tipoService.createTipo(this.tipo);

    // O serviço agora atualiza a lista automaticamente.
    // Após a conclusão, apenas navegamos de volta.
    action.subscribe({
      next: () => this.router.navigate(['/tipos']),
      error: (err) => console.error('Erro ao salvar tipo: ', err)
    });
  }
}