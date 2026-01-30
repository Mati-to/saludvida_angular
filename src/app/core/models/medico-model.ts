import {EspecialidadResponse} from './especialidad-model';

export interface MedicoCreateRequest {
    nombre: string,
    apellido: string,
    correo: string,
    rut: string,
    telefono: string | null,
    especialidadId: number
}

export interface MedicoUpdateRequest {
    nombre: string,
    apellido: string,
    telefono: string | null,
    especialidadId: number
}

export interface MedicoResponse {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    rut: string,
    telefono?: string,
    especialidad: EspecialidadResponse
}
