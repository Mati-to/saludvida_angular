import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PacienteRequest, PacienteResponse} from '../models/paciente-model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = "http://localhost:8080/api/paciente";

    getAll(): Observable<PacienteResponse[]> {
        return this.http.get<PacienteResponse[]>(this.apiUrl);
    }

    create(paciente: PacienteRequest): Observable<PacienteResponse> {
        return this.http.post<PacienteResponse>(this.apiUrl, paciente);
    }

    update(paciente: PacienteRequest, id: number): Observable<PacienteResponse> {
        return this.http.put<PacienteResponse>(`${this.apiUrl}/${id}`, paciente);
    }

    deleteById(id: number): Observable<Object> {
        return this.http.delete<Object>(`${this.apiUrl}/${id}`);
    }

}
