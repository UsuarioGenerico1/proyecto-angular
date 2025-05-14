import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { VtnModalComponent } from '../../shared/vtn-modal/vtn-modal.component';
@Component({
  selector: 'app-crud-foro',
  imports: [MatButtonModule,VtnModalComponent],
  templateUrl: './crud-foro.component.html',
  styleUrl: './crud-foro.component.css'
})
export class CrudForoComponent {
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
