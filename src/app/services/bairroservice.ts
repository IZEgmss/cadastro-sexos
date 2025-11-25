// Em: src/app/services/sexoservice.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface (se já não estiver aqui)
export interface Bairro {
  codbairro?: number;
  nomebairro: string;
}

@Injectable({
  providedIn: 'root'
})
export class Bairroservice {
  private apiUrl = 'http://localhost:8090/bairros'; // Substitua pela URL da sua API

  // 1. BehaviorSubject para guardar e emitir a lista de sexos
  private bairrosSubject = new BehaviorSubject<Bairro[]>([]);

  // 2. Observable público para os componentes se inscreverem
  public bairros$: Observable<Bairro[]> = this.bairrosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Método para carregar a lista da API e notificar os inscritos
  public loadBairros(): void {
    this.http.get<Bairro[]>(this.apiUrl).subscribe(
      bairros => this.bairrosSubject.next(bairros), // Emite a nova lista
      error => console.error('Erro ao carregar sexos do serviço', error)
    );
  }

  getBairro(id: number): Observable<Bairro> {
    return this.http.get<Bairro>(`${this.apiUrl}/${id}`);
  }

  // 4. Após criar, recarregue a lista
  createBairro(bairro: Bairro): Observable<Bairro> {
    return this.http.post<Bairro>(this.apiUrl, bairro).pipe(
      tap(() => this.loadBairros()) // Recarrega a lista após o sucesso
    );
  }

  // 5. Após atualizar, recarregue a lista
  updateBairro(id: number, bairro: Bairro): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bairro).pipe(
      tap(() => this.loadBairros()) // Recarrega a lista após o sucesso
    );
  }
  
  // 6. Após deletar, recarregue a lista
  deleteBairro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadBairros()) // Recarrega a lista após o sucesso
    );
  }
}