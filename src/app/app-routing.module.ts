import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StructureComponent } from './structure/structure.component';

const routes: Routes = [
  { path: '', redirectTo: '/structure', pathMatch: 'full' },
  { path: 'structure',  component: StructureComponent },
  { path: 'structure/:itemId',  component: StructureComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}