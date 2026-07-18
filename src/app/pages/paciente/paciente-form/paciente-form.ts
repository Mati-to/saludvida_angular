import {
    Component, effect,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PacienteRequest, PacienteResponse, Sexo} from '../../../core/models/paciente-model';

interface PacienteFormGroup {
    nombre: FormControl<string>,
    apellido: FormControl<string>,
    rut: FormControl<string>,
    telefono: FormControl<string | null>,
    fechaNacimiento: FormControl<string>,
    sexo: FormControl<Sexo | null>,
}

@Component({
  selector: 'app-paciente-form',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './paciente-form.html',
  styleUrl: './paciente-form.scss',
})
export class PacienteForm {
    listaSexo: Sexo[] = Object.values(Sexo);
    modo: InputSignal<"crear" | "editar"> = input.required<"crear" | "editar">();
    paciente: InputSignal<PacienteResponse | undefined> = input<PacienteResponse | undefined>();
    isSaveLoading: InputSignal<boolean> = input.required<boolean>();

    guardarPaciente: OutputEmitterRef<PacienteRequest> = output<PacienteRequest>();
    cancelar: OutputEmitterRef<void> = output<void>();

    formPaciente: FormGroup<PacienteFormGroup> = new FormGroup({
        nombre: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,50}$/)]}),
        apellido: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,50}$/)]}),
        rut: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{7,8}-[0-9Kk]$/)]}),
        telefono: new FormControl<string | null>("",
            {validators: [Validators.pattern(/^[0-9]{9}$/)] }),
        fechaNacimiento: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
        sexo: new FormControl<Sexo | null>(null,
            {validators: [Validators.required]})
    })

    constructor() {
        // Form - Edición
        effect((): void => {
            const paciente: PacienteResponse | undefined = this.paciente();
            if (this.modo() === "editar" && paciente) {
                this.formPaciente.patchValue({
                    nombre: paciente.nombre,
                    apellido: paciente.apellido,
                    rut: paciente.rut,
                    telefono: paciente.telefono,
                    fechaNacimiento: paciente.fechaNacimiento,
                    sexo: paciente.sexo
                });
            }
        });
    }

    enviarPaciente(): void {
        if (this.formPaciente.invalid) return;
        const formValues = this.formPaciente.getRawValue();
        const req: PacienteRequest = {
            ...formValues,
            sexo: formValues.sexo!
        };
        this.guardarPaciente.emit(req);
    }

    limpiarForm(): void {
        this.formPaciente.reset();
    }
}
