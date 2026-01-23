import {Component, OnInit} from '@angular/core';
import {EspecialidadModel} from '../../core/models/especialidadModel';
import {EspecialidadService} from '../../core/services/especialidad-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-especialidad',
    imports: [
        RouterLink
    ],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss',
})
export class EspecialidadComponent implements OnInit{
    especialidades: EspecialidadModel[] = [];
    protected readonly titulo: string = "Especialidades médicas";

    constructor(
        private especialidadService: EspecialidadService,
    ) { }

    ngOnInit(): void {
        this.especialidadService.getAll().subscribe(especialidades => {
            this.especialidades = especialidades;
        })
    }


}
