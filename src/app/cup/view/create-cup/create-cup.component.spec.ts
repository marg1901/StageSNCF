import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCupComponent } from './create-cup.component';

describe('CreateCupComponent', () => {
  let component: CreateCupComponent;
  let fixture: ComponentFixture<CreateCupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
