import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicoResponse} from '../models/medico-model';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = "http://localhost:8080/api/medico";

    getAll(): Observable<MedicoResponse[]> {
        return this.http.get<MedicoResponse[]>(this.apiUrl);
    }

}
