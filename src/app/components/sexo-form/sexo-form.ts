// Em: sexo-form.ts
import { Component, OnInit } from '@angular/core';
import { Sexo, Sexoservice } from '../../services/sexoservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sexo-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sexo-form.html',
  styleUrl: './sexo-form.scss'
})
export class SexoForm implements OnInit {
  sexo: Sexo = { nomesexo: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sexoService: Sexoservice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.sexoService.getSexo(+id).subscribe({
        next: (data) => (this.sexo = data),
        error: (err) => console.error('Erro ao carregar sexo: ', err)
      });
    }
  }

  onSubmit(): void {
    const action = this.isEdit
      ? this.sexoService.updateSexo(this.sexo.codsexo!, this.sexo)
      : this.sexoService.createSexo(this.sexo);

    action.subscribe({
      next: () => this.router.navigate(['/sexos']),
      error: (err) => {
        // A MUDANÇA ESTÁ AQUI:
        // Se o erro for apenas "Angular não conseguiu ler o texto OK", o status será 200.
        if (err.status === 200) {
          // 1. Força o recarregamento da lista para garantir que o item apareça alterado
          this.sexoService.loadSexos(); 
          // 2. Navega de volta para a listagem
          this.router.navigate(['/sexos']);
        } else {
          // Se for um erro real (ex: servidor fora do ar), mostra no console
          console.error('Erro real ao salvar:', err);
        }
      }
    });
  }
}