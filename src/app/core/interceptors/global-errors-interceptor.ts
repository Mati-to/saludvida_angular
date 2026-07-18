import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import Swal from 'sweetalert2';

export const globalErrorsInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn) => {

    const ToastError = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
            title: 'mb-0'
        },
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
    });

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            // TODO: Crear vista con error 404 y redireccionar hacia esa vista

            let mensaje: string = "Hubo un error inesperado.";

            if (err.status === 0) {
                mensaje = "No se pudo conectar con el servidor.";
            } else if (!err.error?.errores) {
                mensaje = err.error.mensaje;
            }

            void ToastError.fire({
                title: 'Error',
                text: mensaje,
                icon: 'error',
            });
            return throwError((): HttpErrorResponse => err);
        }),
    );
};
