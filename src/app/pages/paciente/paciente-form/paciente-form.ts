import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PacienteRequest, PacienteResponse, Sexo} from '../../../core/models/paciente-model';

@Component({
  selector: 'app-paciente-form',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './paciente-form.html',
  styleUrl: './paciente-form.scss',
})
export class PacienteForm implements OnChanges {
    listaSexo: Sexo[] = Object.values(Sexo);
    @Input() modo!: "crear" | "editar";
    @Input() paciente?: PacienteResponse;

    @Output()
    guardarPaciente = new EventEmitter<PacienteRequest>();

    @Output()
    cancelar = new EventEmitter<void>();


    formPaciente = new FormGroup({
        nombre: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        apellido: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        rut: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        telefono: new FormControl<string | null>("",),
        fechaNacimiento: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        sexo: new FormControl<Sexo | null>(null,
            {validators: [Validators.required]})
    })

    ngOnChanges(): void {
        if (this.modo === "editar" && this.paciente) {
            this.formPaciente.patchValue({
                nombre: this.paciente.nombre,
                apellido: this.paciente.apellido,
                rut: this.paciente.rut,
                telefono: this.paciente.telefono,
                fechaNacimiento: this.paciente.fechaNacimiento,
                sexo: this.paciente.sexo
            });
        } else {
            this.formPaciente.reset();
        }
    }

    enviarPaciente(): void {
        if (this.formPaciente.invalid) return;

        const formValues = this.formPaciente.getRawValue();
        const req: PacienteRequest = {
            ...formValues,
            sexo: formValues.sexo!
        }

        this.guardarPaciente.emit(req);
        this.formPaciente.reset();
    }
}
