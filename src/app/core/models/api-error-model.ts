export interface ApiErrorModel {
    status: number;
    mensaje: string;
    path: string;
    errores?: Record<string, string[]>
}
