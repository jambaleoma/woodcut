import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartaForbiceSassoSpockLizardPage } from './carta-forbice-sasso-spock-lizard.page';

describe('CartaForbiceSassoSpockLizardPage', () => {
  let component: CartaForbiceSassoSpockLizardPage;
  let fixture: ComponentFixture<CartaForbiceSassoSpockLizardPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaForbiceSassoSpockLizardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartaForbiceSassoSpockLizardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
