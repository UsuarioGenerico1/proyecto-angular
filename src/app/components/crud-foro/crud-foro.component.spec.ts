import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudForoComponent } from './crud-foro.component';

describe('CrudForoComponent', () => {
  let component: CrudForoComponent;
  let fixture: ComponentFixture<CrudForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudForoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
