import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {EspecialidadComponent} from './pages/especialidad/especialidad.component';
import {MedicoComponent} from './pages/medico/medico.component';

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
    {
        path: "medicos",
        children: [
            {path: "", component: MedicoComponent}
        ]
    }
];
