import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',redirectTo:'home',pathMatch:'full'
  },{
    path:'home',
    loadChildren: () => import('./layout/layout.module').then((m)=> m.LayoutModule),
    canActivate: mapToCanActivate([AuthGuard])
  },{
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then((m)=> m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
