import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Uf } from './ufservice';

export interface Cidade {
  codcidade?: number;
  nomecidade: string;
  uf?: Uf; // O backend retorna o objeto UF completo no GET
}

// Interface auxiliar para enviar ao Backend (conforme CidadeForm.java)
export interface CidadePayload {
  codcidade?: number;
  nomecidade: string;
  nomeuf: string; // Backend espera a string do nome
}

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = 'http://localhost:8090/cidades';

  private cidadesSubject = new BehaviorSubject<Cidade[]>([]);
  public cidades$: Observable<Cidade[]> = this.cidadesSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadCidades(): void {
    this.http.get<Cidade[]>(this.apiUrl).subscribe(
      data => this.cidadesSubject.next(data),
      error => console.error('Erro ao carregar cidades', error)
    );
  }

  getCidade(id: number): Observable<Cidade> {
    // Nota: O backend usa @RequestParam para id no GET /cidades/{id} ?
    // Olhando o controller: @GetMapping("/{id}") public Cidade getCidadeId(@RequestParam Integer id)
    // Isso parece um erro no backend (misturar PathVariable com RequestParam), 
    // mas se a rota for /cidades/1, o Angular faz o GET normal.
    return this.http.get<Cidade>(`${this.apiUrl}/${id}?id=${id}`); 
  }

  createCidade(payload: CidadePayload): Observable<Cidade> {
    return this.http.post<Cidade>(this.apiUrl, payload).pipe(tap(() => this.loadCidades()));
  }

  updateCidade(id: number, payload: CidadePayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload).pipe(tap(() => this.loadCidades()));
  }

  deleteCidade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => this.loadCidades()));
  }
}