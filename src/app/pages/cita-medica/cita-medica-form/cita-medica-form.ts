import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    CitaMedicaListResponse,
    CitaMedicaRequest
} from '../../../core/models/cita-medica-model';
import {MedicoResponse} from '../../../core/models/medico-model';
import {PacienteResponse} from '../../../core/models/paciente-model';

@Component({
  selector: 'app-cita-medica-form',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './cita-medica-form.html',
  styleUrl: './cita-medica-form.scss',
})
export class CitaMedicaForm implements OnChanges {
    @Input() modo!: "crear" | "editar";
    @Input() citaMedica?: CitaMedicaListResponse;
    @Input() pacientes: PacienteResponse[] = [];
    @Input() medicos: MedicoResponse[] = [];
    @Input() horariosDisponibles: string[] = [];
    @Input() busquedaHorariosRealizada: boolean = false;

    @Output()
    guardarCita = new EventEmitter<CitaMedicaRequest>();

    @Output()
    cancelar = new EventEmitter<void>();

    @Output()
    cancelarBusquedaHorarios = new EventEmitter<void>();

    @Output()
    getHorariosDisponibles = new EventEmitter<
        {medicoId: number, fecha: string}
    >();


    // Formulario
    formCita = new FormGroup({
        pacienteId: new FormControl<number | null>(null,
            {validators: [Validators.required]}),
        medicoId: new FormControl<number | null>(null,
            {validators: [Validators.required]}),
        fechaCita: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        horaCita: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        observaciones: new FormControl<string | null>(""),
    })

    ngOnChanges(): void {
        if (this.modo === "editar" && this.citaMedica) {
            this.formCita.reset();
            this.formCita.patchValue({
                pacienteId: this.citaMedica.pacienteId,
                medicoId: this.citaMedica.medicoId,
                fechaCita: this.citaMedica.fechaCita,
                horaCita: this.citaMedica.horaCita,
                observaciones: this.citaMedica.observaciones
            })
        }
    }

    enviarCita(): void {
        if (this.formCita.invalid) return;

        const formValues = this.formCita.getRawValue();
        const request: CitaMedicaRequest = {
            ...formValues,
            pacienteId: formValues.pacienteId!,
            medicoId: formValues.medicoId!,
        }

        this.guardarCita.emit(request);
        this.formCita.reset();
    }

    solicitarHorarios(): void {
        const medicoId = this.formCita.get("medicoId")?.value;
        const fecha = this.formCita.get("fechaCita")?.value;

        if (medicoId && fecha) {
            this.getHorariosDisponibles.emit({medicoId, fecha});
        }
    }

    cancelarEdit(): void {
        this.formCita.reset();
        this.cancelar.emit();
    }
}
