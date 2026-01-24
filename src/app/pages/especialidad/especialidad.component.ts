import {Component, inject, OnInit} from '@angular/core';
import {EspecialidadResponse} from '../../core/models/especialidad-response';
import {EspecialidadService} from '../../core/services/especialidad-service';
import {EspecialidadList} from './especialidad-list/especialidad-list';
import {EspecialidadForm} from './especialidad-form/especialidad-form';
import {EspecialidadRequest} from '../../core/models/especialidad-request';

@Component({
  selector: 'app-especialidad',
    imports: [
        EspecialidadList,
        EspecialidadForm
    ],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss',
})
export class EspecialidadComponent implements OnInit {
    especialidadService: EspecialidadService = inject(EspecialidadService);

    protected readonly titulo: string = "Especialidades médicas";
    especialidadSeleccionada?: EspecialidadResponse;
    especialidades: EspecialidadResponse[] = [];
    mostrarModal: boolean = false;


    ngOnInit(): void {
        this.cargarListaEspecialidades();
    }

    cargarListaEspecialidades(): void {
        this.especialidadService.getAll().subscribe(especialidades => {
            this.especialidades = especialidades;
        })
    }

    // Crear Especialidad
    guardarEspecialidad(especialidad: EspecialidadRequest) {
        this.especialidadService.create(especialidad)
            .subscribe({
                next: (res) => {
                    console.log("Guardado: ", res);
                    // TODO: Mostrar un mensaje o un SweetAlert
                    this.cargarListaEspecialidades();
                },
                error: (err) => console.error(err)
            })
    }


    // Eliminar Especialidad
    modalConfirmarEliminacion(especialidad: EspecialidadResponse) {
        this.especialidadSeleccionada = especialidad;
        this.mostrarModal = true;
    }

    cancelarEliminacion(): void {
        this.mostrarModal = false;
        this.especialidadSeleccionada = undefined;
    }

    confirmarEliminacion(): void {
        if (!this.especialidadSeleccionada) return;

        this.especialidadService
            .deleteById(this.especialidadSeleccionada.id)
            .subscribe(() => {
                this.mostrarModal = false;
                this.cargarListaEspecialidades();
            })
    }

}
