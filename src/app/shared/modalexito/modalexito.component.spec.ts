import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalexitoComponent } from './modalexito.component';

describe('ModalexitoComponent', () => {
  let component: ModalexitoComponent;
  let fixture: ComponentFixture<ModalexitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalexitoComponent]
    });
    fixture = TestBed.createComponent(ModalexitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
