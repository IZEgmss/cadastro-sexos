// Em: src/app/services/sexoservice.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface (se já não estiver aqui)
export interface Sexo {
  codsexo?: number;
  nomesexo: string;
}

@Injectable({
  providedIn: 'root'
})
export class Sexoservice {
  private apiUrl = 'http://localhost:8090/sexos'; // Substitua pela URL da sua API

  // 1. BehaviorSubject para guardar e emitir a lista de sexos
  private sexosSubject = new BehaviorSubject<Sexo[]>([]);

  // 2. Observable público para os componentes se inscreverem
  public sexos$: Observable<Sexo[]> = this.sexosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Método para carregar a lista da API e notificar os inscritos
  public loadSexos(): void {
    this.http.get<Sexo[]>(this.apiUrl).subscribe(
      sexos => this.sexosSubject.next(sexos), // Emite a nova lista
      error => console.error('Erro ao carregar sexos do serviço', error)
    );
  }

  getSexo(id: number): Observable<Sexo> {
    return this.http.get<Sexo>(`${this.apiUrl}/${id}`);
  }

  // 4. Após criar, recarregue a lista
  createSexo(sexo: Sexo): Observable<Sexo> {
    return this.http.post<Sexo>(this.apiUrl, sexo).pipe(
      tap(() => this.loadSexos()) // Recarrega a lista após o sucesso
    );
  }

  // 5. Após atualizar, recarregue a lista
  updateSexo(id: number, sexo: Sexo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, sexo).pipe(
      tap(() => this.loadSexos()) // Recarrega a lista após o sucesso
    );
  }
  
  // 6. Após deletar, recarregue a lista
  deleteSexo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadSexos()) // Recarrega a lista após o sucesso
    );
  }
}