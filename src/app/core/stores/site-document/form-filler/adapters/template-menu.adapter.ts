import { Store, StoreDef } from "@ngneat/elf";
import { entitiesPropsFactory, selectAllEntities, setEntities } from "@ngneat/elf-entities";
import { pipeTap } from "src/app/shared/rxjs";

export interface TemplateMenuItem {
  Id: number;
  Title: string;
  SiteDocumentType: number;
  RevNo: number;
}

const { templateMenuEntitiesRef, withTemplateMenuEntities } = entitiesPropsFactory("templateMenu");

export { withTemplateMenuEntities }

export function templateMenuAdapter(store: Store<StoreDef>) {
  return {
    selectTemplateMenu: () => store.pipe(selectAllEntities({ ref: templateMenuEntitiesRef })),
    setTemplateMenu: pipeTap<TemplateMenuItem[]>(templates => store.update(setEntities(templates, { ref: templateMenuEntitiesRef })))
  }
}