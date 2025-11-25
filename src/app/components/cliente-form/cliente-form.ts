import { Component, OnInit } from '@angular/core';
/* ... imports de Router, Forms, etc ... */
/* ... imports de TODOS os services (Sexo, Rua, Bairro, Cep, Cidade) ... */
import { ClienteService, ClientePayload } from '../../services/clienteservice';
import { Observable } from 'rxjs';
import { Sexoservice } from '../../services/sexoservice';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Bairroservice } from '../../services/bairroservice';
import { Cepservice } from '../../services/cepservice';
import { CidadeService } from '../../services/cidadeservice';
import { Ruaservice } from '../../services/ruaservice';

@Component({ 
  selector: 'app-cliente-form',
 templateUrl: './cliente-form.html',
 styleUrls: ['./cliente-form.scss'] 
})
export class ClienteForm implements OnInit {
  // Campos do formulário
  clienteData = {
    nome: '', cpf: '', dataNasc: '', numero: ''
  };
  
  // Seleções (Objetos completos para o select funcionar visualmente)
  selSexo: any; selRua: any; selBairro: any; selCep: any; selCidade: any;

  // Observables para as listas
  sexos$!: Observable<any[]>;
  ruas$!: Observable<any[]>;
  bairros$!: Observable<any[]>;
  ceps$!: Observable<any[]>;
  cidades$!: Observable<any[]>;

  isEdit = false;
  currentId?: number;
  ruasService: any;

  constructor(
    private clienteService: ClienteService,
    // Injetar todos os outros services aqui
    private sexoService: Sexoservice,
    private ruaService: Ruaservice,
    private bairroService: Bairroservice,
    private cepService: Cepservice,
    private cidadeService: CidadeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Carregar todas as listas
    this.sexos$ = this.sexoService.sexos$; this.sexoService.loadSexos();
    this.ruas$ = this.ruasService.ruas$; this.ruasService.loadRuas();
    this.bairros$ = this.bairroService.bairros$; this.bairroService.loadBairros();
    this.ceps$ = this.cepService.ceps$; this.cepService.loadCeps();
    this.cidades$ = this.cidadeService.cidades$; this.cidadeService.loadCidades();

    // 2. Verificar Edição
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.currentId = +id;
      this.clienteService.getCliente(+id).subscribe(c => {
        this.clienteData.nome = c.nomecliente;
        this.clienteData.cpf = c.cpfcliente;
        this.clienteData.dataNasc = c.datanasc; // Verificar formato no backend
        this.clienteData.numero = c.numerocasa;
        
        // O Angular vai casar esses objetos com as listas carregadas via [compareWith]
        this.selSexo = c.sexo;
        this.selRua = c.rua;
        this.selBairro = c.bairro;
        this.selCep = c.cep;
        this.selCidade = c.cidade;
      });
    }
  }

  // Função genérica de comparação por ID (pode usar para todos se os IDs forem padronizados)
  compareById(o1: any, o2: any): boolean {
    // Verifica se as propriedades de ID existem e são iguais
    if(!o1 || !o2) return o1 === o2;
    // Ajuste conforme o nome do ID em cada objeto (codsexo, codrua, etc)
    return JSON.stringify(o1) === JSON.stringify(o2); 
    // Ou faça funções especificas: return o1.codsexo === o2.codsexo;
  }

  onSubmit() {
  const payload: ClientePayload = {
    nomecliente: this.clienteData.nome,
    cpfcliente: this.clienteData.cpf,
    datanasc: this.clienteData.dataNasc,
    numerocasa: this.clienteData.numero,
    codsexo: this.selSexo?.codsexo,
    codrua: this.selRua?.codrua,
    codbairro: this.selBairro?.codbairro,
    codcep: this.selCep?.codcep,
    codcidade: this.selCidade?.codcidade
  };

  const action = this.isEdit 
    ? this.clienteService.updateCliente(this.currentId!, payload)
    : this.clienteService.createCliente(payload);

  action.subscribe({
    next: () => this.router.navigate(['/clientes']),
    error: (err) => {
      if (err.status === 200) {
        this.clienteService.loadClientes();
        this.router.navigate(['/clientes']);
      } else {
        console.error('Erro ao salvar cliente:', err);
      }
    }
  });
}
}