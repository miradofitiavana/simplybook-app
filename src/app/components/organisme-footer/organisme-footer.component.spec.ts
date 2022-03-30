import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeFooterComponent } from './organisme-footer.component';

describe('OrganismeFooterComponent', () => {
  let component: OrganismeFooterComponent;
  let fixture: ComponentFixture<OrganismeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismeFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
