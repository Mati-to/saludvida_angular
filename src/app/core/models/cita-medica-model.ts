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
    pacienteId: number,
    medicoId: number,
    nombrePaciente: string,
    nombreMedico: string,
    especialidad: string,
    fechaCita: string,
    horaCita: string,
    observaciones: string
}

export interface CitaMedicaDetallesResponse {
    id: number,
    pacienteDto: PacienteResponse,
    medicoDto: MedicoResponse,
    fechaCita: string,
    horaCita: string,
    observaciones: string
}

