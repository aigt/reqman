import { StructureListItem } from "../structure-list/structure-list-item";
import { TechnicalRequirement } from "./technical-requirement";
import { DesignRequirement } from "./design-requirement";
import { Injectable } from "@angular/core";
import { StructureEntityService } from "./structure-entity.service";

export class StructureEntity {

  technicalRequirements: TechnicalRequirement[] = [
    new TechnicalRequirement('Exercitation reprehenderit ullamco amet mollit enim exercitation id consequat voluptate eiusmod. Velit nulla do aute aliquip magna mollit exercitation id et ut ullamco officia sunt consectetur. Non culpa ipsum nostrud incididunt culpa.','Irure consectetur consectetur excepteur esse consectetur ea excepteur qui exercitation enim laborum reprehenderit tempor deserunt. Sint occaecat ullamco tempor veniam voluptate duis ut nulla in aute. Culpa culpa sit enim et minim. Laborum anim minim ipsum occaecat est sint excepteur nostrud. Esse irure labore quis non do ex pariatur anim aliqua est et labore. Adipisicing officia minim consequat ad commodo laboris reprehenderit aute incididunt deserunt non fugiat eiusmod.','Fugiat voluptate dolore magna laboris cupidatat ad magna non culpa Lorem dolor. Aute est eu magna deserunt eu mollit non. Ullamco proident qui ullamco tempor do. Deserunt nostrud amet amet sint anim cillum velit cillum irure pariatur aute.'),
    new TechnicalRequirement('Aliquip officia laboris veniam enim proident est consequat laboris anim Lorem. Ad enim dolor aute nostrud laboris voluptate anim velit deserunt quis ipsum sunt elit. Anim tempor ex est consequat sunt dolore commodo est Lorem culpa incididunt fugiat aliqua cillum. Do cillum dolore velit est. Et do aute est cillum elit elit ipsum non.','Tempor et incididunt duis mollit elit et culpa duis amet irure cillum consequat Lorem adipisicing. Enim consequat laborum laboris id nulla Lorem veniam nisi cillum consectetur anim occaecat. Irure laborum do nisi mollit laboris ad eu excepteur duis ipsum ipsum enim velit. Nulla sint reprehenderit aliquip veniam. Veniam irure consequat ipsum dolore labore eu enim. Sit ullamco nostrud culpa officia pariatur.','Adipisicing nulla adipisicing officia ea magna nostrud id irure esse minim excepteur. Ut cillum excepteur labore ut. Sint culpa tempor cupidatat et sunt officia ad Lorem. Aute duis deserunt qui tempor. Ipsum proident amet amet culpa. Voluptate est sint tempor enim.'),
    new TechnicalRequirement('Reprehenderit proident ex proident mollit non laboris ut. Eu tempor ea est amet mollit velit ad. Ut sint mollit nostrud non duis culpa tempor incididunt do labore velit excepteur Lorem. Tempor duis veniam officia consectetur commodo. Nostrud voluptate consectetur ut reprehenderit nostrud. Voluptate non cupidatat incididunt occaecat eu esse sint est exercitation labore.','Aliquip cupidatat commodo labore ea minim proident voluptate culpa Lorem velit aliquip. Pariatur esse id magna consequat et laboris esse nulla esse anim tempor ex eu amet. Occaecat officia eiusmod tempor ullamco reprehenderit tempor aliqua. Proident dolore tempor sunt ad sint veniam nisi voluptate labore sint cupidatat est veniam laboris. Nisi nulla ullamco sunt fugiat minim ullamco in. Non consectetur esse sunt voluptate dolor ex sit consectetur. Sunt consequat ipsum nostrud sunt aliquip irure tempor mollit nulla anim ad aliquip exercitation.','Esse ad dolor consequat est exercitation anim laborum magna cupidatat id culpa magna quis. Ipsum ipsum reprehenderit deserunt quis id pariatur velit deserunt sunt labore. Occaecat officia amet et cillum ut duis duis. Fugiat eu ullamco minim deserunt occaecat magna laborum exercitation et. Ipsum sunt cupidatat Lorem reprehenderit voluptate sunt voluptate incididunt elit do incididunt. Incididunt est sint consectetur incididunt fugiat qui minim exercitation consectetur et consectetur. Fugiat sit amet esse dolore ullamco voluptate ex sit adipisicing velit aliqua fugiat velit.')
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

  getAllTechnicalRequirements(): TechnicalRequirement[] {
    return [...this.technicalRequirements, ...this.getParentTechnicalRequirements()];
  }

}