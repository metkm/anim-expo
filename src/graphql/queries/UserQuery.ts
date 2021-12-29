export const UserQuery = `query UserQuery($id: Int) {
  User(id: $id) {
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
}`

export default UserQuery;
