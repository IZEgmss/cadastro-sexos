// Em: src/app/services/sexoservice.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface (se já não estiver aqui)
export interface Cep {
  codcep?: number;
  numerocep: string;
}

@Injectable({
  providedIn: 'root'
})
export class Cepservice {
  private apiUrl = 'http://localhost:8090/ceps'; // Substitua pela URL da sua API

  // 1. BehaviorSubject para guardar e emitir a lista de sexos
  private cepsSubject = new BehaviorSubject<Cep[]>([]);

  // 2. Observable público para os componentes se inscreverem
  public ceps$: Observable<Cep[]> = this.cepsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Método para carregar a lista da API e notificar os inscritos
  public loadCeps(): void {
    this.http.get<Cep[]>(this.apiUrl).subscribe(
      ceps => this.cepsSubject.next(ceps), // Emite a nova lista
      error => console.error('Erro ao carregar ceps do serviço', error)
    );
  }

  getCep(id: number): Observable<Cep> {
    return this.http.get<Cep>(`${this.apiUrl}/${id}`);
  }

  // 4. Após criar, recarregue a lista
  createCep(cep: Cep): Observable<Cep> {
    return this.http.post<Cep>(this.apiUrl, cep).pipe(
      tap(() => this.loadCeps()) // Recarrega a lista após o sucesso
    );
  }

  // 5. Após atualizar, recarregue a lista
  updateCep(id: number, cep: Cep): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cep).pipe(
      tap(() => this.loadCeps()) // Recarrega a lista após o sucesso
    );
  }
  
  // 6. Após deletar, recarregue a lista
  deleteCep(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadCeps()) // Recarrega a lista após o sucesso
    );
  }
}