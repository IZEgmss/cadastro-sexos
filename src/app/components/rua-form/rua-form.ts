// Em: sexo-form.ts
import { Component, OnInit } from '@angular/core';
import { Rua, Ruaservice } from '../../services/ruaservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rua-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './rua-form.html',
  styleUrl: './rua-form.scss'
})
export class RuaForm implements OnInit {
  rua: Rua = { nomerua: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ruaService: Ruaservice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.ruaService.getRua(+id).subscribe({
        next: (data) => (this.rua = data),
        error: (err) => console.error('Erro ao carregar rua: ', err)
      });
    }
  }

  onSubmit(): void {
  const action = this.isEdit
    ? this.ruaService.updateRua(this.rua.codrua!, this.rua)
    : this.ruaService.createRua(this.rua);

  action.subscribe({
    next: () => this.router.navigate(['/ruas']),
    error: (err) => {
      if (err.status === 200) {
        this.ruaService.loadRuas();
        this.router.navigate(['/ruas']);
      } else {
        console.error('Erro ao salvar rua: ', err);
      }
    }
  });
}
} 