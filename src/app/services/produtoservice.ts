import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Marca } from './marcaservice';
import { Tipo } from './tiposervice';

export interface Produto {
  codproduto?: number;
  nomeproduto: string;
  valor: number;
  quantidade: number;
  marca?: Marca; // Relacionamento
  tipo?: Tipo;   // Relacionamento
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8090/produtos';

  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  public produtos$: Observable<Produto[]> = this.produtosSubject.asObservable();

  constructor(private http: HttpClient) { }

  public loadProdutos(): void {
    this.http.get<Produto[]>(this.apiUrl).subscribe(
      data => this.produtosSubject.next(data),
      error => console.error('Erro ao carregar produtos', error)
    );
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  createProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto).pipe(
      tap(() => this.loadProdutos())
    );
  }

  updateProduto(id: number, produto: Produto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produto).pipe(
      tap(() => this.loadProdutos())
    );
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadProdutos())
    );
  }
}