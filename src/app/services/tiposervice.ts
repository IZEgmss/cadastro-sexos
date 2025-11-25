// Em: src/app/services/sexoservice.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface (se já não estiver aqui)
export interface Tipo {
  codtipo?: number;
  nometipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class Tiposervice {
  private apiUrl = 'http://localhost:8090/tipos'; // Substitua pela URL da sua API

  // 1. BehaviorSubject para guardar e emitir a lista de sexos
  private tiposSubject = new BehaviorSubject<Tipo[]>([]);

  // 2. Observable público para os componentes se inscreverem
  public tipos$: Observable<Tipo[]> = this.tiposSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Método para carregar a lista da API e notificar os inscritos
  public loadTipos(): void {
    this.http.get<Tipo[]>(this.apiUrl).subscribe(
      tipos => this.tiposSubject.next(tipos), // Emite a nova lista
      error => console.error('Erro ao carregar sexos do serviço', error)
    );
  }

  getTipo(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/${id}`);
  }

  // 4. Após criar, recarregue a lista
  createTipo(tipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(this.apiUrl, tipo).pipe(
      tap(() => this.loadTipos()) // Recarrega a lista após o sucesso
    );
  }

  // 5. Após atualizar, recarregue a lista
  updateTipo(id: number, sexo: Tipo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, sexo).pipe(
      tap(() => this.loadTipos()) // Recarrega a lista após o sucesso
    );
  }
  
  // 6. Após deletar, recarregue a lista
  deleteTipo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTipos()) // Recarrega a lista após o sucesso
    );
  }
}