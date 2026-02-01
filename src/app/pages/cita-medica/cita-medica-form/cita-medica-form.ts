import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CitaMedicaListResponse, CitaMedicaRequest} from '../../../core/models/cita-medica-model';
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
export class CitaMedicaForm {
    @Input() modo!: "crear" | "editar";
    @Input() citaMedica?: CitaMedicaListResponse;
    @Input() pacientes: PacienteResponse[] = [];
    @Input() medicos: MedicoResponse[] = [];

    @Output()
    guardarCita = new EventEmitter<CitaMedicaRequest>();

    @Output()
    cancelar = new EventEmitter<void>();


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

}
