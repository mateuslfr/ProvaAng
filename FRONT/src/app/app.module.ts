import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TarefaListarComponent } from "./pages/tarefa/tarefa-listar/tarefa-listar.component";
import { TarefaAlterarComponent } from "./pages/tarefa/tarefa-alterar/tarefa-alterar.component";
import { TarefaCadastrarComponent } from "./pages/tarefa/tarefa-cadastrar/tarefa-cadastrar.component";
import { ConcluidaListarComponent } from "./pages/concluida/concluida-listar/concluida-listar.component";
import { NaoConcluidaListarComponent } from "./pages/naoConcluida/naoConcluida-listar/naoConcluida-listar.component";






@NgModule({
  declarations: [
    AppComponent,
    TarefaAlterarComponent,
    TarefaListarComponent,
    TarefaCadastrarComponent,
    NaoConcluidaListarComponent,
    ConcluidaListarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
