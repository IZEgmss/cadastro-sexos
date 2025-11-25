import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Payload para enviar ao Backend
export interface ItemVendaPayload {
  produtoId: number;
  quantidade: number;
}

export interface VendaPayload {
  clienteId: number;
  itens: ItemVendaPayload[];
}

// Interfaces para leitura (GET)
export interface Venda {
  codvenda: number;
  datavenda: string;
  cliente: any; // Objeto cliente completo
  itens: any[]; // Lista de itens venda
}

@Injectable({ providedIn: 'root' })
export class VendaService {
  private apiUrl = 'http://localhost:8090/vendas';
  private vendasSubject = new BehaviorSubject<Venda[]>([]);
  public vendas$ = this.vendasSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadVendas(): void {
    this.http.get<Venda[]>(this.apiUrl).subscribe(
      data => this.vendasSubject.next(data),
      error => console.error(error)
    );
  }

  createVenda(venda: VendaPayload): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, venda).pipe(tap(() => this.loadVendas()));
  }
  
  // ... update e delete seguindo padrão
}