/** 
 * Ключ для идентификации технического требования
 */
export class TechnicalRequirementKey {
  
  /**
   * Конструктор
   * @param entityId Идентификатор сущности в которой содержится требование
   * @param id Уникальный, внутри сущности, идентификатор технического требования 
   */
  constructor(
    public entityId: number,
    public id: number
  ) { }
  
  }