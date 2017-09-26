import { Component, OnInit, Output, OnDestroy, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { StructureListService } from './structure-list.service';
import { StructureListItem } from './structure-list-item';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.css'],
  providers: [Modal]
})
export class StructureListComponent implements OnInit, OnDestroy {

  // подписка на события роутера
  private routeSub: any;
  // подписка на события добавления элемента
  private addedItemSub: any;
  
  items: StructureListItem[];
  itemId: number;

  constructor(
    private modal: Modal,
    private structureListService: StructureListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.itemId = +params['itemId'];
      // Если itemId не был задан, принимаем его за id корневого элемента,
      // который по умолчанию = 0
      if (isNaN(this.itemId) || !isFinite(this.itemId)) this.itemId = 0;

      this.items = this.structureListService.childrenFor(this.itemId);
    });

    this.addedItemSub = this.structureListService.addedItem.subscribe(item => {
      this.items.push(item);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.addedItemSub.unsubscribe();
  }

  addStructureClicked() {
    this.modal.open(AddItemModalComponent,  overlayConfigFactory({ parentId: this.itemId }, BSModalContext));
  }

  onAddItem() {

  }

}
