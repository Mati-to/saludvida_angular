import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EspecialidadResponse} from '../../../core/models/especialidad-response';

@Component({
  selector: 'app-especialidad-list',
  imports: [],
  templateUrl: './especialidad-list.html',
  styleUrl: './especialidad-list.scss',
})
export class EspecialidadList {
    @Input()
    especialidades: EspecialidadResponse[] = [];

    @Output()
    editarEspecialidadEvent = new EventEmitter<EspecialidadResponse>();

    @Output()
    eliminarEspecialidadEvent = new EventEmitter<EspecialidadResponse>();


    solicitarEliminar(especialidad: EspecialidadResponse): void {
        this.eliminarEspecialidadEvent.emit(especialidad);
    }

    solicitarEditar(especialidad: EspecialidadResponse): void {
        this.editarEspecialidadEvent.emit(especialidad);
    }

}
