import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StructureListComponent } from './structure/structure-list/structure-list.component';
import { StructureEntityComponent } from './structure/structure-entity/structure-entity.component';
import { StructureComponent } from './structure/structure.component';
import { StructureNavComponent } from './structure/structure-nav/structure-nav.component';
import { StructureEntityService } from './structure/structure-entity/structure-entity.service';
import { StructureListService } from './structure/structure-list/structure-list.service';

@NgModule({
  declarations: [
    AppComponent,
    StructureListComponent,
    StructureEntityComponent,
    StructureComponent,
    StructureNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    StructureEntityService,
    StructureListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
