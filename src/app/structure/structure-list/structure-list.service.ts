import { Injectable, EventEmitter } from '@angular/core';

import { StructureListItem } from './structure-list-item';


@Injectable()
export class StructureListService {

  // временный контейнер дэйты, пока нет бэкенда
  items: StructureListItem[] = [
    new StructureListItem(0, 'root', [1, 4]),
    new StructureListItem(1, 'Робот', [2, 3]),
    new StructureListItem(2, 'Втулка', []),
    new StructureListItem(3, 'Рука', []),
    new StructureListItem(4, 'Голова', [5, 6, 7]),
    new StructureListItem(5, 'Сенсор', []),
    new StructureListItem(6, 'Динамик', []),
    new StructureListItem(7, 'Кожух', [])
  ];

  addedItem: EventEmitter<StructureListItem> = new EventEmitter();
  onShowAddItemWindow: EventEmitter<any> = new EventEmitter();

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

  addItem(item: StructureListItem) {
    let newItem: StructureListItem = new StructureListItem(
      this.items.length, item.name, item.childrenIds.slice()
    );
    this.items.push(newItem);
    this.addedItem.emit(newItem);
  }

  showAddItemWindow() {
    
  }

}