import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Usuario } from '../../models/Usuario';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud-usuario',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css'
})
export class CrudUsuarioComponent {
  usuarios: Usuario[] = [];
  private url = 'http://localhost:3000/usuario';

  constructor(private httpclient: HttpClient) {
    this.cargarUsuarios();
  }
     cargarUsuarios() {
    this.httpclient.get< Usuario[]>(this.url).subscribe((data) => {
      this.usuarios = data;
    });
   }
  
  }

 

