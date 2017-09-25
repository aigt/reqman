import { Component } from '@angular/core';

import { 
  DialogRef, 
  ModalComponent, 
  CloseGuard 
} from 'angular2-modal';

import { AddItemModelContext } from './add-item-modal-context';
import { StructureListService } from '../structure-list.service';
import { StructureListItem } from '../structure-list-item';

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
      private structureListService: StructureListService
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
      this.structureListService.addItem(new StructureListItem(0, this.name, []));
      this.dialog.close();
    }
    
    onCancel() {
      this.dialog.close();
    }
}