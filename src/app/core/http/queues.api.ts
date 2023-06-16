import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { dependencyTrack } from "src/app/shared/rxjs";

export interface UpdateDocMoveCommand {
  documentId: number,
  queueId: number,
  success: boolean,
  note: Nullable<string>,
  img64: Nullable<string>
}

export interface QueueMovedInfo {
  Message: string,
  MovedToQueueId: number
}

export const useQueuesApi = createApi({
  baseUrl: `${environment.siteDocsApi}/QueuesApi`,
  endpoints: ({ post }) => ({
    updateDocMove: post<QueueMovedInfo, UpdateDocMoveCommand>({ path: "UpdateDocMove" })
  })
});

export const useUpdateDocMove = memoize(() => {
  const { updateDocMove } = useQueuesApi();

  return dependencyTrack({
    fn: (params: UpdateDocMoveCommand) => updateDocMove(params)
  });
});