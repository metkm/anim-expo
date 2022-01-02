export const ViewerQuery = `{
  Viewer {
    id
    name
    bannerImage
    options {
      profileColor
    }
    avatar {
      large
    }
    statistics {
      anime {
        count
        minutesWatched
        meanScore
      }
      manga {
        count
        chaptersRead
        meanScore
      }
    }
  }
}`;

export default ViewerQuery;
