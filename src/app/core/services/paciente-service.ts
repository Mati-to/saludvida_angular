import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PacienteRequest, PacienteResponse} from '../models/paciente-model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = "http://localhost:8080/api/paciente";

    getAllResource: HttpResourceRef<PacienteResponse[]> = httpResource(
        (): string => this.apiUrl, { defaultValue: [] }
    );

    // TODO: Código usado en entidad Horarios. Eliminar cuando ya no se ocupe. Por ahora
    // se queda para no tener errores mientras se trabaja en la entidad Paciente
    getAll(): Observable<PacienteResponse[]> {
        return this.http.get<PacienteResponse[]>(this.apiUrl);
    }

    create(paciente: PacienteRequest): Observable<PacienteResponse> {
        return this.http.post<PacienteResponse>(this.apiUrl, paciente);
    }

    update(paciente: PacienteRequest, id: number): Observable<PacienteResponse> {
        return this.http.put<PacienteResponse>(`${this.apiUrl}/${id}`, paciente);
    }

    deleteById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
