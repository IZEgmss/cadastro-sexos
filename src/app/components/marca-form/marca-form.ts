// Em: sexo-form.ts
import { Component, OnInit } from '@angular/core';
import { Marca, Marcaservice } from '../../services/marcaservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marca-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './marca-form.html',
  styleUrl: './marca-form.scss'
})
export class MarcaForm implements OnInit {
  marca: Marca = { nomemarca: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marcaService: Marcaservice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.marcaService.getMarca(+id).subscribe({
        next: (data) => (this.marca = data),
        error: (err) => console.error('Erro ao carregar marca: ', err)
      });
    }
  }

  onSubmit(): void {
    const action = this.isEdit
      ? this.marcaService.updateMarca(this.marca.codmarca!, this.marca)
      : this.marcaService.createMarca(this.marca);

    // O serviço agora atualiza a lista automaticamente.
    // Após a conclusão, apenas navegamos de volta.
    action.subscribe({
      next: () => this.router.navigate(['/marcas']),
      error: (err) => console.error('Erro ao salvar marca: ', err)
    });
  }
}