// Em: src/app/services/sexoservice.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface (se já não estiver aqui)
export interface Uf {
  coduf?: number;
  nomeuf: string;
  sigla : string;
}

@Injectable({
  providedIn: 'root'
})
export class Ufservice {
  private apiUrl = 'http://localhost:8090/ufs'; // Substitua pela URL da sua API

  // 1. BehaviorSubject para guardar e emitir a lista de sexos
  private ufsSubject = new BehaviorSubject<Uf[]>([]);

  // 2. Observable público para os componentes se inscreverem
  public ufs$: Observable<Uf[]> = this.ufsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Método para carregar a lista da API e notificar os inscritos
  public loadUfs(): void {
    this.http.get<Uf[]>(this.apiUrl).subscribe(
      ufs => this.ufsSubject.next(ufs), // Emite a nova lista
      error => console.error('Erro ao carregar ufs do serviço', error)
    );
  }

  getUf(id: number): Observable<Uf> {
    return this.http.get<Uf>(`${this.apiUrl}/${id}`);
  }

  // 4. Após criar, recarregue a lista
  createUf(uf: Uf): Observable<Uf> {
    return this.http.post<Uf>(this.apiUrl, uf).pipe(
      tap(() => this.loadUfs()) // Recarrega a lista após o sucesso
    );
  }

  // 5. Após atualizar, recarregue a lista
  updateUf(id: number, uf: Uf): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, uf).pipe(
      tap(() => this.loadUfs()) // Recarrega a lista após o sucesso
    );
  }
  
  // 6. Após deletar, recarregue a lista
  deleteUf(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadUfs()) // Recarrega a lista após o sucesso
    );
  }
}