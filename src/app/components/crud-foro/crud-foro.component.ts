import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { VtnModalComponent } from '../../shared/vtn-modal/vtn-modal.component';
import { TablaDinamicaComponent } from '../../shared/tabla-dinamica/tabla-dinamica.component';

@Component({
  selector: 'app-crud-foro',
  imports: [MatButtonModule,VtnModalComponent,TablaDinamicaComponent],
  templateUrl: './crud-foro.component.html',
  styleUrl: './crud-foro.component.css'
})
export class CrudForoComponent {
displayedColumns =['id', 'title' ,'genre','releaseDate'];




isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    //aqui se puede agregar codigo necesario para cuando se da clik en cancelar
    this.isModalOpen = false;
  }

confirmarAccion() {
  //aqui se puede agregar codigo necesario cuando se acepta
  this.isModalOpen = false;
}
}
