import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {EspecialidadRequest} from '../../../core/models/especialidad-request';

@Component({
  selector: 'app-especialidad-form',
    imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './especialidad-form.html',
  styleUrl: './especialidad-form.scss',
})
export class EspecialidadForm {

    // Formulario
    formEspecialidad = new FormGroup({
        nombre: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
    })

    @Output()
    onGuardarEspecialidad = new EventEmitter<EspecialidadRequest>();

    enviarEspecialidad(): void {
        if (this.formEspecialidad.invalid) return;
        this.onGuardarEspecialidad.emit(this.formEspecialidad.getRawValue());
        this.formEspecialidad.reset();
    }

}
