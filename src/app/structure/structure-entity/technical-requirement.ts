import { TechnicalRequirementKey } from "./technical-requirement-key";

/** 
 * Техническое требование
 */
export class TechnicalRequirement {

  /**
   * Конструктор
   * @param key идентификатор тех требования
   * @param text текст тех требования
   * @param condition условие, когда предъявляется тех требование
   * @param reason обоснование требования
   */
  constructor(
    public key: TechnicalRequirementKey,
    public text: string,
    public condition: string,
    public reason: string
  ) { }

}