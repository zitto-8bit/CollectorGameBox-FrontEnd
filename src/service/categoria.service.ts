import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Category } from '../interface/Game';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  buscarCategorias(): Observable<Category[]> {
    let url = environment.baseUrl + '/categoria/buscarTodas';
    return this.http.get<Category[]>(url);
  }
}
