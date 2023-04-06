import { Injectable } from "@angular/core";
import { createStore, setProp, withProps } from "@ngneat/elf";

const store = createStore(
  { name: "live-queues" },
  withProps<{ hideEmptyQueues: boolean }>({
    hideEmptyQueues: false
  })
);

const toggleHideEmptyQueues = () => store.update(
  setProp("hideEmptyQueues", prop => !prop)
);

@Injectable({ providedIn: "root" })
export class LiveQueuesStore {
  
}
