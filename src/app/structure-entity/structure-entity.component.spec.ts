import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureEntityComponent } from './structure-entity.component';

describe('StructureEntityComponent', () => {
  let component: StructureEntityComponent;
  let fixture: ComponentFixture<StructureEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
