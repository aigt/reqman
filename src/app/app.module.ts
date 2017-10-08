import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StructureListComponent } from './structure/structure-list/structure-list.component';
import { StructureEntityComponent } from './structure/structure-entity/structure-entity.component';
import { StructureComponent } from './structure/structure.component';
import { StructureNavComponent } from './structure/structure-nav/structure-nav.component';
import { StructureEntityService } from './structure/structure-entity/structure-entity.service';
import { StructureListService } from './structure/structure-list/structure-list.service';
import { AddItemModalComponent } from './structure/structure-list/add-item-modal/add-item-modal.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ChecklistComponent } from './checklist/checklist.component';
import { EditItemModalComponent } from './structure/structure-list/edit-item-modal/edit-item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StructureListComponent,
    StructureEntityComponent,
    StructureComponent,
    StructureNavComponent,
    AddItemModalComponent,
    ChecklistComponent,
    EditItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ModalModule.forRoot(),
    BootstrapModalModule,
    FormsModule 
  ],
  providers: [
    StructureEntityService,
    StructureListService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddItemModalComponent,
    EditItemModalComponent
  ]
})
export class AppModule { }
