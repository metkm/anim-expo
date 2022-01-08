import axios from "axios";
import SaveMediaListEntry from "../../graphql/mutations/SaveMediaListEntry";
import { ResponseMediaListEntryMutation } from "../../types";

export const mutateMediaListEntry = async (variables: {}) => {
  const resp = await axios.post<ResponseMediaListEntryMutation>("/", {
    query: SaveMediaListEntry,
    variables
  });

  return resp.data.data.SaveMediaListEntry.media;
}
