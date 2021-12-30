import axios from "axios";
import { ResponseMedia } from "../../types";
import { MediaQuery } from "../../graphql/queries/media/MediaQuery";

export const getMedia = async (id: number) => {
  const resp = await axios.post<ResponseMedia>("/", {
    query: MediaQuery,
    variables: { id },
  });

  return resp.data.data.Media;
};
