import { StructureListItem } from "../structure-list/structure-list-item";

export class StructureEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public structurePathIds: number[]
  ) {}
}