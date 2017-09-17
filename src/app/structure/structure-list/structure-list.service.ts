import { Injectable } from '@angular/core';
import { StructureListItem } from './structure-list-item';


@Injectable()
export class StructureListService {

  // временный контейнер дэйты, пока нет бэкенда
  items: StructureListItem[] = [
    new StructureListItem(0, 'root', [1, 4]),
    new StructureListItem(1, 'construction1', [2, 3]),
    new StructureListItem(2, 'construction12', []),
    new StructureListItem(3, 'construction13', []),
    new StructureListItem(4, 'construction4', [5, 6, 7]),
    new StructureListItem(5, 'construction45', []),
    new StructureListItem(6, 'construction46', []),
    new StructureListItem(7, 'construction47', [])
  ];

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

}