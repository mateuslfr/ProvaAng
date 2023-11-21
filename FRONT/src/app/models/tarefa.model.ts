import { Categoria } from "./categoria.model";

export interface Tarefa {
    tarefaId?: number;
    titulo: string;
    descricao: string;
    CriadoEm?: Date;
    status?: string;
    categoriaId: number;
    categoria?: Categoria;
  }
  