import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { TechnicalRequirement } from '../technical-requirement';

export class EditTechnicalRequirementModelContext extends BSModalContext {
  public requirement: TechnicalRequirement;
}