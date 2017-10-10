import { Component } from '@angular/core';

import { 
  DialogRef, 
  ModalComponent, 
  CloseGuard 
} from 'angular2-modal';

import { StructureEntityService } from '../../structure-entity/structure-entity.service';
import { StructureEntity } from '../../structure-entity/structure-entity';
import { TechnicalRequirement } from '../technical-requirement';
import { EditTechnicalRequirementModelContext } from './edit-tech-requirement-modal-context';

@Component({
  selector: 'app-edit-tech-requirement-modal',
  templateUrl: './edit-tech-requirement-modal.component.html',
  styleUrls: ['./edit-tech-requirement-modal.component.css']
})
export class EditTechRequirementModalComponent implements CloseGuard, ModalComponent<EditTechnicalRequirementModelContext> {

  context: EditTechnicalRequirementModelContext;
  
  public condition: string;
  public text: string;
  public reason: string;

  constructor(
    public dialog: DialogRef<EditTechnicalRequirementModelContext>,
    private structureEntityService: StructureEntityService
  ) {
    this.context = dialog.context;
    this.condition = this.context.requirement.condition;
    this.text = this.context.requirement.text;
    this.reason = this.context.requirement.reason;

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

    this.context.requirement.condition = this.condition;
    this.context.requirement.text = this.text;
    this.context.requirement.reason = this.reason;
    
    this.dialog.close();
  }
  
  onCancel() {
    this.dialog.close();
  }

}
