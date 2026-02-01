import {PacienteResponse} from './paciente-model';
import {MedicoResponse} from './medico-model';

export interface CitaMedicaRequest {
    pacienteId: number,
    medicoId: number,
    fechaCita: string,
    horaCita: string,
    observaciones: string | null
}

export interface CitaMedicaListResponse {
    id: number,
    nombrePaciente: string,
    nombreMedico: string,
    especialidad: string,
    fechaCita: string,
    horaCita: string,
}

export interface CitaMedicaDetallesResponse {
    id: number,
    pacienteDetalles: PacienteResponse,
    medicoDetalles: MedicoResponse,
    fechaCita: string,
    horaCita: string,
    observaciones: string
}

