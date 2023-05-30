import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCupsComponent } from './search-cups.component';

describe('SearchCupsComponent', () => {
  let component: SearchCupsComponent;
  let fixture: ComponentFixture<SearchCupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
