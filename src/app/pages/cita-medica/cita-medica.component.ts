import {Component, inject, OnInit} from '@angular/core';
import {CitaMedicaList} from './cita-medica-list/cita-medica-list';
import {CitaMedicaForm} from './cita-medica-form/cita-medica-form';
import {CitaMedicaService} from '../../core/services/cita-medica-service';
import {CitaMedicaListResponse, CitaMedicaRequest} from '../../core/models/cita-medica-model';
import {CitaMedicaDetalle} from './cita-medica-detalle/cita-medica-detalle';
import {PacienteResponse} from '../../core/models/paciente-model';
import {MedicoResponse} from '../../core/models/medico-model';
import {PacienteService} from '../../core/services/paciente-service';
import {MedicoService} from '../../core/services/medico-service';
import {ModalConfirmarEliminar} from '../../shared/components/modal-confirmar-eliminar/modal-confirmar-eliminar';

@Component({
  selector: 'app-cita-medica',
    imports: [
        CitaMedicaList,
        CitaMedicaForm,
        CitaMedicaDetalle,
        ModalConfirmarEliminar
    ],
  templateUrl: './cita-medica.component.html',
  styleUrl: './cita-medica.component.scss',
})
export class CitaMedicaComponent implements OnInit {
    citaSeleccionada: CitaMedicaListResponse | undefined;
    citasMedicas: CitaMedicaListResponse[] = [];
    pacientes: PacienteResponse[] = [];
    medicos: MedicoResponse[] = [];
    mostrarModal: boolean = false;
    vistaActual: "lista" | "detalles" = "lista";
    modoForm: "crear" | "editar" = "crear";

    // DI
    citaMedicaService: CitaMedicaService = inject(CitaMedicaService);
    pacienteService: PacienteService = inject(PacienteService);
    medicoService: MedicoService = inject(MedicoService);

    ngOnInit() {
        this.cargarCitasMedicas();
        this.cargarPacientes();
        this.cargarMedicos();
    }






    // Guardar Cita médica
    guardarCitaMedica(cita: CitaMedicaRequest): void {
        if (this.modoForm == "crear") {
            this.citaMedicaService.create(cita).subscribe({
                next: cita => {
                    console.log(cita);
                    // TODO: Mostrar mensaje de feedback
                    this.cargarCitasMedicas();
                },
                error: err => console.log(err),
            })
        }

    }

    modoCrear(): void {
        this.modoForm = "crear";
        this.citaSeleccionada = undefined;
    }

    editarCita(cita: CitaMedicaListResponse): void {
        this.modoForm = "editar";
        this.citaSeleccionada = cita;
    }

    // Eliminar Cita médica
    modalConfirmarEliminar(cita: CitaMedicaListResponse): void {
        this.citaSeleccionada = cita;
        this.mostrarModal = true;
    }

    cancelarEliminar(): void {
        this.mostrarModal = false;
        this.citaSeleccionada = undefined;
    }

    confirmarEliminar(): void {
        if (!this.citaSeleccionada) return;

        this.citaMedicaService
            .deleteById(this.citaSeleccionada.id)
            .subscribe({
                next: () => {
                    this.mostrarModal = false;
                    // TODO: SweetAlert - Mostrar mensaje de éxito
                    this.cargarCitasMedicas();
                },
                error: error => console.error(error)
                // TODO: Mostrar mensaje de error!
            })
    }

    cargarCitasMedicas(): void {
        this.citaMedicaService.getAll().subscribe(data => {
            this.citasMedicas = data;
        })
    }

    cargarPacientes(): void {
        this.pacienteService.getAll().subscribe(data => {
            this.pacientes = data;
        })
    }

    cargarMedicos(): void {
        this.medicoService.getAll().subscribe(data => {
            this.medicos = data;
        })
    }

}
