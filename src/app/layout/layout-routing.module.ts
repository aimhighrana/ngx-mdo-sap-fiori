import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './_components/layout/layout.component';

const routes: Routes = [
  {
    path:'', component: LayoutComponent, children:[
      {
        path: '', 
        redirectTo: 'welcome', 
        pathMatch: 'full'
      },{
        path:'welcome', loadChildren:()=>import('../welcome/welcome.module').then((m)=> m.WelcomeModule)
      },
      {
        path: 'master', loadChildren:()=> import('../transaction/transaction.module').then((m)=> m.TransactionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
