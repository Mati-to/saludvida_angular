export interface PacienteRequest {
    nombre: string,
    apellido: string,
    rut: string,
    telefono: string,
    fechaNacimiento: string,
    sexo: Sexo
}

export interface PacienteResponse {
    id: number,
    nombre: string,
    apellido: string,
    rut: string,
    telefono: string,
    edad: number,
    sexo: Sexo
}

export enum Sexo {
    MASCULINO = "MASCULINO",
    FEMENINO = "FEMENINO",
    OTRO = "OTRO"
}
