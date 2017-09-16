import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { StructureListService } from './structure-list.service';
import { StructureListItem } from './structure-list-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.css'],
  providers: [ StructureListService ]
})
export class StructureListComponent implements OnInit, OnDestroy {

  // подписка на события роутера
  private routeSub: any;

  items: StructureListItem[];

  constructor(
    private structureListService: StructureListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let itemId: number = +params['itemId'];
      // Если itemId не был задан, принимаем его за id корневого элемента,
      // который по умолчанию = 0
      if (isNaN(itemId) || !isFinite(itemId)) itemId = 0;

      this.items = this.structureListService.childrenFor(itemId);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
