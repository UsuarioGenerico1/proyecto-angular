import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-vtn-modal',
  imports: [MatButtonModule],
  templateUrl: './vtn-modal.component.html',
  styleUrl: './vtn-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VtnModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Input() description?: string;
  @Input() aceptar: string = 'Aceptar';
  @Input() cancelar: string = 'Cancelar';
  @Output() onAceptar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  cancelarClick() {
    this.onCancelar.emit();
  }

  aceptarClick() {
    this.onAceptar.emit();

  }

}