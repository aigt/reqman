export class StructureListItem {
  constructor(
    public id: number, 
    public name: string,
    public childrenIds: number[]
  ) {}
}