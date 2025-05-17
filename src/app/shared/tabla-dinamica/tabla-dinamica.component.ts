import { AfterViewInit, Component, EventEmitter, input, OnInit, Output, viewChild, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tabla-dinamica',
  imports: [MatTableModule,MatPaginatorModule,MatButtonModule],
  templateUrl: './tabla-dinamica.component.html',
  styleUrl: './tabla-dinamica.component.css'
})
export class TablaDinamicaComponent<T> implements OnInit{
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>();
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  ngOnInit(): void {
    this.dataSource.data=this.data();
    this.dataSource.paginator = this._paginator();
  }

  onEdit(element: T): void {
    this.edit.emit(element); // Puedes manejarlo como booleano si lo deseas
  }

  onDelete(element: T): void {
    this.delete.emit(element);
  }
}


