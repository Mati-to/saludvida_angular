import {Component, inject, OnInit} from '@angular/core';
import {MedicoList} from './medico-list/medico-list';
import {MedicoCreateRequest, MedicoResponse, MedicoUpdateRequest} from '../../core/models/medico-model';
import {MedicoService} from '../../core/services/medico-service';
import {MedicoForm} from './medico-form/medico-form';
import {EspecialidadService} from '../../core/services/especialidad-service';
import {EspecialidadResponse} from '../../core/models/especialidad-model';
import {ModalConfirmarEliminar} from '../../shared/components/modal-confirmar-eliminar/modal-confirmar-eliminar';

@Component({
  selector: 'app-medico',
    imports: [
        MedicoList,
        MedicoForm,
        ModalConfirmarEliminar
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

    // Ingresar Médico
    guardarMedico(medico: MedicoCreateRequest | MedicoUpdateRequest) {
        if (this.modoForm === "crear") {
            this.medicoService.create(medico as MedicoCreateRequest).subscribe({
                next: (medico: MedicoResponse) => {
                    console.log("Guardado: ", medico);
                    // TODO: SweetAlert - Mostrar un mensaje de feedback
                    this.cargarListaMedicos();
                },
                error: error => console.error(error)
            })
        }

        if (this.modoForm === "editar" && this.medicoSeleccionado) {
            const id = this.medicoSeleccionado.id;
            this.medicoService.update(medico as MedicoUpdateRequest, id).subscribe({
                next: (medico: MedicoResponse) => {
                    console.log("Guardado: ", medico);
                    // TODO: Mensaje de éxito
                    this.modoForm = "crear";
                    this.cargarListaMedicos();
                },
                error: error => console.error(error)
            })
        }

    }

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
        this.medicoSeleccionado = medico;
        this.mostrarModal = true;
    }

    cancelarEliminar(): void {
        this.mostrarModal = false;
        this.medicoSeleccionado = undefined;
    }

    confirmarEliminar(): void {
        if (!this.medicoSeleccionado) return;

        this.medicoService
            .deleteById(this.medicoSeleccionado.id)
            .subscribe({
                next: () => {
                    this.mostrarModal = false;
                    // TODO: SweetAlert - Mostrar mensaje de éxito
                    this.cargarListaMedicos();
                },
                error: error => console.error(error)
                // TODO: Mostrar mensaje de error!
            })
    }

    get nombreCompleto(): string {
        return this.medicoSeleccionado
            ? `${this.medicoSeleccionado.nombre} ${this.medicoSeleccionado.apellido}`
            : "";
    }

}
