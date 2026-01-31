import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PacienteResponse} from '../../../core/models/paciente-model';

@Component({
  selector: 'app-paciente-list',
  imports: [],
  templateUrl: './paciente-list.html',
  styleUrl: './paciente-list.scss',
})
export class PacienteList {
    @Input() pacientes: PacienteResponse[] = [];

    @Output()
    editarPacienteEvent = new EventEmitter<PacienteResponse>();

    @Output()
    eliminarPacienteEvent = new EventEmitter<PacienteResponse>();

    solicitarEditar(paciente: PacienteResponse) {
        this.editarPacienteEvent.emit(paciente);
    }

    solicitarEliminar(paciente: PacienteResponse) {
        this.eliminarPacienteEvent.emit(paciente);
    }

}
