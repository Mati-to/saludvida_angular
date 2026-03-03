import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import Swal from 'sweetalert2';

export const globalErrorsInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn) => {

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {

            if (err.status === 400 && err.error?.errores) {
                return throwError((): HttpErrorResponse => err);
            }

            let mensaje: string = "Hubo un error inesperado.";

            if (err.status === 0) {
                mensaje = "No se pudo conectar con el servidor.";
            } else if (err.error?.errores) {
                mensaje = err.error.mensaje;
            }

            void Swal.fire({
                title: `Error ${err.error.status ?? ""}!`,
                text: mensaje,
                icon: 'error',
            });
            return throwError((): HttpErrorResponse => err);
        }),
    );
};
