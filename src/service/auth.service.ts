// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginDTO, UsuarioDTO } from '../interface/Usuario';
import { environment } from '../environments/environment.development';
import { AcessibilidadeService } from './acessibilidade.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private acessibilidadeService: AcessibilidadeService) {}

  logar(dadosLogin: LoginDTO) {
    let url = environment.baseUrl + "/usuario/logar";
    return this.http.post<UsuarioDTO>(url, dadosLogin).pipe(
      tap((res) => {
        this.acessibilidadeService.aplicarEstiloSeNecessario(res);
        sessionStorage.setItem('usuario', JSON.stringify(res));
      })
    );;
  }

  logout(): void {
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('usuario');
  }

  getToken(): string | null {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString) {
      const usuario: UsuarioDTO = JSON.parse(usuarioString);

      return usuario.token;
    }

    return null;
  }

  getUsuario() {
    const usuarioString = sessionStorage.getItem('usuario'); 
    if (usuarioString) {
      return JSON.parse(usuarioString) as UsuarioDTO;
    }
    return null;
  }

  isAdmin() {
    const usuarioString = sessionStorage.getItem('usuario'); 
    if (usuarioString) {
      const usuario: UsuarioDTO = JSON.parse(usuarioString) as UsuarioDTO;
      return usuario.acesso == 'ADMIN';
    }
    return false;
  }

  updateUsuarioSession(usuario: UsuarioDTO) {
    this.acessibilidadeService.aplicarEstiloSeNecessario(usuario);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['/inicio']);
  }
}
