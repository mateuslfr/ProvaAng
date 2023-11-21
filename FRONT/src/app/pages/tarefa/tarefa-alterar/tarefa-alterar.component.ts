import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
  selector: "app-tarefa-alterar",
  templateUrl: "./tarefa-alterar.component.html",
  styleUrls: ["./tarefa-alterar.component.css"],
})
export class TarefaAlterarComponent {
  tarefaId: number = 0;
  titulo: string = "";
  descricao: string = "";
  status: string = "";
  categoriaId: number = 0;
  categorias: Categoria[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
        this.client
          .get<Tarefa>(
            `https://localhost:7015/api/tarefa/listar/${id}`
          )
          .subscribe({
            next: (tarefa) => {
              this.client
                .get<Categoria[]>(
                  "https://localhost:7015/api/categoria/listar"
                )
                .subscribe({
                  next: (categorias) => {
                    this.categorias = categorias;

                    this.tarefaId = tarefa.tarefaId!;
                    this.titulo = tarefa.titulo;
                    this.descricao = tarefa.descricao;
                    this.categoriaId = tarefa.categoriaId;
                  },
                  error: (erro) => {
                    console.log(erro);
                  },
                });
            },
            //Requisição com erro
            error: (erro) => {
              console.log(erro);
            },
          });
      },
    });
  }

  alterar(): void {
    let tarefa: Tarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      status: this.status,
      categoriaId: this.categoriaId,
    };

    console.log(tarefa);

    this.client
      .patch<Tarefa>(
        `https://localhost:7015/api/tarefa/alterar/${this.tarefaId}`,
        tarefa
      )
      .subscribe({
        //A requição funcionou
        next: (tarefa) => {
          this.snackBar.open(
            "Tarefa alterado com sucesso!!",
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
