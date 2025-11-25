// Em: src/app/services/sexoservice.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface (se já não estiver aqui)
export interface Marca {
  codmarca?: number;
  nomemarca: string;
}

@Injectable({
  providedIn: 'root'
})
export class Marcaservice {
  private apiUrl = 'http://localhost:8090/marcas'; // Substitua pela URL da sua API

  // 1. BehaviorSubject para guardar e emitir a lista de sexos
  private marcasSubject = new BehaviorSubject<Marca[]>([]);

  // 2. Observable público para os componentes se inscreverem
  public marcas$: Observable<Marca[]> = this.marcasSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Método para carregar a lista da API e notificar os inscritos
  public loadMarcas(): void {
    this.http.get<Marca[]>(this.apiUrl).subscribe(
      marcas => this.marcasSubject.next(marcas), // Emite a nova lista
      error => console.error('Erro ao carregar sexos do serviço', error)
    );
  }

  getMarca(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  // 4. Após criar, recarregue a lista
  createMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca).pipe(
      tap(() => this.loadMarcas()) // Recarrega a lista após o sucesso
    );
  }

  // 5. Após atualizar, recarregue a lista
  updateMarca(id: number, marca: Marca): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, marca).pipe(
      tap(() => this.loadMarcas()) // Recarrega a lista após o sucesso
    );
  }
  
  // 6. Após deletar, recarregue a lista
  deleteMarca(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadMarcas()) // Recarrega a lista após o sucesso
    );
  }
}