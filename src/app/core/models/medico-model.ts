export interface MedicoRequest {
    nombre: string,
    apellido: string,
    correo: string,
    rut: string,
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
    nombreEspecialidad: string
}
