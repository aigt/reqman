/**
 * Требование к конструкции
 */
export class DesignRequirement {

  /**
   * Конструктор
   * @param text текст требования 
   * @param condition условие, когда предъявляется тех требование
   * @param reason обоснование требования
   */
  constructor(
    public text: string,
    public condition: string,
    public reason: string
  ) {}

}