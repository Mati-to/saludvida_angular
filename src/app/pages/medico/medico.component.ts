import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MedicoList} from './medico-list/medico-list';
import {MedicoCreateRequest, MedicoResponse, MedicoUpdateRequest} from '../../core/models/medico-model';
import {MedicoService} from '../../core/services/medico-service';
import {MedicoForm} from './medico-form/medico-form';
import {EspecialidadService} from '../../core/services/especialidad-service';
import {EspecialidadResponse} from '../../core/models/especialidad-model';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorModel} from '../../core/models/api-error-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
    imports: [
        MedicoList,
        MedicoForm,
    ],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.scss',
})
export class MedicoComponent implements OnInit {
    medicoSeleccionado: MedicoResponse | undefined;
    medicos: MedicoResponse[] = [];
    especialidades: EspecialidadResponse[] = [];
    erroresForm?: Record<string, string[]>;
    modoForm: "crear" | "editar" = "crear";

    @ViewChild(MedicoForm) hijoForm!: MedicoForm;

    // DI
    medicoService: MedicoService = inject(MedicoService);
    especialidadService: EspecialidadService = inject(EspecialidadService);

    ngOnInit(): void {
        this.cargarListaMedicos();
        this.cargarEspecialidadesForm();
    }

    cargarListaMedicos(): void {
        this.medicoService.getAll().subscribe((medicos: MedicoResponse[]): void => {
            this.medicos = medicos;
        })
    }

    cargarEspecialidadesForm(): void {
        this.especialidadService.getAll().subscribe((especialidades: EspecialidadResponse[]): void => {
            this.especialidades = especialidades;
        })
    }

    // Ingresar Médico
    guardarMedico(medico: MedicoCreateRequest | MedicoUpdateRequest) {
        if (this.modoForm === "crear") {
            this.medicoService.create(medico as MedicoCreateRequest).subscribe({
                next: (medico: MedicoResponse): void => {
                    void Swal.fire({
                        title: "Médico guardado!",
                        text: `${medico.nombre} ${medico.apellido} guardado con éxito.`,
                        icon: "success",
                        timer: 2000
                    });
                    this.hijoForm.limpiarForm();
                    this.cargarListaMedicos();
                },
                error: (error: HttpErrorResponse): void => {
                    this.enviarErroresValidacion(error);
                }
            })
        }

        if (this.modoForm === "editar" && this.medicoSeleccionado) {
            const id = this.medicoSeleccionado.id;
            this.medicoService.update(medico as MedicoUpdateRequest, id).subscribe({
                next: (medico: MedicoResponse) => {
                    void Swal.fire({
                        title: "Cambios guardados!",
                        text: `Cambios en ${medico.nombre} ${medico.apellido} guardados con éxito.`,
                        icon: "success",
                        timer: 2000,
                    });
                    this.modoForm = "crear";
                    this.cargarListaMedicos();
                },
                error: (error: HttpErrorResponse) => {
                    this.enviarErroresValidacion(error);
                }
            })
        }
    }

    // Vistas del Form
    modoCrear(): void {
        this.modoForm = "crear";
        this.medicoSeleccionado = undefined;
    }

    editarMedico(medico: MedicoResponse): void {
        this.medicoSeleccionado = medico;
        this.modoForm = "editar";
    }

    // Eliminar médico
    modalConfirmarEliminar(medico: MedicoResponse): void {
        Swal.fire({
            title: "Confirmar eliminación",
            text: `¿Eliminar al médico ${medico.nombre} ${medico.apellido}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        }).then(response => {
            if (response.isConfirmed) {
                this.medicoService
                    .deleteById(medico.id)
                    .subscribe({
                        next: () => {
                            void Swal.fire({
                                title: "Eliminado!",
                                text: "Médico eliminado con éxito.",
                                icon: "success"
                            });
                            this.cargarListaMedicos();
                        }
                    })
            }
        })
    }

    // Errores
    enviarErroresValidacion(error: HttpErrorResponse): void {
        const apiError = error.error as ApiErrorModel;

        if (apiError.errores) {
            this.erroresForm= apiError.errores;
        }
    }
}
