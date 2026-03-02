import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CitaMedicaDetallesResponse} from '../../../core/models/cita-medica-model';
import {DatePipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-cita-medica-detalle',
    imports: [
        DatePipe,
        TitleCasePipe
    ],
  templateUrl: './cita-medica-detalle.html',
  styleUrl: './cita-medica-detalle.scss',
})
export class CitaMedicaDetalle {
    @Input()
    cita: CitaMedicaDetallesResponse | undefined;

    @Output()
    volverLista = new EventEmitter<void>();

    get nombreCompletoPaciente(): string {
        return `${this.cita?.pacienteDto?.nombre} ${this.cita?.pacienteDto?.apellido}`;
    }

    get nombreCompletoMedico(): string {
        return `${this.cita?.medicoDto?.nombre} ${this.cita?.medicoDto?.apellido}`;
    }
}
