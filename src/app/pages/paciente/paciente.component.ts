import {Component, inject, OnInit} from '@angular/core';
import {PacienteList} from './paciente-list/paciente-list';
import {PacienteForm} from './paciente-form/paciente-form';
import {PacienteResponse} from '../../core/models/paciente-model';
import {PacienteService} from '../../core/services/paciente-service';

@Component({
  selector: 'app-paciente',
    imports: [
        PacienteList,
        PacienteForm
    ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss',
})
export class PacienteComponent implements OnInit {
    pacientes: PacienteResponse[] = [];

    // DI
    pacienteService: PacienteService = inject(PacienteService);

    ngOnInit(): void {
        this.cargarListPacientes();
    }

    cargarListPacientes(): void {
        this.pacienteService.getAll().subscribe(pacientes => {
            this.pacientes = pacientes;
        })
    }

}
