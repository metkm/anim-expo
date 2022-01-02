import axios from "axios";
import CharacterQuery from "../../graphql/queries/CharacterQuery";
import { ResponseCharacter } from "../../types";

export const getCharacter = async (id: number) => {
  const resp = await axios.post<ResponseCharacter>("/", {
    query: CharacterQuery,
    variables: {
      id
    }
  });

  return resp.data.data.Character;
}
