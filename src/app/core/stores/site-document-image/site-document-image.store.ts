import { Injectable } from "@angular/core";
import { createStore } from "@ngneat/elf";
import { addEntities, deleteEntitiesByPredicate, selectAllEntitiesApply, withEntities } from "@ngneat/elf-entities";
import { SiteDocument, SiteDocumentImage } from "../site-document/models/site-document.model";

const store = createStore(
  { name: "site-document-image" }, 
  withEntities<SiteDocumentImage, "DocumentId">({ idKey: "DocumentId" })
);

@Injectable({ providedIn: "root" })
export class SiteDocumentImageStore {
  useImages(document: SiteDocument) {
    return [
      store.pipe(
        selectAllEntitiesApply({
          filterEntity: e => e.DocumentId === document.DocumentID
        })
      ),
      
      (images: string[]) => store.update(
        deleteEntitiesByPredicate(e => e.DocumentId === document.DocumentID),
        addEntities(images.map((img, idx) => 
          ({
            DocumentId: document.DocumentID,
            DocumentSubmissionId: 1,
            Base64: img,
            ImageNo: idx
          })
        ))
      )
    ]
  }
}
