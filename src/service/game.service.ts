import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Game, JogoUsuario } from '../interface/Game';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../interface/Usuario';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    let url = environment.baseUrl + "/game/buscarTodos";
    return this.http.get<Game[]>(url);
  }

  buscarNaoAtivos(): Observable<Game[]> {
    let url = environment.baseUrl + "/game/buscarNaoAtivos";
    return this.http.get<Game[]>(url);
  }

  getAllUserGames(usuario: UsuarioDTO): Observable<Game[]> {
    let url = environment.baseUrl + "/game/buscarTodos";
    return this.http.post<Game[]>(url, usuario);
  }

  saveGame(game: Game) {
    let url = environment.baseUrl + "/game/salvarJogo";
    return this.http.post(url, game);
  }

  aprovarJogo(id: number) {
    let url = environment.baseUrl + "/game/aprovarJogo/" + id;
    return this.http.get(url);
  }

  reprovarJogo(id: number) {
    let url = environment.baseUrl + "/game/reprovarJogo/" + id;
    return this.http.get(url);
  }

  sugerir(game: Game) {
    let url = environment.baseUrl + "/game/sugerirJogo";
    return this.http.post(url, game);
  }

  buscarUsuariosJogo(game: Game): Observable<JogoUsuario[]> {
    let url = environment.baseUrl + "/game/buscarUsuariosJogo";
    return this.http.post<JogoUsuario[]>(url, game);
  }
  
  buscarJogosDoUsuario(idUsuario: number): Observable<Game[]> {
    let url = environment.baseUrl + "/game/buscarJogosDoUsuario/" + idUsuario;
    return this.http.get<Game[]>(url);
  }
}
