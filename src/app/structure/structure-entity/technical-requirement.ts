/** 
 * Техническое требование
 */
export class TechnicalRequirement {

  /**
   * Конструктор
   * @param text текст тех требования
   * @param condition условие, когда предъявляется тех требование
   * @param reason обоснование требования
   */
  constructor(
    public text: string,
    public condition: string,
    public reason: string
  ) {}

}