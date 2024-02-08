import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartlistComponent } from './cartlist.component';

describe('CartlistComponent', () => {
  let component: CartlistComponent;
  let fixture: ComponentFixture<CartlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartlistComponent]
    });
    fixture = TestBed.createComponent(CartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
