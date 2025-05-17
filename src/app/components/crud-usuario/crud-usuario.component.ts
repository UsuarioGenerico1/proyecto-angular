// filepath: src/app/components/crud-usuario/crud-usuario.component.ts
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/Usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { ServUsuarioService } from '../../services/serv-usuario.service';
import { Router } from '@angular/router';
//Material Angular 

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Para paginación
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatIconModule } from '@angular/material/icon'; // Para íconos
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { MatFormFieldModule } from '@angular/material/form-field'; // Para campos de formulario
import { MatSelectModule } from '@angular/material/select'; // Para selectores



@Component({
  selector: 'app-crud-usuario',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    //Validators,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule

  ],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css'
})
export class CrudUsuarioComponent implements OnInit, AfterViewInit{

  // FormGroup para manejar el formulario reactivo
  form!: FormGroup;
  
  // Bandera para saber si estamos en modo edición
   isEditMode: boolean = false;
  
  // ID de la película actualmente en edición
   currentId!: number;

  // Columnas a mostrar en la tabla
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'cedula',
    'usuario',
    'tipo_usuario',
    'genero',
    'direccion',
    'contrasenia',
    'actions'
  ];

  tipoUsuario: string | null = null;

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<Usuario>();

  

  // Referencia al paginador de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;
// Método del ciclo de vida: después de inicializar la vista
  ngAfterViewInit() {
    // Asigna el paginador a la tabla
    this.dataSource.paginator = this.paginator;
    
  }

  
  


  constructor(
    private usuarioService: ServUsuarioService,
    private fb: FormBuilder,
    private router: Router
    ) {}

  // Método del ciclo de vida: inicialización del componente
  ngOnInit(): void {
    this.cargarUsuarios(); // Carga 
    

    // inicial de datos

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10 dígitos
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      tipo_usuario: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);
      this.tipoUsuario = user.tipo_usuario;
    }else {
    this.router.navigate(['/login']); // Redirige si no hay usuario logueado
  }
    
  }


  cargarUsuarios():void {
    this.usuarioService.getUsuarios().subscribe((data:Usuario[]) => {
      this.dataSource.data = data;
      
      
    });
  }
  // Búsqueda de Usuario
  search(cajaTexto: HTMLInputElement) {
    if (cajaTexto.value) {
      // Si hay texto, busca películas que coincidan
      this.usuarioService
        .getUsuarioSearch(cajaTexto.value)
        .subscribe((data: Usuario[]) => {
          this.dataSource.data = data;
            this.dataSource.paginator = this.paginator; 
        });
    } else {
      
      this.cargarUsuarios();
    }
  }

  // Elimina una película con confirmación
  eliminar(usuario: Usuario) {
    const confirmado = confirm(
      `Está seguro de que desea eliminar la película ${usuario.nombre}?`
    );
    if (confirmado) {
      this.usuarioService.deleteUsuario(usuario).subscribe({
        next: () => {
          alert('La película ha sido eliminada correctamente.');
          this.cargarUsuarios(); // Recarga la lista
        },
        error: (err) => {
          console.error('Error al eliminar la película:', err);
          alert('Ocurrió un error al intentar eliminar la película.');
        },
      });
    }
  }

  // Prepara el formulario para editar una película
  editar(usu: Usuario) {
    this.isEditMode = true; // Activa modo edición
    this.currentId = usu.id; // Guarda el ID

    // Llena el formulario con los datos de la película
    this.form.setValue({
      nombre: usu.nombre,
      apellido: usu.apellido,
      cedula: usu.cedula,
      usuario: usu.usuario,
      tipo_usuario:usu.tipo_usuario ,
      genero: usu.genero,
      direccion: usu.direccion,
      contrasenia: usu.contrasenia
     });
  }

  // Limpia el formulario y desactiva el modo edición
    clearForm() {
      this.form.reset({
        nombre: '',
        apellido: '',
        cedula: '',
        usuario: '',
        tipo_usuario: '',
        genero: '',
        direccion: '',
        contrasenia: ''

      });
      this.isEditMode = false;
      this.currentId = 0;
    }
  // Maneja el envío del formulario (crear/actualizar)
  onSubmit() {
    if (this.form.invalid) { // Verifica validaciones
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    let UsuarioGuardar: Usuario = this.form.value;

    if (this.isEditMode) {
      // Modo edición: actualiza la película existente
      UsuarioGuardar.id = this.currentId;

      this.usuarioService
        .editUsuarios(UsuarioGuardar)
        .subscribe((usuarioeditada) => {
          alert('La película ha sido actualizada correctamente.');
          this.cargarUsuarios(); // Recarga la lista
        });
    } else {
      // Modo creación: añade nueva película
      this.usuarioService.addUsuarios(UsuarioGuardar).subscribe(() => {
        alert('La película ha sido guardada correctamente.');
        this.cargarUsuarios(); // Recarga la lista
      });
    }
   }
}
