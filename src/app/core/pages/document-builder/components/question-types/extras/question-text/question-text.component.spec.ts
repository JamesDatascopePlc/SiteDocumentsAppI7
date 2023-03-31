import { createHostFactory, Spectator } from '@ngneat/spectator';
import { QuestionTextComponent } from './question-text.component';

describe('QuestionTextComponent', () => {
  let spectator: Spectator<QuestionTextComponent>;
  const createHost = createHostFactory(QuestionTextComponent);

  it("should show question text without required asterisk", async () => {
    spectator = createHost(`
      <question-text>
        Test Question 123
      </question-text>
    `);
    
    expect(spectator.query("ion-label")).toHaveText("Test Question 123");
    expect(spectator.query("span.text-red-700")).toBeFalsy();
  });

  it("should show question text with required asterisk", async () => {
    spectator = createHost(`
      <question-text [required]="true">
        Test Question 123
      </question-text>
    `);
    
    expect(spectator.query("ion-label")).toHaveText("Test Question 123");
    expect(spectator.query("span.text-red-700")).toHaveText("*");
  });
});
