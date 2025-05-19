import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { foro } from '../models/foro';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServForoService {

 //private jsonurl="../json/datos.json";
  private jsonurl="http://localhost:3000/foro";
  constructor(private httpclient:HttpClient) { 
  }

  //metodo para obtener la lista de pelicilas
  
  getForo():Observable<foro[]>{
    return this.httpclient.get<foro[]>(this.jsonurl);//obtener la lista de foros
  }
  //filtrar   se traen todos los datos del servidor al cliente y en el cliente se filtral , menos eficiencia
  getForoSearch(titulo?:string, contenido ?:string):Observable<foro[]>{
    return this.httpclient.get<foro[]>(this.jsonurl).pipe(
      map((foros)=>
        foros.filter((foros)=>
          (titulo?foros.titulo.toLocaleLowerCase().includes(titulo.toLowerCase()):true)&&
          (contenido?foros.contenido.toLocaleLowerCase().includes(contenido.toLowerCase()):true)
        )
      )
    )
  }
  //agregar
  addForo(foro:foro):Observable<foro>{
    return this.httpclient.post<foro>(this.jsonurl,foro);
  }
  //editar
  editForo(foros:foro):Observable<foro>{
    let urlforo =`${this.jsonurl}/${foros.id}`
    return this.httpclient.put<foro>(urlforo,foros);
  }

  //eliminar
  eliminarForo(foros:foro):Observable<foro>{
    let urlforo =`${this.jsonurl}/${foros.id}`
    return this.httpclient.delete<foro>(urlforo);
  }
}
//hola