import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StructureEntityService } from '../structure-entity/structure-entity.service';
import { StructureListItem } from '../structure-list/structure-list-item';

@Component({
  selector: 'app-structure-nav',
  templateUrl: './structure-nav.component.html',
  styleUrls: ['./structure-nav.component.css']
})
export class StructureNavComponent implements OnInit, OnDestroy {

  // подписка на события роутера
  private routeSub: any;

  parentItemNames: StructureListItem[] = [];

  constructor(
    private structureEntityService: StructureEntityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let itemId: number = +params['itemId'];
      // Если itemId не был задан, принимаем его за id корневого элемента,
      // который по умолчанию = 0
      if (isNaN(itemId) || !isFinite(itemId)) itemId = 0;

      this.parentItemNames = this.structureEntityService.parentPathsStackForId(itemId, true);
    });
  }
  
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
