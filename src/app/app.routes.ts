import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CrudForoComponent } from './components/crud-foro/crud-foro.component';
import { CrudReportesProblemasComponent } from './components/crud-reportes-problemas/crud-reportes-problemas.component';

export const routes: Routes = [
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'foro', title: 'Foro', component: CrudForoComponent },
  {
    path: 'reportes',
    title: 'Reportes de Problemas',
    component: CrudReportesProblemasComponent,
  },
  { path: '**', redirectTo: 'home' },
];
