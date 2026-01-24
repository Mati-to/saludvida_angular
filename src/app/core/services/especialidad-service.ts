import {inject, Injectable} from '@angular/core';
import {EspecialidadResponse} from '../models/especialidad-response';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EspecialidadRequest} from '../models/especialidad-request';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = "http://localhost:8080/api/especialidad";

    getAll(): Observable<EspecialidadResponse[]> {
        return this.http.get<EspecialidadResponse[]>(this.apiUrl);
    }

    create(especialidad: EspecialidadRequest): Observable<EspecialidadResponse> {
        return this.http.post<EspecialidadResponse>(this.apiUrl, especialidad);
    }

    deleteById(id: number): Observable<Object> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
