export interface PacienteRequest {
    nombre: string,
    apellido: string,
    rut: string,
    telefono: string | null,
    fechaNacimiento: string,
    sexo: Sexo
}

export interface PacienteResponse {
    id: number,
    nombre: string,
    apellido: string,
    rut: string,
    telefono: string | null,
    edad: number,
    fechaNacimiento: string,
    sexo: Sexo
}

export enum Sexo {
    MASCULINO = "MASCULINO",
    FEMENINO = "FEMENINO",
    OTRO = "OTRO"
}
