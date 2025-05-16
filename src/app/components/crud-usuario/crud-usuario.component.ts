// filepath: src/app/components/crud-usuario/crud-usuario.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/Usuario';
import { ServUsuarioService } from '../../services/serv-usuario.service';

@Component({
  selector: 'app-crud-usuario',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css'
})
export class CrudUsuarioComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: ServUsuarioService) {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }
}