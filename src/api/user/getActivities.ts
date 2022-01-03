import axios from "axios";
import activitiesQuery from "../../graphql/queries/ActivitiesQuery";
import { ResponseActivities } from "../../types/responses";

export const getActivities = async (userId: number, page: number) => {
  const resp = await axios.post<ResponseActivities>("/", {
    query: activitiesQuery,
    variables: {
      id: userId,
      page: page,
    },
  });

  return resp.data.data.Page.activities;
};
