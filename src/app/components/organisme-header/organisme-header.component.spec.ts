import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeHeaderComponent } from './organisme-header.component';

describe('OrganismeHeaderComponent', () => {
  let component: OrganismeHeaderComponent;
  let fixture: ComponentFixture<OrganismeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
