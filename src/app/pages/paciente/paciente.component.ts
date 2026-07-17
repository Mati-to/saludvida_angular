import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {PacienteList} from './paciente-list/paciente-list';
import {PacienteForm} from './paciente-form/paciente-form';
import {PacienteRequest, PacienteResponse} from '../../core/models/paciente-model';
import {PacienteService} from '../../core/services/paciente-service';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorModel} from '../../core/models/api-error-model';

@Component({
  selector: 'app-paciente',
    imports: [
        PacienteList,
        PacienteForm,
    ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss',
})
export class PacienteComponent implements OnInit {
    pacienteSeleccionado: PacienteResponse | undefined;
    pacientes: PacienteResponse[] = [];
    erroresForm?: Record<string, string[]>;
    modoForm: "crear" | "editar" = "crear";

    @ViewChild(PacienteForm) hijoForm!: PacienteForm;

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

    // Guardar Paciente
    guardarPaciente(paciente: PacienteRequest): void {
        if (this.modoForm === "crear") {
            this.pacienteService.create(paciente).subscribe({
                next: (paciente: PacienteResponse):void => {
                    void Swal.fire({
                        title: "Paciente guardado!",
                        text: `${paciente.nombre} ${paciente.apellido} guardado con éxito.`,
                        icon: "success",
                        timer: 2000
                    });
                    this.hijoForm.limpiarForm();
                    this.cargarListPacientes();
                },
                error: (error: HttpErrorResponse): void => {
                    this.enviarErroresValidacion(error);
                }
            })
        }

        if (this.modoForm === "editar" && this.pacienteSeleccionado) {
            const id: number = this.pacienteSeleccionado.id;
            this.pacienteService.update(paciente, id).subscribe({
                next: (paciente: PacienteResponse):void => {
                    void Swal.fire({
                        title: "Cambios guardados!",
                        text: `Cambios en ${paciente.nombre} ${paciente.apellido} guardados con éxito.`,
                        icon: "success",
                        timer: 2000,
                    });
                    this.hijoForm.limpiarForm();
                    this.modoForm = "crear";
                    this.cargarListPacientes();
                },
                error: error => console.error(error)
            })
        }

    }

    // Modos de vista del Form
    modoCrear(): void {
        this.modoForm = "crear";
        this.hijoForm.limpiarForm();
        this.pacienteSeleccionado = undefined;
    }

    modoEditar(paciente: PacienteResponse): void {
        this.pacienteSeleccionado = paciente;
        this.modoForm = "editar";
    }

    // Eliminar paciente
    modalConfirmarEliminar(paciente: PacienteResponse): void {
        Swal.fire({
            title: "Confirmar eliminación",
            text: `¿Eliminar al paciente ${paciente.nombre} ${paciente.apellido}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        }).then((res: SweetAlertResult): void => {
            if (res.isConfirmed) {
                this.pacienteService
                    .deleteById(paciente.id)
                    .subscribe({
                        next: (): void => {
                            void Swal.fire({
                                title: "Eliminado!",
                                text: "Paciente eliminado con éxito.",
                                icon: "success"
                            });
                            this.cargarListPacientes();
                        }
                    });
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
