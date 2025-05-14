import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CrudForoComponent } from '../../components/crud-foro/crud-foro.component';
@Component({
  selector: 'app-vtn-modal',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './vtn-modal.component.html',
  styleUrl: './vtn-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VtnModalComponent {
  titulo:string ="";
  constructor(){

  }
  readonly dialogRef = inject(MatDialogRef<VtnModalComponent>);
}

