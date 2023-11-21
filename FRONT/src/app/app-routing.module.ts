import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TarefaListarComponent } from "./pages/tarefa/tarefa-listar/tarefa-listar.component";
import { TarefaAlterarComponent } from "./pages/tarefa/tarefa-alterar/tarefa-alterar.component";
import { TarefaCadastrarComponent } from "./pages/tarefa/tarefa-cadastrar/tarefa-cadastrar.component";

import { ConcluidaListarComponent } from "./pages/concluida/concluida-listar/concluida-listar.component";
import { NaoConcluidaListarComponent } from "./pages/naoConcluida/naoConcluida-listar/naoConcluida-listar.component";






const routes: Routes = [
  
  
  {
    path: "pages/tarefa/listar",
    component: TarefaListarComponent,
  },
  {
    path: "pages/tarefa/alterar/:id",
    component: TarefaAlterarComponent,
  },
  {
    path: "pages/tarefa/cadastrar",
    component: TarefaCadastrarComponent,
  },
  {
    path: "pages/tarefa/concluida",
    component: ConcluidaListarComponent,
  },
  {
    path: "pages/tarefa/naoConcluida",
    component: NaoConcluidaListarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
