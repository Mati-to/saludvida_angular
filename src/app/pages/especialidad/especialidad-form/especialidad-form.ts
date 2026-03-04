import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {EspecialidadRequest, EspecialidadResponse} from '../../../core/models/especialidad-model';

@Component({
    selector: 'app-especialidad-form',
    imports: [ReactiveFormsModule],
    templateUrl: './especialidad-form.html',
    styleUrl: './especialidad-form.scss',
})
export class EspecialidadForm implements OnChanges {
    @Input() modo!: "crear" | "editar";
    @Input() especialidad?: EspecialidadResponse;
    @Input() erroresFormBackend?: Record<string, string[]>;

    @Output()
    onGuardarEspecialidad: EventEmitter<EspecialidadRequest> = new EventEmitter<EspecialidadRequest>();

    @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();

    // Formulario
    formEspecialidad: FormGroup = new FormGroup({
        nombre: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
    })

    ngOnChanges(changes:SimpleChanges): void {
        if (this.modo === "editar" && this.especialidad) {
            this.formEspecialidad.patchValue({
                nombre: this.especialidad.nombre
            });
        }

        if (changes["erroresFormBackend"] && this.erroresFormBackend) {
            Object.keys(this.erroresFormBackend).forEach((campo: string): void => {
                const control = this.formEspecialidad.get(campo);
                if (control) {
                    control.setErrors({
                        backendError: this.erroresFormBackend![campo][0]
                    })
                }
            })
        }
    }

    enviarEspecialidad(): void {
        if (this.formEspecialidad.invalid) return;
        this.onGuardarEspecialidad.emit(this.formEspecialidad.getRawValue());
    }

    limpiarForm(): void {
        this.formEspecialidad.reset();
    }

}
