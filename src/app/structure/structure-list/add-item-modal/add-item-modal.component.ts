import { Component } from '@angular/core';

import { 
  DialogRef, 
  ModalComponent, 
  CloseGuard 
} from 'angular2-modal';

import { AddItemModelContext } from './add-item-modal-context';
import { StructureEntityService } from '../../structure-entity/structure-entity.service';
import { StructureEntity } from '../../structure-entity/structure-entity';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.css']
})
export class AddItemModalComponent implements CloseGuard, ModalComponent<AddItemModelContext> {
    context: AddItemModelContext;
  
    public name: string;
    public description: string;

    constructor(
      public dialog: DialogRef<AddItemModelContext>,
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
      this.structureEntityService.addEntity(
        new StructureEntity(0, this.name, this.description,[0]), 
        this.context.parentId
      );
      this.dialog.close();
    }
    
    onCancel() {
      this.dialog.close();
    }
}