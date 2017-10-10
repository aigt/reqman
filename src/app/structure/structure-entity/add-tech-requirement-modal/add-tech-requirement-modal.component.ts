import { Component } from '@angular/core';

import { 
  DialogRef, 
  ModalComponent, 
  CloseGuard 
} from 'angular2-modal';

import { StructureEntityService } from '../../structure-entity/structure-entity.service';
import { StructureEntity } from '../../structure-entity/structure-entity';
import { AddTechnicalRequirementModelContext } from './add-tech-requirement-modal-context';
import { TechnicalRequirement } from '../technical-requirement';

@Component({
  selector: 'app-add-tech-requirement-modal',
  templateUrl: './add-tech-requirement-modal.component.html',
  styleUrls: ['./add-tech-requirement-modal.component.css']
})
export class AddTechRequirementModalComponent implements CloseGuard, ModalComponent<AddTechnicalRequirementModelContext> {

  context: AddTechnicalRequirementModelContext;
  
  public condition: string;
  public text: string;
  public reason: string;

  constructor(
    public dialog: DialogRef<AddTechnicalRequirementModelContext>,
    private structureEntityService: StructureEntityService
  ) {
    this.context = dialog.context;
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

    if(!this.text) {
      alert("текст не может быть пустым!");
      return;
    }

    this.context.toEntity.createAndAddTechnicalRequirement(
      this.text,
      this.condition,
      this.reason
    );

    this.dialog.close();
    
  }
  
  onCancel() {
    this.dialog.close();
  }

}
