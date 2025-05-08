import { UsuarioDTO } from "./Usuario";

export interface Category {
  name: string;
  isAdult: boolean;
}

export interface Game {
  id: number | null;
  name: string;
  release: number;
  plataform: string;
  synopsis: string;
  imageBase64: string;
  adult: boolean;
  true: boolean;
  categories: Category[];
  jogoUsuario: JogoUsuario;
}

export interface JogoUsuario {
  nota: number;
  isPossui: boolean;
  comentario: string;
  usuarioDto: UsuarioDTO;
}