import {Component, inject, OnInit} from '@angular/core';
import {MedicoList} from './medico-list/medico-list';
import {MedicoResponse} from '../../core/models/medico-model';
import {MedicoService} from '../../core/services/medico-service';
import {MedicoForm} from './medico-form/medico-form';
import {EspecialidadService} from '../../core/services/especialidad-service';
import {EspecialidadResponse} from '../../core/models/especialidad-model';

@Component({
  selector: 'app-medico',
    imports: [
        MedicoList,
        MedicoForm
    ],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.scss',
})
export class MedicoComponent implements OnInit {
    medicoSeleccionado: MedicoResponse | undefined;
    medicos: MedicoResponse[] = [];
    especialidades: EspecialidadResponse[] = [];
    mostrarModal: boolean = false;
    modoForm: "crear" | "editar" = "crear";

    // DI
    medicoService: MedicoService = inject(MedicoService);
    especialidadService: EspecialidadService = inject(EspecialidadService);

    ngOnInit(): void {
        this.cargarListaMedicos();
        this.cargarEspecialidadesForm();
    }

    cargarListaMedicos(): void {
        this.medicoService.getAll().subscribe(medicos => {
            this.medicos = medicos;
        })
    }

    cargarEspecialidadesForm(): void {
        this.especialidadService.getAll().subscribe(especialidades => {
            this.especialidades = especialidades;
        })
    }


}
