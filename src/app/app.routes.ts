import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {EspecialidadComponent} from './pages/especialidad/especialidad.component';
import {EspecialidadForm} from './pages/especialidad/especialidad-form/especialidad-form';

export const routes: Routes = [
    {
        path: "",
        component: Home,
    },
    {
        path: "especialidades",
        children: [
            {path: "", component: EspecialidadComponent},
            {path: "crear", component: EspecialidadForm}
        ]
    },
];
