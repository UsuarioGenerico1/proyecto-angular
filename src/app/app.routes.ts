import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CrudForoComponent } from './components/crud-foro/crud-foro.component';
import { CrudReportesProblemasComponent } from './components/crud-reportes-problemas/crud-reportes-problemas.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'foro',component:CrudForoComponent},
    {path: 'reportes', component: CrudReportesProblemasComponent, title: 'Reportes de Problemas'},
    {path: 'usuario', component: CrudUsuarioComponent, title: 'Usuarios'},
    {path:'',redirectTo:'/home',pathMatch:'full'}
    
];
