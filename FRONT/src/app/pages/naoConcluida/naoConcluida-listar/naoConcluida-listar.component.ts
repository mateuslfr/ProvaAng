import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
  selector: "app-naoConcluida-listar",
  templateUrl: "./naoConcluida-listar.component.html",
  styleUrls: ["./naoConcluida-listar.component.css"],
})
export class NaoConcluidaListarComponent {
  colunasTabela: string[] = [
    "id",
    "titulo",
    "descricao",
    "criadoEm",
    "status",
    "categoria",
  ];
  tarefas: Tarefa[] = [];

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar
  ) {
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  }

  ngOnInit(): void {
    this.client
      .get<Tarefa[]>("https://localhost:7015/api/tarefa/naoconcluidas")
      .subscribe({
        //Requisição com sucesso
        next: (tarefas) => {
          console.table(tarefas);
          this.tarefas = tarefas;
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  
}
