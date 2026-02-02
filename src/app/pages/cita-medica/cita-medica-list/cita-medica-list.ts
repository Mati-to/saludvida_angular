import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CitaMedicaListResponse} from '../../../core/models/cita-medica-model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-cita-medica-list',
    imports: [
        DatePipe
    ],
  templateUrl: './cita-medica-list.html',
  styleUrl: './cita-medica-list.scss',
})
export class CitaMedicaList {
    @Input() citas: CitaMedicaListResponse[] = [];

    @Output()
    detallesCitaEvent = new EventEmitter<number>();

    @Output()
    editarCitaEvent = new EventEmitter<CitaMedicaListResponse>();

    @Output()
    eliminarCitaEvent = new EventEmitter<CitaMedicaListResponse>();


    verDetalles(id: number): void {
        this.detallesCitaEvent.emit(id);
    }

    solicitarEditar(cita: CitaMedicaListResponse): void {
        this.editarCitaEvent.emit(cita);
    }

    solicitarEliminar(cita: CitaMedicaListResponse): void {
        this.eliminarCitaEvent.emit(cita);
    }
}
