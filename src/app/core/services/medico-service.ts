import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicoCreateRequest, MedicoResponse, MedicoUpdateRequest} from '../models/medico-model';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = "http://localhost:8080/api/medico";

    getAll(): Observable<MedicoResponse[]> {
        return this.http.get<MedicoResponse[]>(this.apiUrl);
    }

    create(medico: MedicoCreateRequest): Observable<MedicoResponse> {
        return this.http.post<MedicoResponse>(this.apiUrl, medico);
    }

    update(medico: MedicoUpdateRequest, id: number): Observable<MedicoResponse> {
        return this.http.put<MedicoResponse>(`${this.apiUrl}/${id}`, medico);
    }

    deleteById(id: number): Observable<Object> {
        return this.http.delete<Object>(`${this.apiUrl}/${id}`);
    }

}
