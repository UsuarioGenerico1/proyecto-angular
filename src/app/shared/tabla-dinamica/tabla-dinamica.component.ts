import { AfterViewInit, Component, input, OnInit, viewChild, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-tabla-dinamica',
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './tabla-dinamica.component.html',
  styleUrl: './tabla-dinamica.component.css'
})
export class TablaDinamicaComponent<T> implements OnInit{
 
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>();
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  ngOnInit(): void {
    this.dataSource.data=this.data();
    this.dataSource.paginator = this._paginator();
  }
}


