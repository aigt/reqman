import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StructureComponent } from './structure/structure.component';
import { ChecklistComponent } from './checklist/checklist.component';

const routes: Routes = [
  { path: '', redirectTo: '/structure', pathMatch: 'full' },
  { path: 'structure',  component: StructureComponent },
  { path: 'structure/:itemId',  component: StructureComponent },
  { path: 'checklist/:id',  component: ChecklistComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}