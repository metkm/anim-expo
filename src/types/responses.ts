import {
  ActivityUnion,
  CharacterObject,
  MediaListCollectionObject,
  MediaListObject,
  MediaObject,
  UserObject,
  UserStatisticTypesObject,
} from ".";

export interface ResponseUser {
  data: {
    User: UserObject;
  };
}

export interface ResponseCharacter {
  data: {
    Character: CharacterObject;
  };
}

export interface ResponseMedia {
  data: {
    Media: MediaObject;
  };
}

export interface ResponseViewer {
  data: {
    Viewer: UserObject;
  };
}

export interface ResponseActivities {
  data: {
    Page: {
      activities: ActivityUnion[];
    };
  };
}

export interface ResponseUserStats {
  data: {
    User: {
      statistics: UserStatisticTypesObject;
    };
  };
}

export interface ResponseMediaListCollection {
  data: {
    MediaListCollection: MediaListCollectionObject;
  };
}

export interface ResponseBrowse {
  data: {
    trending: {
      media: MediaObject[];
    };
    season: {
      media: MediaObject[];
    };
    nextSeason: {
      media: MediaObject[];
    };
    popular: {
      media: MediaObject[];
    };
  };
}

export interface ResponseMediaListEntry {
  data: {
    Media: {
      mediaListEntry: MediaListObject
    }
  }
}
