import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// Importe as interfaces das dependências se necessário para tipagem de exibição
import { Sexo } from './sexoservice';
// ... outros imports

export interface Cliente {
  codcliente?: number;
  nomecliente: string;
  cpfcliente: string;
  datanasc: string; // Formato yyyy-MM-dd
  numerocasa: string;
  // Para exibição (GET), o backend retorna objetos completos
  sexo?: Sexo;
  rua?: any;    
  cidade?: any;
  bairro?: any;
  cep?: any;
}

// Payload para envio (POST/PUT) usa apenas IDs
export interface ClientePayload {
  nomecliente: string;
  cpfcliente: string;
  datanasc: string;
  numerocasa: string;
  codsexo: number;
  codrua: number;
  codcidade: number;
  codbairro: number;
  codcep: number;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'http://localhost:8090/clientes';
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadClientes(): void {
    this.http.get<Cliente[]>(this.apiUrl).subscribe(
      data => this.clientesSubject.next(data),
      error => console.error(error)
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createCliente(payload: ClientePayload): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, payload).pipe(tap(() => this.loadClientes()));
  }

  updateCliente(id: number, payload: ClientePayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload).pipe(tap(() => this.loadClientes()));
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => this.loadClientes()));
  }
}