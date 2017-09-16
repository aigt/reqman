import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StructureListComponent } from './structure-list/structure-list.component';
import { StructureEntityComponent } from './structure-entity/structure-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    StructureListComponent,
    StructureEntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
