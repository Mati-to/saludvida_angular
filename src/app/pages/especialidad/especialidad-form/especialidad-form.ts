import {Component} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {EspecialidadModel} from '../../../core/models/especialidadModel';
import {EspecialidadService} from '../../../core/services/especialidad-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-especialidad-form',
  imports: [ReactiveFormsModule],
  templateUrl: './especialidad-form.html',
  styleUrl: './especialidad-form.scss',
})
export class EspecialidadForm {

    constructor(
        private especialidadService: EspecialidadService,
        private router: Router,
    ) { }

    formEspecialidad = new FormGroup({
        nombre: new FormControl<string>("",
            {nonNullable: true, validators: [Validators.required]}),
    })

    onSubmit():void {
        if (this.formEspecialidad.invalid) return;
        const nuevaEspecialidad: EspecialidadModel = {
            nombre: this.formEspecialidad.value.nombre as string
        };

        this.especialidadService
            .create(nuevaEspecialidad)
            .subscribe({
                next: (res) => {
                    console.log("Guardado: ", res);
                    this.router.navigateByUrl("/especialidades").then(redirect => {
                        if (redirect) console.log("Redirección exitosa...")
                        else console.error("Error en la redirección...");
                    })
                },
                error: (err) => console.error(err)
            });
    }
}
