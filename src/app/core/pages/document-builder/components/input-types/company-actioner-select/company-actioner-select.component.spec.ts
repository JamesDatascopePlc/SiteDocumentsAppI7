import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CompanyActionerSelectComponent } from './company-actioner-select.component';
import { WaitForSelector, createWaitForSelector } from 'src/app/shared/testing/wait-for';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CompanyActionerSelectComponent', () => {
  let spectator: Spectator<CompanyActionerSelectComponent>;
  let waitForSelector: WaitForSelector;
  const createComponent = createComponentFactory({
    component: CompanyActionerSelectComponent,
    providers: [
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    waitForSelector = createWaitForSelector(spectator);
  });

  it("should show default title", async () => {
    const title = await waitForSelector("ion-card-title");
    expect(title.textContent).toBe("Company Actioners");
  });
});