import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewRegisterComponent } from './admin/new-register/new-register.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SecureInnerPagesGuard } from './services/secure-inner-pages.guard';
import { EditRegisterComponent } from './admin/edit-register/edit-register.component';
import { MainComponent } from './admin/main/main.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { NotasComponent } from './admin/notas/notas.component';
import { OrdenesComponent } from './admin/ordenes/ordenes.component';
import { NewOrdenComponent } from './admin/new-orden/new-orden.component';
import { NewNotaComponent } from './admin/new-nota/new-nota.component';
import { EditOrdenComponent } from './admin/edit-orden/edit-orden.component';
import { EditNotaComponent } from './admin/edit-nota/edit-nota.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: MainComponent},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'notas', component: NotasComponent, canActivate: [AuthGuard]},
  {path: 'ordenes', component: OrdenesComponent, canActivate: [AuthGuard]},
  {path: 'nuevo-cliente', component: NewRegisterComponent, canActivate: [AuthGuard]},
  {path: 'nueva-orden', component: NewOrdenComponent, canActivate: [AuthGuard]},
  {path: 'nueva-nota', component: NewNotaComponent, canActivate: [AuthGuard]},
  {path: 'editar-cliente/:key', component: EditRegisterComponent, canActivate: [AuthGuard]},
  {path: 'editar-orden/:key', component: EditOrdenComponent, canActivate: [AuthGuard]},
  {path: 'editar-nota/:key', component: EditNotaComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
