import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {EspecialidadResponse, EspecialidadRequest} from '../../core/models/especialidad-model';
import {EspecialidadService} from '../../core/services/especialidad-service';
import {EspecialidadList} from './especialidad-list/especialidad-list';
import {EspecialidadForm} from './especialidad-form/especialidad-form';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorModel} from '../../core/models/api-error-model';
import Swal, {SweetAlertResult} from 'sweetalert2';

@Component({
  selector: 'app-especialidad',
    imports: [
        EspecialidadList,
        EspecialidadForm,
    ],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss',
})
export class EspecialidadComponent implements OnInit {
    especialidadSeleccionada: EspecialidadResponse | undefined;
    especialidades: EspecialidadResponse[] = [];
    erroresForm?: Record<string, string[]>;
    modoForm: "crear" | "editar" = "crear";

    @ViewChild(EspecialidadForm) hijoForm!: EspecialidadForm;

    // DI
    especialidadService: EspecialidadService = inject(EspecialidadService);

    ngOnInit(): void {
        this.cargarListaEspecialidades();
    }

    cargarListaEspecialidades(): void {
        this.especialidadService.getAll().subscribe(
            (especialidades: EspecialidadResponse[]): void => {
                this.especialidades = especialidades;
        });
    }

    // Crear y editar Especialidad
    guardarEspecialidad(especialidad: EspecialidadRequest): void {
        if (this.modoForm === "crear") {
            this.especialidadService.create(especialidad)
                .subscribe({
                    next: (esp: EspecialidadResponse): void => {
                        void Swal.fire({
                            title: 'Especialidad guardada!',
                            text: `"${this.capitalizeNombre(esp.nombre)}" guardada con éxito.`,
                            icon: 'success',
                            timer: 2000,
                        });
                        this.hijoForm.limpiarForm();
                        this.cargarListaEspecialidades();
                    },
                    error: (err: HttpErrorResponse): void => {
                        this.enviarErroresValidacion(err);
                    },
                })
        }


        if (this.modoForm === "editar" && this.especialidadSeleccionada) {
            this.especialidadService.update(especialidad, this.especialidadSeleccionada.id)
                .subscribe({
                    next: (esp: EspecialidadResponse): void => {
                        void Swal.fire({
                            title: "Cambios guardados!",
                            text: `Cambios en ${esp.nombre} guardados con éxito.`,
                            icon: 'success',
                            timer: 2000,
                        });
                        this.hijoForm.limpiarForm();
                        this.modoCrear();
                        this.cargarListaEspecialidades();
                    },
                    error: (err: HttpErrorResponse): void => {
                        this.enviarErroresValidacion(err);
                    }
                })
        }
    }

    // Modos de vista del Form
    modoCrear(): void {
        this.modoForm = "crear";
        this.especialidadSeleccionada = undefined;
    }

    modoEditar(especialidad: EspecialidadResponse): void {
        this.modoForm = "editar";
        this.especialidadSeleccionada = especialidad;
    }

    // Eliminar Especialidad
    modalConfirmarEliminacion(esp: EspecialidadResponse): void {
        Swal.fire({
            title: "Confirmar eliminación",
            text: `¿Eliminar la especialidad ${this.capitalizeNombre(esp.nombre)}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((response: SweetAlertResult): void => {
            if (response.isConfirmed) {
                this.especialidadService
                    .deleteById(esp.id)
                    .subscribe({
                        next: () => {
                            void Swal.fire({
                                title: "Eliminado!",
                                text: `Especialidad "${this.capitalizeNombre(esp.nombre)}" eliminada con éxito.`,
                                icon: "success",
                            });
                            this.cargarListaEspecialidades();
                        }
                    });
            }
        })
    }

    // Errores del Form
    enviarErroresValidacion(error: HttpErrorResponse): void {
        const apiError = error.error as ApiErrorModel;

        if (apiError.errores) {
            this.erroresForm= apiError.errores;
        }
    }

    capitalizeNombre(nombre:string): string {
        return nombre.charAt(0).toUpperCase() + nombre.substring(1);
    }
}
