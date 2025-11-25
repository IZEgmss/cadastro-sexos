// Em: src/app/services/sexoservice.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface (se já não estiver aqui)
export interface Rua {
  codrua?: number;
  nomerua: string;
}

@Injectable({
  providedIn: 'root'
})
export class Ruaservice {
  private apiUrl = 'http://localhost:8090/ruas'; // Substitua pela URL da sua API

  // 1. BehaviorSubject para guardar e emitir a lista de sexos
  private ruasSubject = new BehaviorSubject<Rua[]>([]);

  // 2. Observable público para os componentes se inscreverem
  public ruas$: Observable<Rua[]> = this.ruasSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Método para carregar a lista da API e notificar os inscritos
  public loadRuas(): void {
    this.http.get<Rua[]>(this.apiUrl).subscribe(
      ruas => this.ruasSubject.next(ruas), // Emite a nova lista
      error => console.error('Erro ao carregar ruas do serviço', error)
    );
  }

  getRua(id: number): Observable<Rua> {
    return this.http.get<Rua>(`${this.apiUrl}/${id}`);
  }

  // 4. Após criar, recarregue a lista
  createRua(rua: Rua): Observable<Rua> {
    return this.http.post<Rua>(this.apiUrl, rua).pipe(
      tap(() => this.loadRuas()) // Recarrega a lista após o sucesso
    );
  }

  // 5. Após atualizar, recarregue a lista
  updateRua(id: number, rua: Rua): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, rua).pipe(
      tap(() => this.loadRuas()) // Recarrega a lista após o sucesso
    );
  }
  
  // 6. Após deletar, recarregue a lista
  deleteRua(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadRuas()) // Recarrega a lista após o sucesso
    );
  }
}