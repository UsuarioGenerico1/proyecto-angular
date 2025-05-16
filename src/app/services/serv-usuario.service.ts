import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServUsuarioService {
  private url = 'http://localhost:3000/usuario'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }
}