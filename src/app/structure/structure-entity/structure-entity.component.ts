import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StructureListItem } from '../structure-list/structure-list-item';
import { StructureEntityService } from './structure-entity.service';
import { StructureEntity } from './structure-entity';
import { EditItemModalComponent } from '../structure-list/edit-item-modal/edit-item-modal.component';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { RemoveItemModalComponent } from '../structure-list/remove-item-modal/remove-item-modal.component';
import { AddTechRequirementModalComponent } from './add-tech-requirement-modal/add-tech-requirement-modal.component';
import { EditTechRequirementModalComponent } from './edit-tech-requirement-modal/edit-tech-requirement-modal.component';
import { TechnicalRequirement } from './technical-requirement';
import { TechnicalRequirementKey } from './technical-requirement-key';
import { RemoveTechRequirementModalComponent } from './remove-tech-requirement-modal/remove-tech-requirement-modal.component';

@Component({
  selector: 'app-structure-entity',
  templateUrl: './structure-entity.component.html',
  styleUrls: ['./structure-entity.component.css']
})
export class StructureEntityComponent implements OnInit, OnDestroy {

  // подписка на события роутера
  private routeSub: any;
  // подписка на событие изменения сущности
  private changedEntitySub: any;
  // подписка на событие удаления сущности
  private removedEntitySub: any;
  
  entity: StructureEntity;

  constructor(
    private router: Router,
    private modal: Modal,
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

    this.changedEntitySub = this.structureEntityService.changedEntity.subscribe(entity => {
      if(entity.id === this.entity.id) {
        this.entity = entity.getCopy();
      }
    });

    this.removedEntitySub = this.structureEntityService.removedEntity.subscribe(entity => {
      if(entity.id === this.entity.id) {
        this.router.navigate(['structure']);
      }
    });
  }
  
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.changedEntitySub.unsubscribe();
    this.removedEntitySub.unsubscribe();
  }

  editStructureClicked(id) {
    this.modal.open(EditItemModalComponent,  overlayConfigFactory({ id: id }, BSModalContext));    
  }

  removeStructureClicked(id) {
    this.modal.open(RemoveItemModalComponent,  overlayConfigFactory({ id: id }, BSModalContext));    
  }

  addTechRequirementClicked() {
    this.modal.open(AddTechRequirementModalComponent,  overlayConfigFactory({ toEntity: this.entity }, BSModalContext));
  }

  editTechRequirementClicked(req: TechnicalRequirement) {
    this.modal.open(EditTechRequirementModalComponent,  overlayConfigFactory({ requirement: req }, BSModalContext));
  }

  removeTechRequirementClicked(key: TechnicalRequirementKey) {
    this.modal.open(RemoveTechRequirementModalComponent,  overlayConfigFactory({ key: key }, BSModalContext));
  }
  
}
