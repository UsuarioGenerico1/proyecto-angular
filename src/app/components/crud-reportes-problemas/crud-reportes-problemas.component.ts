import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReporteProblemasService } from '../../services/reporte-problemas.service';
import { Reportes } from '../../models/Reportes';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VtnSubirImagenComponent } from '../../shared/vtn-subir-imagen/vtn-subir-imagen.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-reportes-problemas',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    MatButtonModule,
    MatInputModule,
    MatRadioButton,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    VtnSubirImagenComponent,
  ],
  templateUrl: './crud-reportes-problemas.component.html',
  // styleUrls: ['./tailwind-local.css'],
  // encapsulation: ViewEncapsulation.Emulated,

})
export class CrudReportesProblemasComponent implements OnInit, AfterViewInit {
  myForm!: FormGroup;
  isEditMode: boolean = false;
  currentId!: number;

  displayedColumns: string[] = [
    'id',
    'titulo',
    'categoria',
    'fecha',
    'estado',
    // 'fecha',
    // 'ver',
  ];

  dataSource = new MatTableDataSource<Reportes>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private miServicio: ReporteProblemasService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  cargarReportes(): void {
    this.miServicio.getReportes().subscribe((data: Reportes[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.cargarReportes();

    this.myForm = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z0-9 ]+$/),
        ],
      ],
      descripcion: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)],
      ],
      categoria: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      //y que fecha no se pueda tocar

      fecha: [{ value: new Date(), disabled: true }],
      estado: [''],
      imagen: [''],
    });
  }

  //Método para guardar el reporte
  onSave() {
    this.myForm.get('imagen')?.setValue(this.nombreImagenSeleccionada);
    if (this.myForm.invalid) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    let reporteAGuardar: Reportes = this.myForm.value;

    if (this.isEditMode) {
      //Editar
      reporteAGuardar.id = this.currentId;

      this.miServicio
        .editReporte(reporteAGuardar)
        .subscribe((reporteEditado) => {
          alert('El report ha sido actualizada correctamente.');
          // this.clearForm();
          this.cargarReportes();
        });
    } else {
      this.miServicio.getReportes().subscribe((data: Reportes[]) => {
        reporteAGuardar.id = this.getIdMayor(data) + 1;
        reporteAGuardar.usuarioId = 1;
        reporteAGuardar.fecha = new Date().toString();
        this.miServicio.addReporte(reporteAGuardar).subscribe(() => {
          alert('El reporte ha sido guardada correctamente.');
          this.cargarReportes();
        });
      });
    }
  }

  //metodo para obtener el id mayor en el json
  getIdMayor(reportes: Reportes[]): number {
    return reportes.reduce((max, r) => (r.id > max ? r.id : max), 0);
  }

  //Abrir el dialogo para subir imagen
  imagenSeleccionada: string | null = null;
  nombreImagenSeleccionada: string | null = null;

  abrirDialogoSubirImagen(): void {
    const dialogRef = this.dialog.open(VtnSubirImagenComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.type === 'file' && result.dataUrl) {
          this.imagenSeleccionada = result.dataUrl;
          this.nombreImagenSeleccionada = result.fileName;
        } else if (result.type === 'url') {
          this.imagenSeleccionada = result.fileName;
          this.nombreImagenSeleccionada = result.fileName;
        }
      }
    });
  }

  //Limpiar formulario
  clearForm() {
    throw new Error('Method not implemented.');
  }
}
