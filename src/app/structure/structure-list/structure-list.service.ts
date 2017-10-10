import { Injectable, EventEmitter } from '@angular/core';

import { StructureListItem } from './structure-list-item';


@Injectable()
export class StructureListService {

  // временный контейнер дэйты, пока нет бэкенда
  items: StructureListItem[] = [
    new StructureListItem(0, 'root', []),
  ];

  addedItem: EventEmitter<StructureListItem> = new EventEmitter();
  updatedItem: EventEmitter<StructureListItem> = new EventEmitter();
  removedItem: EventEmitter<StructureListItem> = new EventEmitter();

  constructor(  ) { }

  /**
   * Возвращает список дочерних элементов для элемента
   * с указанным id
   * @param itemId id для поиска дочерних элементов
   */
  childrenFor(itemId: number): StructureListItem[] {
    
    // получаем список id дочерних элементов
    let childrenIds: number[] = this.items.find(
      (item: StructureListItem) => { return item.id === itemId; }
    ).childrenIds;
    
    // отфильтровываем все элементы не содержащиеся в полученном списке
    return this.items.filter(
      (item: StructureListItem) => { return childrenIds.includes(item.id); }
    );

  }

  getItemForId(id: number): StructureListItem {

    return this.items.find(
      (item: StructureListItem) => item.id === id
    );
    
  }

  /**
   * Добавляет элемент в список
   * @param item элемент для добавления, id будет автоматически заменён
   * @param parentId Id родительского элемента
   */
  addItem(item: StructureListItem, parentId: number) {

    let newItem: StructureListItem = new StructureListItem(
      this.items.length, item.name, item.childrenIds.slice()
    );

    // добавляем элемент в список
    this.items.push(newItem);

    // регестрируем элемент в родительском элементе
    this.getItemForId(parentId).childrenIds.push(newItem.id);
    
    // уведомление об изменениях
    this.addedItem.emit(newItem);

  }

  updateItem(item: StructureListItem) {
    let index = this.items.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.items[index] = item;

      // уведомление об изменениях
      this.updatedItem.emit(item);
    }
    else {
      throw new Error(`Элемента с индексом ${index} не существует`);
    }
  }

  removeItem(item: StructureListItem, removeCildren: boolean) {
    let index = this.items.findIndex(i => i.id === item.id);
    if (index > -1) {
      if (removeCildren) {
        this.items[index].childrenIds.forEach(childId => {
          let itemToDelete = this.getItemForId(childId);
          this.removeItem(itemToDelete, true);
        });
      }
      this.items.splice(index, 1);

      // уведомление об изменениях
      this.removedItem.emit(item);
    }
    else {
      throw new Error(`Элемента с индексом ${index} не существует`);
    }
  }

}