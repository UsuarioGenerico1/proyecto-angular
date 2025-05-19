import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { VtnModalComponent } from '../../shared/vtn-modal/vtn-modal.component';
import { TablaDinamicaComponent } from '../../shared/tabla-dinamica/tabla-dinamica.component';
import { foro } from '../../models/foro';
import { ServForoService } from '../../services/serv-foro.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crud-foro',
  imports: [MatButtonModule,
    VtnModalComponent,
    TablaDinamicaComponent,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './crud-foro.component.html',
  styleUrl: './crud-foro.component.css'
})
export class CrudForoComponent {
isEditMode:boolean=false;
currenId!:number;
form!: FormGroup;
admi:boolean = true;
newPubli:boolean=true;

discuciones:foro[]=[];
displayedColumns=[ 'titulo','contenido','id','acciones'];
data: any[]=[];

//variables del imput
emailFormControl = new FormControl('', [Validators.required, Validators.email]);
matcher = new MyErrorStateMatcher();

constructor(private servicio:ServForoService,private fb:FormBuilder){

}
ngOnInit():void{
    this.cargarDiscuciones();
    this.data=this.discuciones;
    this.form=this.fb.group({
      titulo:["",[Validators.required,Validators.minLength(3)]],
      contenido:["",[Validators.required]],
      id:[""],
    });
}

cargarDiscuciones():void{
    //lamar al metodo del serivico 
  this.servicio.getForo().subscribe((data:foro[])=>{
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

editar(foro:foro):void{
    this.isEditMode=true;
    this.currenId=foro.id;
    this.form.setValue({
      titulo:foro.titulo,
      contenido:foro.contenido, 
    })
  }


  eliminar(foro:foro):void{
    const confirmado = confirm(`esta seguro de eliminar la publicacion: ${foro.titulo}?`);
    if(confirmado){
      this.servicio.eliminarForo(foro).subscribe(()=>{
        alert("foro eliminada exitosamente");
        this.cargarDiscuciones();
      })
    }
  }

  //datos enviados
  onSubmit() {
    if(this.form.invalid){
    alert("Datos enviados");
    return;
    }
    //obtener datos del formulario
    let foroGuardado:foro= this.form.value;

    if(this.isEditMode){
      //editar
      foroGuardado.id=this.currenId
      this.servicio.editForo(foroGuardado).subscribe((foroEditaro)=>{
        alert("se edito correctamente");
        this.cargarDiscuciones();
      });
    }else{
      //agregar nuevo
      this.servicio.addForo(foroGuardado).subscribe((foronuevo)=>{
        alert("se Agrego correctamente");
        this.cargarDiscuciones();
      });
    }
  }

}

