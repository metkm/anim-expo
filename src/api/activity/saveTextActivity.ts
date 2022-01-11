import axios from "axios";
import { TextActivityObject } from "../objectTypes";

export const saveTextActivityQuery = `mutation SaveTextActivity($text: String) {
  SaveTextActivity(text: $text) {
    id
  }
}`

interface SaveTextActivityResponse {
  data: {
    SaveTextActivity: TextActivityObject
  }
}

export const saveTextActivity = async (text: string) => {
  await axios.post<SaveTextActivityResponse>("/", {
    query: saveTextActivityQuery,
    variables: {
      text
    }
  })
}
