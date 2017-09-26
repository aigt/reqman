import { StructureListItem } from "../structure-list/structure-list-item";

export class StructureEntity {

  /**
   * Конструктор
   * @param id Id сущности
   * @param name Наименование сущности
   * @param description Описание
   * @param structurePathIds Путь до данной сущности в иерархии структурного 
   * листа, начиная с корня
   */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public structurePathIds: number[]
  ) {}

  /**
   * Возвращает копию данной сущности
   */
  getCopy() {
    return new StructureEntity(
      this.id,
      this.name,
      this.description,
      this.structurePathIds.slice()
    )
  }

}