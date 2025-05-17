import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { VtnModalComponent } from '../../shared/vtn-modal/vtn-modal.component';
import { TablaDinamicaComponent } from '../../shared/tabla-dinamica/tabla-dinamica.component';
import { foro } from '../../models/foro';
import { ServForoService } from '../../services/serv-foro.service';

@Component({
  selector: 'app-crud-foro',
  imports: [MatButtonModule,VtnModalComponent,TablaDinamicaComponent],
  templateUrl: './crud-foro.component.html',
  styleUrl: './crud-foro.component.css'
})
export class CrudForoComponent {
admi:boolean = true;

discuciones:foro[]=[];
displayedColumns=[ 'titulo','contenido','id','acciones'];
data: any[]=[];

constructor(private servicio:ServForoService){

}
ngOnInit():void{
    this.cargarDiscuciones();
    this.data=this.discuciones;
}

cargarDiscuciones():void{
    //lamar al metodo del serivico 
  this.servicio.getMovie().subscribe((data:foro[])=>{
    this.discuciones=data;
  });
}

//funciones para la table
manejarEdicion(item: foro): void {
  console.log('Editar:', item);
  alert(`Boton presionado Editar: ${item.titulo}`);
}

manejarBorrado(item: any): void {
  console.log('Borrar:', item);
}


// funciones para la  ventana modal  
isModalOpen = false;
  openModal() {this.isModalOpen = true;}
  cerrarModal() {this.isModalOpen = false;}
  confirmarAccion() {this.isModalOpen = false;}
}
