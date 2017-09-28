import { StructureListItem } from "../structure-list/structure-list-item";
import { TechnicalRequirement } from "./technical-requirement";
import { DesignRequirement } from "./design-requirement";
import { Injectable } from "@angular/core";
import { StructureEntityService } from "./structure-entity.service";

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
    public structurePathIds: number[],
    private structureEntityService: StructureEntityService
  ) {}

  /**
   * Возвращает копию данной сущности
   */
  getCopy(): StructureEntity {
    return new StructureEntity(
      this.id,
      this.name,
      this.description,
      this.structurePathIds.slice(),
      this.structureEntityService
    )
  }

  getParentTechnicalRequirements(): TechnicalRequirement[] {
    let parentTechnicalRequirements: TechnicalRequirement[] =[];
    this.structurePathIds.forEach(id => {
      if(id === this.id) return;
      let parentEntity: StructureEntity = this.structureEntityService.entityById(id);
      parentTechnicalRequirements.push(...parentEntity.technicalRequirements);
    });
    return parentTechnicalRequirements;
  }

}