import { StructureListItem } from "../structure-list/structure-list-item";
import { TechnicalRequirement } from "./technical-requirement";
import { DesignRequirement } from "./design-requirement";
import { Injectable } from "@angular/core";
import { StructureEntityService } from "./structure-entity.service";
import { TechnicalRequirementKey } from "./technical-requirement-key";

export class StructureEntity {

  technicalRequirements: TechnicalRequirement[] = [];
  // designRequirements: DesignRequirement[] = [
  //   new TechnicalRequirement('тр1','условие1','обоснование1'),
  //   new TechnicalRequirement('тр2','условие2','обоснование2'),
  //   new TechnicalRequirement('тр3','условие3','обоснование3')
  // ];

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
  ) { }

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

  getAllTechnicalRequirements(): TechnicalRequirement[] {
    return [...this.technicalRequirements, ...this.getParentTechnicalRequirements()];
  }

  isTechnicalRequirementIdUnique(id): boolean {

    let index: number = this.technicalRequirements.findIndex((req) => {
      return req.key.id === id;
    });

    return index === -1;

  }

  generateTechnicalRequirementKey(): TechnicalRequirementKey {

    // Идентификатор, который не должен совпадать с индетификаторами
    // других требований
    let id: number;

    // Генерируем новый идентификатор
    let index: number = 1;
    do {
      id = Math.floor(Math.random() * Number.MAX_VALUE + 1);
    } while ( !this.isTechnicalRequirementIdUnique(id) )

    return new TechnicalRequirementKey(this.id, id);

  }

  addTechnicalRequirement(req: TechnicalRequirement) {

    // Проверяем ключ на валидность
    if(
      req.key == null ||
      req.key.entityId !== this.id || 
      !this.isTechnicalRequirementIdUnique(req.key.id)
    ) {
      // Если что-то не так выдаём новый
      req.key = this.generateTechnicalRequirementKey();
    }

    // Добавляем требование в список
    this.technicalRequirements.push(req);

  }

  /**
   * Создаёт и добавляет тех требование с заданнымим условиями
   * @param text текст тех требования
   * @param condition условие, когда предъявляется тех требование
   * @param reason обоснование требования
   */
  createAndAddTechnicalRequirement(
    text: string,
    condition: string,
    reason: string
  ) {

    // создаём тех требование, ключ присвоится при добавлении
    let req = new TechnicalRequirement(null, text, condition, reason);
    this.addTechnicalRequirement(req);

  }

  removeTechnicalRequirement(id) {
    let index = this.technicalRequirements.findIndex(req => req.key.id === id);
    if(index > -1) {
      this.technicalRequirements.splice(index, 1);
    }
  }

  getTechnicalRequirement(id) {
    let req = this.technicalRequirements.find(req => req.key.id === id);
    return req;
  }

}