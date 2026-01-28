import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-confirmar-eliminar',
  imports: [],
  templateUrl: './modal-confirmar-eliminar.html',
  styleUrl: './modal-confirmar-eliminar.scss',
})
export class ModalConfirmarEliminar {

    @Input() entidadSeleccionada?: string;

    @Output() confirmarEliminar= new EventEmitter<void>();
    @Output() cancelarEliminar= new EventEmitter<void>();

    onConfirmar(): void {
        this.confirmarEliminar.emit();
    }

    onCancelar(): void {
        this.cancelarEliminar.emit();
    }

}
