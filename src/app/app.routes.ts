import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {EspecialidadComponent} from './pages/especialidad/especialidad.component';

export const routes: Routes = [
    {
        path: "",
        component: Home,
    },
    {
        path: "especialidades",
        children: [
            {path: "", component: EspecialidadComponent}
        ]
    },
];
