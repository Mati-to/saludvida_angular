import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MedicoCreateRequest, MedicoResponse} from '../../../core/models/medico-model';
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
export class MedicoForm implements OnChanges {
    @Input() modo!: "crear" | "editar";
    @Input() medico?: MedicoResponse;
    @Input() especialidades: EspecialidadResponse[] = [];

    @Output()
    guardarMedico = new EventEmitter<MedicoCreateRequest>();

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

    ngOnChanges(): void {
        if (this.modo === "editar" && this.medico) {
            this.formMedico.patchValue({
                nombre: this.medico.nombre,
                apellido: this.medico.apellido,
                correo: this.medico.correo,
                rut: this.medico.rut,
                telefono: this.medico.telefono,
                especialidadId: this.medico.especialidad.id
            });

            // Bloqueo de campos para no editar
            this.formMedico.get('rut')?.disable();
            this.formMedico.get('correo')?.disable();

        } else {
            this.formMedico.reset();

            // Rehabilita los campos deshabilitados al pasar a modo Crear
            this.formMedico.get('rut')?.enable();
            this.formMedico.get('correo')?.enable();
        }
    }


    enviarMedico(): void {
        if (this.formMedico.invalid) return;

        const formValues = this.formMedico.getRawValue();
        const request: MedicoCreateRequest = {
            ...formValues,
            especialidadId: formValues.especialidadId!
        }

        this.guardarMedico.emit(request);
        this.formMedico.reset();
    }
}
