import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnModalComponent } from './vtn-modal.component';

describe('VtnModalComponent', () => {
  let component: VtnModalComponent;
  let fixture: ComponentFixture<VtnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VtnModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VtnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});