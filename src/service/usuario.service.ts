import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { RegistroDTO, UsuarioDTO } from '../interface/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  registrar(dadosRegistro: RegistroDTO) {
    let url = environment.baseUrl + "/usuario/registrar";
    return this.http.post(url, dadosRegistro);
  }

  atualizar(usuario: UsuarioDTO) {
    let url = environment.baseUrl + "/usuario/atualizar";
    return this.http.post<UsuarioDTO>(url, usuario);
  }
}
