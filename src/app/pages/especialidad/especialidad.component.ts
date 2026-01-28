import {Component, inject, OnInit} from '@angular/core';
import {EspecialidadResponse, EspecialidadRequest} from '../../core/models/especialidad-model';
import {EspecialidadService} from '../../core/services/especialidad-service';
import {EspecialidadList} from './especialidad-list/especialidad-list';
import {EspecialidadForm} from './especialidad-form/especialidad-form';
import {ModalConfirmarEliminar} from '../../shared/components/modal-confirmar-eliminar/modal-confirmar-eliminar';

@Component({
  selector: 'app-especialidad',
    imports: [
        EspecialidadList,
        EspecialidadForm,
        ModalConfirmarEliminar
    ],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss',
})
export class EspecialidadComponent implements OnInit {
    especialidadSeleccionada: EspecialidadResponse | undefined;
    especialidades: EspecialidadResponse[] = [];
    mostrarModal: boolean = false;
    modoForm: "crear" | "editar" = "crear";

    // DI
    especialidadService: EspecialidadService = inject(EspecialidadService);

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
        if (this.modoForm === "crear") {
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


        if (this.modoForm === "editar" && this.especialidadSeleccionada) {
            this.especialidadService.update(especialidad, this.especialidadSeleccionada.id)
                .subscribe({
                    next: (res) => {
                        console.log("Cambios guardados: ", res);
                        // TODO: Mostrar mensaje con un SweetAlert
                        this.modoForm = "crear";
                        this.cargarListaEspecialidades();
                    },
                    error: (err) => console.error(err)
                })
        }
    }

    modoCrear(): void {
        this.modoForm = "crear";
        this.especialidadSeleccionada = undefined;
    }

    editarEspecialidad(especialidad: EspecialidadResponse): void {
        this.modoForm = "editar";
        this.especialidadSeleccionada = especialidad;
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
