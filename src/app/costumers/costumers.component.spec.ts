import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumersComponent } from './costumers.component';

describe('CustomersComponent', () => {
  let component: CostumersComponent;
  let fixture: ComponentFixture<CostumersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostumersComponent]
    });
    fixture = TestBed.createComponent(CostumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
