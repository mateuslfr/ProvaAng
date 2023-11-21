import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
  selector: "app-tarefa-listar",
  templateUrl: "./tarefa-listar.component.html",
  styleUrls: ["./tarefa-listar.component.css"],
})
export class TarefaListarComponent {
  colunasTabela: string[] = [
    "id",
    "titulo",
    "descricao",
    "criadoEm",
    "status",
    "categoria",
    "alterar",
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
      .get<Tarefa[]>("https://localhost:7015/api/tarefa/listar")
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
