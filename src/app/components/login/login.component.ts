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
import { Router } from '@angular/router';

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
  registerForm: FormGroup; 

  
  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: [''],
      contraseña: ['']
    });
    this.registerForm = this.fb.group({
    nombre: [''],
    apellido: [''],
    cedula: [''],
    usuario: [''],
    tipo_usuario: [''],
    genero: [''],
    direccion: [''],
    contrasenia: ['']
  });
    this.cargarUsuarios();
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }
  cargarUsuarios() {
  this.http.get<Usuario[]>('http://localhost:3000/usuario').subscribe((data) => {
    this.usuarios = data;
  });

};

  login() {
  const { usuario, contraseña } = this.loginForm.value;
  const user = this.usuarios.find(
    u => u.usuario === usuario && u.contrasenia === contraseña
  );
  if (user) {
    this.errorMessage = '';
    // Guarda el usuario y tipo en localStorage
    localStorage.setItem('usuarioLogueado', JSON.stringify(user));
    alert('¡Login exitoso!');
    this.router.navigate(['/usuario']);
    // Aquí puedes redirigir a la ruta del CRUD, por ejemplo:
    // this.router.navigate(['/crud-usuario']);
  } else {
    this.errorMessage = 'Usuario o contraseña incorrectos';
  }
}

  register() {
  if (this.registerForm.invalid) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  const nuevoUsuario = this.registerForm.value;
  this.http.post<Usuario>('http://localhost:3000/usuario', nuevoUsuario)
    .subscribe({
      next: (usuario) => {
        alert('¡Usuario registrado exitosamente!');
        this.toggleRegister();
        this.cargarUsuarios();
        this.registerForm.reset();
      },
      error: (err) => {
        alert('Error al registrar usuario');
        console.error(err);
      }
    });
}
}
