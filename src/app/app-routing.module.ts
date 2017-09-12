import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StructureListComponent } from './structure-list/structure-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/structure', pathMatch: 'full' },
  { path: 'structure',  component: StructureListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}