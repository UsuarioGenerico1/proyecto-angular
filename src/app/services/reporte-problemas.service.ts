import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reportes } from '../models/Reportes';
@Injectable({
  providedIn: 'root',
})
export class ReporteProblemasService {
  private jsonUrl = 'http://localhost:3000/reportes'; //ruta del archivo json
  // private jsonUrl = '../json/datos.json';
  constructor(private httpclient: HttpClient) {}

  getReportes(): Observable<Reportes[]> {
    return this.httpclient.get<Reportes[]>(this.jsonUrl)
    // .get<{ peliculas: Reportes[] }>(this.jsonUrl)
    // .pipe(map((data) => data.reportes));
  }

  //haz un get reportes en donde me devuelta todos los reportes del archivo datos.json
  // getReportes(): Observable<Reportes[]> {
  //   return this.httpclient.get<Reportes[]>('/assets/json/datos.json');
  // }



  // getReporteSearch(buscar?: string): Observable<Reportes[]> {
  //   return this.httpclient.get<Reportes[]>(this.jsonUrl).pipe(
  //     map((reportes) =>
  //       reportes.filter(
  //         (reportes) =>
  //           (buscar
  //             ? reportes.titulo.toLowerCase().includes(buscar.toLowerCase())
  //             : true) || //this works :D
  //           (buscar
  //             ? reportes.categoria.toLowerCase().includes(buscar.toLowerCase())
  //             : true)
  //       )
  //     )
  //   );
  // }

  //agregar reportes
  addReporte(reporte: Reportes): Observable<Reportes> {
    return this.httpclient.post<Reportes>(this.jsonUrl, reporte);
  }

  //editar reportes

  editReporte(reporte: Reportes): Observable<Reportes> {
    let urlReporte = `${this.jsonUrl}/${reporte.id}`;
    return this.httpclient.put<Reportes>(urlReporte, reporte);
  }

  //eliminar reportes
  deleteReporte(reporte: Reportes): Observable<void> {
    let urlReporte = `${this.jsonUrl}/${reporte.id}`;
    return this.httpclient.delete<void>(urlReporte);
  }
}
