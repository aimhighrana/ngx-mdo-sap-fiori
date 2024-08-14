import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './_components/layout/layout.component';

const routes: Routes = [
  {
    path:'', component: LayoutComponent, children:[
      {
        path: '', 
        redirectTo: 'master', 
        pathMatch: 'full'
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
