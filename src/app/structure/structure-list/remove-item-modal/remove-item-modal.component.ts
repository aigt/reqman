import { Component } from '@angular/core';

import { 
  DialogRef, 
  ModalComponent, 
  CloseGuard 
} from 'angular2-modal';

import { StructureEntityService } from '../../structure-entity/structure-entity.service';
import { StructureEntity } from '../../structure-entity/structure-entity';
import { RemoveItemModelContext } from './remove-item-modal-context';

@Component({
  selector: 'app-remove-item-modal',
  templateUrl: './remove-item-modal.component.html',
  styleUrls: ['./remove-item-modal.component.css']
})
export class RemoveItemModalComponent implements CloseGuard, ModalComponent<RemoveItemModelContext> {

  context: RemoveItemModelContext;
  
  public entity: StructureEntity;

  constructor(
    public dialog: DialogRef<RemoveItemModelContext>,
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
    this.structureEntityService.removeEntity(this.entity);
    this.dialog.close();
  }
  
  onCancel() {
    this.dialog.close();
  }

}
