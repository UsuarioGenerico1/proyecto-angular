import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOption,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isRegistering = false;
  loginForm: FormGroup;
  errorMessage: string = '';
  usuarios: Usuario[] = [];
  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      usuario: [''],
      contraseña: ['']
    });
    this.cargarUsuarios();
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }
  cargarUsuarios() {
  this.http.get<Usuario[]>('/usuario.json').subscribe((data: Usuario[]) => {
    this.usuarios = data;
  });
}

  login() {
    const { usuario, contraseña } = this.loginForm.value;
    const user = this.usuarios.find(
      u => u.usuario === usuario && u.contraseña === contraseña
    );
    if (user) {
      this.errorMessage = '';
      // Aquí puedes redirigir o guardar sesión
      alert('¡Login exitoso!');
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  
  }

  register() {
    // Lógica para registrar usuario
  }
}
