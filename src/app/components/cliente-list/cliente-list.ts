import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente, ClienteService } from '../../services/clienteservice';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.scss'
})
export class ClienteList implements OnInit {
  clientes$!: Observable<Cliente[]>;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clientes$ = this.clienteService.clientes$;
    this.clienteService.loadClientes();
  }

  deleteCliente(id: number): void {
    if (confirm('Deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe();
    }
  }
}