import { Spectator, createHostFactory } from '@ngneat/spectator';
import { createWaitForSelector } from '../../testing/wait-for';
import { IfComponent } from './if.component';

describe('IfComponent', () => {
  let spectator: Spectator<IfComponent>;
  const createHost = createHostFactory(IfComponent);

  it("should show target element and not show else element if condition is true", async () => {
    spectator = createHost(`
      <if [condition]="true">
        <div show></div>
        <div else></div>
      </if>
    `);

    const waitForSelector = createWaitForSelector(spectator);
    await waitForSelector("div[show]");

    expect(spectator.query("div[show]")).toBeTruthy();
    expect(spectator.query("div[else]")).toBeFalsy();
  });

  it("should show target element and not show else element if condition is true", async () => {
    spectator = createHost(`
      <if [condition]="false">
        <div show></div>
        <div else></div>
      </if>
    `);

    const waitForSelector = createWaitForSelector(spectator);
    await waitForSelector("div[else]");

    expect(spectator.query("div[else]")).toBeTruthy();
    expect(spectator.query("div[show]")).toBeFalsy();
  });
});
