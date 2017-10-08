import { Component, OnInit } from '@angular/core';

import { 
  DialogRef, 
  ModalComponent, 
  CloseGuard 
} from 'angular2-modal';

import { StructureEntityService } from '../../structure-entity/structure-entity.service';
import { StructureEntity } from '../../structure-entity/structure-entity';
import { EditItemModelContext } from './edit-item-modal-context';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.css']
})
export class EditItemModalComponent implements CloseGuard, ModalComponent<EditItemModelContext> {
  context: EditItemModelContext;
  
  public entity: StructureEntity;
  //public name: string;
  //public description: string;

  constructor(
    public dialog: DialogRef<EditItemModelContext>,
    private structureEntityService: StructureEntityService
  ) {
    this.context = dialog.context;
    this.entity = structureEntityService.entityById(this.context.id).getCopy();
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
    this.structureEntityService.updateEntity(this.entity);
    this.dialog.close();
  }
  
  onCancel() {
    this.dialog.close();
  }
}
