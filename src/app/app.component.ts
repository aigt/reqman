import { Component, OnInit } from '@angular/core';
import { StructureEntityService } from './structure/structure-entity/structure-entity.service';
import { StructureEntity } from './structure/structure-entity/structure-entity';
import { TechnicalRequirement } from './structure/structure-entity/technical-requirement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Управление требованиями';

  constructor(
    private structureEntityService: StructureEntityService
  ) { }

  ngOnInit() {
    let id1 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Сборка', 'Сборочная конструкция', [], this.structureEntityService), 
      0
    );
    let id1_e: StructureEntity = this.structureEntityService.entityById(id1);
    id1_e.createAndAddTechnicalRequirement('*Размер для справок.', 'Используются справочные размеры', '');
    id1_e.createAndAddTechnicalRequirement('Неуказанные предельные отклонения ±__ мм.', 'На чертеже имеются неуказанные отклонения', '');

    let id11 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Бак', 'Бак трансформатора', [], this.structureEntityService), 
      id1
    );

    let id111 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Часть верхняя', 'Верхняя часть бака с верхним разъёмом', [], this.structureEntityService), 
      id11
    );

    let id112 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Часть нижняя', 'Нижняя часть бака с верхним разъёмом', [], this.structureEntityService), 
      id11
    );

    let id113 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Бак с верхним разъёмом', 'Бак со съёмной крышкой', [], this.structureEntityService), 
      id11
    );

    let id12 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Крышка', 'Крышка трансформатора', [], this.structureEntityService), 
      id1
    );

    let id121 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Верхнего разъёма', 'Крышка трансформатора с верхним разъёмом', [], this.structureEntityService), 
      id12
    );

    let id1211 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'С креплениями АЧ', 'Крышка трансформатора с верхним разъёмом с креплением АЧ', [], this.structureEntityService), 
      id121
    );

    let id122 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Нижнего разъёма', 'Крышка трансформатора с нижним разъёмом', [], this.structureEntityService), 
      id12
    );

    let id2 = this.structureEntityService.addEntity(
      new StructureEntity(-1, 'Детали', 'Детали', [], this.structureEntityService), 
      0
    );
    let id2_e: StructureEntity = this.structureEntityService.entityById(id2);
    id2_e.createAndAddTechnicalRequirement('*Размер для справок.', 'Используются справочные размеры', '');
    id2_e.createAndAddTechnicalRequirement('Неуказанные предельные отклонения ±__ мм.', 'На чертеже имеются неуказанные отклонения', '');
    id2_e.createAndAddTechnicalRequirement('Общие допуски формы и расположения по ГОСТ ####.', '', 'По просьбе технологов');

  }


  /** временный контейнер дэйты, пока нет бэкенда */ 
  // items: StructureEntity[] = [
  //   new StructureEntity(0, 'root', 'Корневой элемент', [], this),
  //   new StructureEntity(1, 'Робот', 'Глобальная конструкция', [0], this),
  //   new StructureEntity(2, 'Втулка', 'Втулка с резьбой эмалерованная', [0, 1], this),
  //   new StructureEntity(3, 'Рука', 'Для манипуляций', [0, 1], this),
  //   new StructureEntity(4, 'Голова', 'Модуль для робота', [0], this),
  //   new StructureEntity(5, 'Сенсор', 'Служит "глазами"', [0, 4], this),
  //   new StructureEntity(6, 'Динамик', 'Через него говорит', [0, 4], this),
  //   new StructureEntity(7, 'Кожух', 'Для защиты', [0, 4], this)
  // ];

}
