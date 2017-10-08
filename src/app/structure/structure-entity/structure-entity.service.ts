import { Injectable, EventEmitter } from "@angular/core";
import { StructureEntity } from "./structure-entity";
import { StructureListItem } from "../structure-list/structure-list-item";
import { StructureListService } from "../structure-list/structure-list.service";

@Injectable()
export class StructureEntityService {

  /** временный контейнер дэйты, пока нет бэкенда */ 
  items: StructureEntity[] = [
    new StructureEntity(0, 'root', 'Корневой элемент', [], this),
    new StructureEntity(1, 'Робот', 'Глобальная конструкция', [0], this),
    new StructureEntity(2, 'Втулка', 'Втулка с резьбой эмалерованная', [0, 1], this),
    new StructureEntity(3, 'Рука', 'Для манипуляций', [0, 1], this),
    new StructureEntity(4, 'Голова', 'Модуль для робота', [0], this),
    new StructureEntity(5, 'Сенсор', 'Служит "глазами"', [0, 4], this),
    new StructureEntity(6, 'Динамик', 'Через него говорит', [0, 4], this),
    new StructureEntity(7, 'Кожух', 'Для защиты', [0, 4], this)
  ];

  changedEntity: EventEmitter<StructureEntity> = new EventEmitter();

  constructor(
    private structureListService: StructureListService
  ) {  }

  /**
   * Находит нужную сущность по id
   * @param id id для поиска
   */
  entityById(id: number) {
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

  addEntity(entity: StructureEntity, parentId: number) {
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
      throw new Error(`Сущности с индексом ${index} не существует`);
    }
  }
}