export interface ApiErrorModel {
    status: number;
    mensaje: string;
    path: string;
    errores?: ErroresBackend;
}

export type ErroresBackend = Record<string, string[]>;
