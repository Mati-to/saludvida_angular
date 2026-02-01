import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CitaMedicaDetallesResponse, CitaMedicaListResponse, CitaMedicaRequest} from '../models/cita-medica-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitaMedicaService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = "http://localhost:8080/api/cita-medica";

    getAll(): Observable<CitaMedicaListResponse[]> {
        return this.http.get<CitaMedicaListResponse[]>(this.apiUrl);
    }

    detailsById(id: number): Observable<CitaMedicaDetallesResponse> {
        return this.http.get<CitaMedicaDetallesResponse>(`${this.apiUrl}/${id}`);
    }

    create(cita: CitaMedicaRequest): Observable<CitaMedicaDetallesResponse> {
        return this.http.post<CitaMedicaDetallesResponse>(this.apiUrl, cita);
    }

    update(cita: CitaMedicaRequest, id: number): Observable<CitaMedicaDetallesResponse> {
        return this.http.put<CitaMedicaDetallesResponse>(`${this.apiUrl}/${id}`, cita);
    }

    deleteById(id: number): Observable<Object> {
        return this.http.delete<Object>(`${this.apiUrl}/${id}`);
    }

}
