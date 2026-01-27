import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {EspecialidadRequest} from '../../../core/models/especialidad-request';
import {EspecialidadResponse} from '../../../core/models/especialidad-response';

@Component({
    selector: 'app-especialidad-form',
    imports: [ReactiveFormsModule],
    templateUrl: './especialidad-form.html',
    styleUrl: './especialidad-form.scss',
})
export class EspecialidadForm implements OnChanges {

    @Input() modo!: "crear" | "editar";
    @Input() especialidad?: EspecialidadResponse;

    @Output()
    onGuardarEspecialidad: EventEmitter<EspecialidadRequest> = new EventEmitter<EspecialidadRequest>();

    @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();

    // Formulario
    formEspecialidad = new FormGroup({
        nombre: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
    })

    ngOnChanges(): void {
        if (this.modo === "editar" && this.especialidad) {
            this.formEspecialidad.patchValue({
                nombre: this.especialidad.nombre
            });
        } else {
            this.formEspecialidad.reset();
        }
    }


    enviarEspecialidad(): void {
        if (this.formEspecialidad.invalid) return;
        this.onGuardarEspecialidad.emit(this.formEspecialidad.getRawValue());
        this.formEspecialidad.reset();
    }

}
