import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmExampleComponent } from './agm-example.component';

describe('AgmExampleComponent', () => {
  let component: AgmExampleComponent;
  let fixture: ComponentFixture<AgmExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgmExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgmExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
