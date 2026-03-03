import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors, withXsrfConfiguration} from '@angular/common/http';
import {globalErrorsInterceptor} from './core/interceptors/global-errors-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
      provideBrowserGlobalErrorListeners(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(
          withXsrfConfiguration({
              cookieName: "XSRF-TOKEN",
              headerName: "X-XSRF-TOKEN",
          })
      ),
      provideHttpClient(
          withInterceptors([
              globalErrorsInterceptor
          ])
      ),
      provideSweetAlert2({
          fireOnInit: false,
          dismissOnDestroy: true,
      })
  ]
};
