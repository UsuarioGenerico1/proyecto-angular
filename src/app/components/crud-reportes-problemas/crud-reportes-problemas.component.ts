import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-reportes-problemas',
  imports: [ReactiveFormsModule],
  templateUrl: './crud-reportes-problemas.component.html',
})
export class CrudReportesProblemasComponent implements OnInit, AfterViewInit {
  myForm!: FormGroup;



  onSave() {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    // throw new Error('supuesto error arreglado');
  }
}
