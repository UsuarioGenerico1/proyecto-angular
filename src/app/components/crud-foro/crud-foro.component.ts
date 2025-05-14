import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { VtnModalComponent } from '../../shared/vtn-modal/vtn-modal.component';
@Component({
  selector: 'app-crud-foro',
  imports: [MatButtonModule],
  templateUrl: './crud-foro.component.html',
  styleUrl: './crud-foro.component.css'
})
export class CrudForoComponent {
readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(VtnModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
