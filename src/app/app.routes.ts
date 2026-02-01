import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {EspecialidadComponent} from './pages/especialidad/especialidad.component';
import {MedicoComponent} from './pages/medico/medico.component';
import {PacienteComponent} from './pages/paciente/paciente.component';
import {CitaMedicaComponent} from './pages/cita-medica/cita-medica.component';

export const routes: Routes = [
    {
        path: "",
        component: Home,
    },
    {
        path: "especialidades",
        component: EspecialidadComponent
    },
    {
        path: "medicos",
        component: MedicoComponent
    },
    {
        path: "pacientes",
        component: PacienteComponent
    },
    {
        path: "citas-medicas",
        component: CitaMedicaComponent
    }
];
