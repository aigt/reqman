import { Injectable } from "@angular/core";
import { StructureEntity } from "./structure-entity";
import { StructureListItem } from "../structure-list/structure-list-item";
import { StructureListService } from "../structure-list/structure-list.service";

@Injectable()
export class StructureEntityService {

    // временный контейнер дэйты, пока нет бэкенда
    items: StructureEntity[] = [
      new StructureEntity(0, 'root', []),
      new StructureEntity(1, 'construction1', [0]),
      new StructureEntity(2, 'construction12', [0, 1]),
      new StructureEntity(3, 'construction13', [0, 1]),
      new StructureEntity(4, 'construction4', [0]),
      new StructureEntity(5, 'construction45', [0, 4]),
      new StructureEntity(6, 'construction46', [0, 4]),
      new StructureEntity(7, 'construction47', [0, 4])
    ];

    constructor(
      private structureListService: StructureListService
    ) {  }

    parentPathsStackForId(id: number, excludeRoot: boolean): StructureListItem[] {

      // находим нужную сущность по id
      const item = this.items.find(
        (item: StructureEntity) => item.id === id
      );

      return item.structurePathIds.filter(

        // если требуется отфильтровываем root
        (id: number) => {
          if(excludeRoot) {
            return id !== 0;
          }
          else {
            return true;
          }
        }

      ).map(
        (id: number) => this.structureListService.getItemForId(id)
      );
      
    }
}