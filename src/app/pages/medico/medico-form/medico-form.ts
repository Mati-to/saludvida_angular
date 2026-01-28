import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MedicoRequest, MedicoResponse} from '../../../core/models/medico-model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EspecialidadResponse} from '../../../core/models/especialidad-model';

@Component({
  selector: 'app-medico-form',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './medico-form.html',
  styleUrl: './medico-form.scss',
})
export class MedicoForm {
    @Input() modo!: "crear" | "editar";
    @Input() medico?: MedicoResponse;
    @Input() especialidades: EspecialidadResponse[] = [];

    @Output()
    guardarMedico = new EventEmitter<MedicoRequest>();

    @Output()
    cancelar = new EventEmitter<void>();


    // Formulario
    formMedico = new FormGroup({
        nombre: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        apellido: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        correo: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required, Validators.email]}),
        rut: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        telefono: new FormControl<string | null>(""),
        especialidadId: new FormControl<number | null>(null,
            {validators: [Validators.required]}),
    })


    enviarMedico(): void {
        if (this.formMedico.invalid) return;

        const formValues = this.formMedico.getRawValue();
        const request: MedicoRequest = {
            ...formValues,
            especialidadId: formValues.especialidadId!
        }

        this.guardarMedico.emit(request);
        this.formMedico.reset();
    }
}
