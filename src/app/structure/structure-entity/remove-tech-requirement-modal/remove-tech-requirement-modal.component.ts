import { Component, OnInit } from '@angular/core';

import { 
  DialogRef, 
  ModalComponent, 
  CloseGuard 
} from 'angular2-modal';

import { StructureEntityService } from '../../structure-entity/structure-entity.service';
import { StructureEntity } from '../../structure-entity/structure-entity';
import { TechnicalRequirement } from '../technical-requirement';
import { RemoveTechnicalRequirementModelContext } from './remove-tech-requirement-context';

@Component({
  selector: 'app-remove-tech-requirement-modal',
  templateUrl: './remove-tech-requirement-modal.component.html',
  styleUrls: ['./remove-tech-requirement-modal.component.css']
})
export class RemoveTechRequirementModalComponent implements CloseGuard, ModalComponent<RemoveTechnicalRequirementModelContext> {

  context: RemoveTechnicalRequirementModelContext;

  public condition: string;
  public text: string;
  public reason: string;

  constructor(
    public dialog: DialogRef<RemoveTechnicalRequirementModelContext>,
    private structureEntityService: StructureEntityService
  ) {
    this.context = dialog.context;
    let entity = this.structureEntityService.entityById(this.context.key.entityId);
    let req = entity.getTechnicalRequirement(this.context.key.id);
    this.condition = req.condition;
    this.text = req.text;
    this.reason = req.reason;

    dialog.setCloseGuard(this);
  }

  beforeDismiss(): boolean {
    return true;
  }

  // Должно вернуть false, чтобы окно закрылось
  beforeClose(): boolean {
    return false;
  }

  onSubmit() {

    let entity = this.structureEntityService.entityById(this.context.key.entityId);
    entity.removeTechnicalRequirement(this.context.key.id);
    
    this.dialog.close();

  }
  
  onCancel() {
    this.dialog.close();
  }

}
