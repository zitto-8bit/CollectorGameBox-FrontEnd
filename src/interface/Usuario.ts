export interface RegistroDTO {
    nome: string;
    email: string;
    senha: string;
    dataNasc: string;
    acessibilidade: 'S' | 'N';
}

export interface LoginDTO {
    email: string;
    senha: string;
}  

export interface UsuarioDTO {
    id: number;
    nome: string | null;
    email: string;
    biografia: string | null;
    icone: string | null;
    token: string;
    acessibilidade: string;
    acesso: string;
}