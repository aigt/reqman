import { Component, OnInit, OnDestroy } from '@angular/core';
import { StructureListItem } from '../structure-list/structure-list-item';
import { StructureEntityService } from './structure-entity.service';
import { ActivatedRoute } from '@angular/router';
import { StructureEntity } from './structure-entity';

@Component({
  selector: 'app-structure-entity',
  templateUrl: './structure-entity.component.html',
  styleUrls: ['./structure-entity.component.css']
})
export class StructureEntityComponent implements OnInit, OnDestroy {

  // подписка на события роутера
  private routeSub: any;
  
  entity: StructureEntity;

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

      this.entity = this.structureEntityService.entityById(itemId);
    });
  }
  
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  
}
