import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
  selector: "app-tarefa-cadastrar",
  templateUrl: "./tarefa-cadastrar.component.html",
  styleUrls: ["./tarefa-cadastrar.component.css"],
})
export class TarefaCadastrarComponent {
  titulo: string = "";
  descricao: string = "";
  categoriaId: number = 0;
  categorias: Categoria[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.client
      .get<Categoria[]>("https://localhost:7015/api/categoria/listar")
      .subscribe({
        //A requição funcionou
        next: (categorias) => {
          console.table(categorias);
          this.categorias = categorias;
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  cadastrar(): void {
    let tarefa: Tarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      categoriaId: this.categoriaId,
    };

    this.client
      .post<Tarefa>(
        "https://localhost:7015/api/tarefa/cadastrar",
        tarefa
      )
      .subscribe({
        //A requição funcionou
        next: (tarefa) => {
          this.snackBar.open(
            "Tarefa cadastrado com sucesso!!",
            "Gerenciamento de Tarefas",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/tarefa/listar"]);
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
