import { Component, OnInit, OnDestroy } from '@angular/core';
import { StructureEntityService } from '../structure/structure-entity/structure-entity.service';
import { ActivatedRoute } from '@angular/router';
import { StructureEntity } from '../structure/structure-entity/structure-entity';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit, OnDestroy {

  // подписка на события роутера
  private routeSub: any;

  entity: StructureEntity;

  constructor(
    private structureEntityService: StructureEntityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let id: number = +params['id'];
      // Если itemId не был задан, принимаем его за id корневого элемента,
      // который по умолчанию = 0
      if (isNaN(id) || !isFinite(id)) id = 0;

      this.entity = this.structureEntityService.entityById(id);
    });
  }
  
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  
}
