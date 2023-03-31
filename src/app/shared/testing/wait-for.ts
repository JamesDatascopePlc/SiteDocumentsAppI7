import { DOMSelector, Spectator } from "@ngneat/spectator";

export type WaitForSelector = (selector: string | DOMSelector) => Promise<Element>;

export function createWaitForSelector<T>(spectator: Spectator<T>): WaitForSelector {
  return (selector: string | DOMSelector) => {    
    return new Promise(resolve => {
      let element = spectator.query(selector);
      
      if (element != null)
        return resolve(element);

      const observer = new MutationObserver(() => {
        element = spectator.query(selector);
  
        if (element != null) {
          resolve(element);
          observer.disconnect();
        }
      });

      observer.observe(spectator.element, {
        childList: true,
        subtree: true
      });
    })
  }
}