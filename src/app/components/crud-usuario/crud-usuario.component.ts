import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Usuario } from '../../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-usuario',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css'
})
export class CrudUsuarioComponent {
  usuarios: Usuario[] = [];

  constructor(private http: HttpClient) {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.http.get<Usuario[]>('/usuario.json').subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

}
