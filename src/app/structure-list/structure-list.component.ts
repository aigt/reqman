import { Component, OnInit, Output } from '@angular/core';
import { StructureService } from './structure.service';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.css'],
  providers: [ StructureService ]
})
export class StructureListComponent implements OnInit {
  @Output() gg: string = `don't works`;

  constructor(private structureService: StructureService) { }

  ngOnInit() {
    this.gg = this.structureService.childrenFor('');
  }

}
