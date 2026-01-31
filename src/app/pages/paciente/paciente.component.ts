import {Component, inject, OnInit} from '@angular/core';
import {PacienteList} from './paciente-list/paciente-list';
import {PacienteForm} from './paciente-form/paciente-form';
import {PacienteRequest, PacienteResponse} from '../../core/models/paciente-model';
import {PacienteService} from '../../core/services/paciente-service';
import {ModalConfirmarEliminar} from '../../shared/components/modal-confirmar-eliminar/modal-confirmar-eliminar';

@Component({
  selector: 'app-paciente',
    imports: [
        PacienteList,
        PacienteForm,
        ModalConfirmarEliminar
    ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss',
})
export class PacienteComponent implements OnInit {
    pacienteSeleccionado: PacienteResponse | undefined;
    pacientes: PacienteResponse[] = [];
    modoForm: "crear" | "editar" = "crear";
    mostrarModal: boolean = false;

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
                next: (response: PacienteResponse) => {
                    console.log(response);
                    // TODO: Mensaje de feedback
                    this.cargarListPacientes();
                },
                error: error => console.error(error)
            })
        }

        if (this.modoForm === "editar" && this.pacienteSeleccionado) {
            const id = this.pacienteSeleccionado.id;
            this.pacienteService.update(paciente, id).subscribe({
                next: (response: PacienteResponse) => {
                    console.log("Guardado: ", paciente);
                    // TODO: Mensaje de éxito
                    this.modoForm = "crear";
                    this.cargarListPacientes();
                },
                error: error => console.error(error)
            })
        }

    }

    modoCrear(): void {
        this.modoForm = "crear";
        this.pacienteSeleccionado = undefined;
    }

    editarPaciente(paciente: PacienteResponse): void {
        this.pacienteSeleccionado = paciente;
        this.modoForm = "editar";
    }

    // Eliminar paciente
    modalConfirmarEliminar(paciente: PacienteResponse): void {
        this.pacienteSeleccionado = paciente;
        this.mostrarModal = true;
    }

    cancelarEliminar(): void {
        this.pacienteSeleccionado = undefined;
        this.mostrarModal = false;
    }

    confirmarEliminar(): void {
        if (!this.pacienteSeleccionado) return;

        this.pacienteService
            .deleteById(this.pacienteSeleccionado.id)
            .subscribe({
                next: () => {
                    this.mostrarModal = false;
                    // TODO: Mensaje de éxito
                    this.cargarListPacientes();
                },
                error: error => console.error(error)
            })
    }

    get nombreCompleto(): string {
        return this.pacienteSeleccionado
            ? `${this.pacienteSeleccionado.nombre} ${this.pacienteSeleccionado.apellido}`
            : "";
    }
}
