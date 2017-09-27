import { StructureListItem } from "../structure-list/structure-list-item";
import { TechnicalRequirement } from "./technical-requirement";
import { DesignRequirement } from "./design-requirement";

export class StructureEntity {

  technicalRequirements: TechnicalRequirement[] = [
    new TechnicalRequirement('тр1','условие1','обоснование1'),
    new TechnicalRequirement('тр2','условие2','обоснование2'),
    new TechnicalRequirement('тр3','условие3','обоснование3')
  ];
  designRequirements: DesignRequirement[] = [
    new TechnicalRequirement('тр1','условие1','обоснование1'),
    new TechnicalRequirement('тр2','условие2','обоснование2'),
    new TechnicalRequirement('тр3','условие3','обоснование3')
  ];

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