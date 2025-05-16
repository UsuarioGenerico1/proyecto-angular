import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServUsuarioService {
  private url = 'http://localhost:3000/usuario'; // Cambia la URL si es necesario

  constructor(private httpcliente: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.httpcliente.get<Usuario[]>(this.url);
  }

  // updateUsuario(usuario: Usuario): Observable<Usuario> {
  // return this.httpcliente.put<Usuario>(`${this.url}/${usuario.id}`, usuario);
  // }

  // deleteUsuario(id: number): Observable<any> {
  // return this.httpcliente.delete(`${this.url}/${id}`);
  // }

}
