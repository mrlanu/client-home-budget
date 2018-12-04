import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OperationsComponent} from './operations/operations.component';

const routes: Routes = [
  {path: 'operations', component: OperationsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
