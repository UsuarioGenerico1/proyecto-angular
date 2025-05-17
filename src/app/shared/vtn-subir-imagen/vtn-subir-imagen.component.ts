import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-vtn-subir-imagen',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './vtn-subir-imagen.component.html',

  styles: [
    `
      .separator {
        display: flex;
        align-items: center;
        margin: 1rem 0;
      }
      .file-name {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #666;
      }
    `,
  ],
})
export class VtnSubirImagenComponent {
  imageUrl: string = '';
  selectedFile: File | null = null;
  imgPreview: string | null = null;

  constructor(public dialogRef: MatDialogRef<VtnSubirImagenComponent>) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.imageUrl = '';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgPreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  selectUrl(): void {
    this.selectedFile = null;
    this.imgPreview = this.imageUrl || null;
  }

  hasSelection(): boolean {
    return !!this.imageUrl || !!this.selectedFile;
  }

  confirmSelection(): void {
    if (this.selectedFile && this.imgPreview) {
      this.dialogRef.close({
        fileName: this.selectedFile.name,
        type: 'file',
        dataUrl: this.imgPreview,
      });
    } else if (this.imageUrl) {
      this.dialogRef.close({
        fileName: this.imageUrl,
        type: 'url',
      });
    }
  }
}
