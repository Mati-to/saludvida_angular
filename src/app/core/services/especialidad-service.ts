import { Injectable } from '@angular/core';
import {EspecialidadModel} from '../models/especialidadModel';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
    private especialidades: EspecialidadModel[] = [
        { nombre: "Kinesiología" },
        { nombre: "Medicina general" },
    ];

    getAll(): Observable<EspecialidadModel[]> {
        return of(this.especialidades);
    }

    create(especialidad: EspecialidadModel): Observable<EspecialidadModel> {
        const nueva: EspecialidadModel = {
            nombre: especialidad.nombre,
        };

        this.especialidades = [...this.especialidades, nueva];
        return of(nueva);
    }

}
