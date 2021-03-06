import { Injectable, EventEmitter } from "@angular/core";
import { StructureEntity } from "./structure-entity";
import { StructureListItem } from "../structure-list/structure-list-item";
import { StructureListService } from "../structure-list/structure-list.service";

@Injectable()
export class StructureEntityService {

  /** временный контейнер дэйты, пока нет бэкенда */ 
  items: StructureEntity[] = [
    new StructureEntity(0, 'Добро пожаловать!', 'Выберите интересующуй элемент', [], this),
  ];

  changedEntity: EventEmitter<StructureEntity> = new EventEmitter();
  removedEntity: EventEmitter<StructureEntity> = new EventEmitter();

  constructor(
    private structureListService: StructureListService
  ) {  }

  /**
   * Находит нужную сущность по id
   * @param id id для поиска
   */
  entityById(id: number): StructureEntity {
    return this.items.find(
      (item: StructureEntity) => item.id === id
    );
  }

  /**
   * Возвращает стэк с элементами, которые находятся до данного элемента выше
   * в иерахии структур
   * @param id Id сущности
   * @param excludeRoot нужно ли исключить корневой элемент из результата
   */
  parentPathsStackForId(id: number, excludeRoot: boolean): StructureListItem[] {

    // находим нужную сущность по id
    const item = this.entityById(id);

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

  addEntity(entity: StructureEntity, parentId: number): number {
    // добавляяем сущность в список
    let newEntity: StructureEntity = entity.getCopy();
    newEntity.id = this.items.length;
    newEntity.structurePathIds = [...(this.entityById(parentId).structurePathIds), parentId];
    this.items.push(newEntity);

    // регестрируем с сервисе списка структуры
    this.structureListService.addItem(
      new StructureListItem(0, newEntity.name, []),
      parentId
    );

    return newEntity.id;
  }

  updateEntity(entity: StructureEntity) {
    let protoEntity: StructureEntity = entity.getCopy();

    let index = this.items.findIndex(entity => entity.id === protoEntity.id);
    if (index > -1) {
      this.items[index] = protoEntity;

      // регестрируем с сервисе списка структуры
      let slItem: StructureListItem = this.structureListService.getItemForId(protoEntity.id);
      slItem.name = protoEntity.name;
      this.structureListService.updateItem(slItem);

      this.changedEntity.emit(protoEntity);
    }
    else {
      throw new Error(`Сущности с id: ${protoEntity.id} не существует`);
    }
  }

  removeEntity(entity: StructureEntity) {

    let index = this.items.findIndex(e => e.id === entity.id);
    if (index > -1) {
      this.items.splice(index, 1);
      // удалить дочерние
      let slItem: StructureListItem = this.structureListService.getItemForId(entity.id);
      slItem.childrenIds.forEach(childId => {
        let entityToDelete = this.entityById(childId);
        this.removeEntity(entityToDelete);
      });

      // регестрируем с сервисе списка структуры
      slItem.name = entity.name;
      this.structureListService.removeItem(slItem, false);

      this.removedEntity.emit(entity);
    }
    else {
      throw new Error(`Сущности с id: ${entity.id} не существует`);
    }
  }

}