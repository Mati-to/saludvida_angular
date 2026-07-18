import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {PacienteResponse} from '../../../core/models/paciente-model';

@Component({
  selector: 'app-paciente-list',
  imports: [],
  templateUrl: './paciente-list.html',
  styleUrl: './paciente-list.scss',
})
export class PacienteList {
    pacientes: InputSignal<PacienteResponse[]> = input<PacienteResponse[]>([]);
    isLoading: InputSignal<boolean> = input<boolean>(false);

    editarPacienteEvent: OutputEmitterRef<PacienteResponse> = output<PacienteResponse>();
    eliminarPacienteEvent: OutputEmitterRef<PacienteResponse> = output<PacienteResponse>();

    solicitarEditar(paciente: PacienteResponse): void {
        this.editarPacienteEvent.emit(paciente);
    }

    solicitarEliminar(paciente: PacienteResponse): void {
        this.eliminarPacienteEvent.emit(paciente);
    }
}
