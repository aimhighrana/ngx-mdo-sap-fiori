import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowComponent } from '../welcome/_components/flow/flow.component';

const routes: Routes = [
  {
    path: ':dataset', component: FlowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowSelectionRoutingModule { }
