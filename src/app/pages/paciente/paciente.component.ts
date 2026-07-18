import {Component, inject, ViewChild} from '@angular/core';
import {PacienteList} from './paciente-list/paciente-list';
import {PacienteForm} from './paciente-form/paciente-form';
import {PacienteRequest, PacienteResponse} from '../../core/models/paciente-model';
import {PacienteService} from '../../core/services/paciente-service';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {HttpResourceRef} from '@angular/common/http';

@Component({
  selector: 'app-paciente',
    imports: [
        PacienteList,
        PacienteForm,
    ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss',
})
export class PacienteComponent {
    pacienteSeleccionado?: PacienteResponse;
    modoForm: "crear" | "editar" = "crear";
    isGuardarPacienteLoading: boolean = false;

    @ViewChild(PacienteForm) hijoForm!: PacienteForm;

    // DI
    pacienteService: PacienteService = inject(PacienteService);

    pacientesResource: HttpResourceRef<PacienteResponse[]> = this.pacienteService.getAllResource;

    // Guardar Paciente
    guardarPaciente(paciente: PacienteRequest): void {
        if (this.modoForm === "crear") {
            this.isGuardarPacienteLoading = true;
            this.pacienteService.create(paciente).subscribe({
                next: (paciente: PacienteResponse):void => {
                    void Swal.fire({
                        title: "Paciente guardado!",
                        text: `${paciente.nombre} ${paciente.apellido} guardado con éxito.`,
                        icon: "success",
                        timer: 2000
                    });
                    this.hijoForm.limpiarForm();
                    this.pacientesResource.reload();
                },
                complete: (): boolean => this.isGuardarPacienteLoading = false
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
                    this.pacientesResource.reload();
                },
                complete: (): boolean => this.isGuardarPacienteLoading = false
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
                            this.pacientesResource.reload();
                        }
                    });

            }
        })
    }
}
