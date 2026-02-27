import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MedicoResponse} from '../../../core/models/medico-model';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-medico-list',
    imports: [
        TitleCasePipe
    ],
  templateUrl: './medico-list.html',
  styleUrl: './medico-list.scss',
})
export class MedicoList {
    @Input() medicos: MedicoResponse[] = [];

    @Output()
    editarMedicoEvent = new EventEmitter<MedicoResponse>();

    @Output()
    eliminarMedicoEvent = new EventEmitter<MedicoResponse>();

    solicitarEditar(medico: MedicoResponse): void {
        this.editarMedicoEvent.emit(medico);
    }

    solicitarEliminar(medico: MedicoResponse): void {
        this.eliminarMedicoEvent.emit(medico);
    }

}
