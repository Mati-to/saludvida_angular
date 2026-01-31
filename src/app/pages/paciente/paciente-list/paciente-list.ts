import {Component, Input} from '@angular/core';
import {PacienteResponse} from '../../../core/models/paciente-model';

@Component({
  selector: 'app-paciente-list',
  imports: [],
  templateUrl: './paciente-list.html',
  styleUrl: './paciente-list.scss',
})
export class PacienteList {
    @Input() pacientes: PacienteResponse[] = [];

}
