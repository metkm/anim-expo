export interface AvatarObject {
  large: string;
  medium: string;
}

export type LikeableType = "THREAD" | "THREAD_COMMENT" | "ACTIVITY" | "ACTIVITY_REPLY";

export type UserTitleLanguage =
  | "ROMAJI"
  | "ENGLISH"
  | "NATIVE"
  | "ROMAJI_STYLISED"
  | "ENGLISH_STYLISED"
  | "NATIVE_STYLISED";

export type NotificationType =
  | "ACTIVITY_MESSAGE"
  | "ACTIVITY_REPLY"
  | "FOLLOWING"
  | "ACTIVITY_MENTION"
  | "THREAD_COMMENT_MENTION"
  | "THREAD_SUBSCRIBED"
  | "THREAD_COMMENT_REPLY"
  | "AIRING"
  | "ACTIVITY_LIKE"
  | "ACTIVITY_REPLY_LIKE"
  | "THREAD_LIKE"
  | "THREAD_COMMENT_LIKE"
  | "ACTIVITY_REPLY_SUBSCRIBED"
  | "RELATED_MEDIA_ADDITION"
  | "MEDIA_DATA_CHANGE"
  | "MEDIA_MERGE"
  | "MEDIA_DELETION";

export type ActivityType = "TEXT" | "ANIME_LIST" | "MANGA_LIST" | "MESSAGE" | "MEDIA_LIST";

export type UserStaffNameLanguage = "ROMAJI_WESTERN" | "ROMAJI" | "NATIVE";

export type LikeableUnion =
  | ListActivityObject
  | TextActivityObject
  | MessageActivityObject
  | ActivityReplyObject
  | ThreadObject
  | ThreadCommentObject;

export interface NotificationOptionObject {
  type: NotificationType;
  enabled: boolean;
}

export interface ThreadCategoryObject {
  id: number;
  name: string;
}

export interface ThreadCommentObject {
  id: number;
  userId: number;
  threadId: number;
  comment: string;
  likeCount: number;
  isLiked: boolean;
  siteUrl: string;
  createdAt: number;
  updatedAt: number;
  thread: ThreadObject;
  user: UserObject;
  likes: UserObject[];
  childComments: {};
  isLocked: boolean;
}

export interface ThreadObject {
  id: number;
  title: string;
  body: string;
  userId: number;
  replyUserId: number;
  replyCommentId: number;
  replyCount: number;
  viewCount: number;
  isLocked: boolean;
  isSticky: boolean;
  isSubscribed: boolean;
  likeCount: number;
  isLiked: boolean;
  repliedAt: number;
  createdAt: number;
  updatedAt: number;
  user: UserObject;
  replyUser: UserObject;
  likes: UserObject[];
  siteUrl: string;
  categories: ThreadCategoryObject[];
  mediaCategories: MediaObject[];
}

export interface UserOptionsObject {
  titleLanguage: UserTitleLanguage;
  displayAdultContent: boolean;
  airingNotifications: boolean;
  profileColor: string;
  notificationOptions: NotificationOptionObject[];
  timezone: string;
  activityMergeTime: number;
  staffNameLanguage: UserStaffNameLanguage;
}

export type ScoreFormat = "POINT_100" | "POINT_10_DECIMAL" | "POINT_10" | "POINT_5" | "POINT_3";

export interface MediaListTypeOptionsObject {
  sectionOrder: string[];
  splitCompletedSectionByFormat: boolean;
  customLists: string[];
  advancedScoring: string[];
  advancedScoringEnabled: boolean;
}

export interface MediaListOptionsObject {
  scoreFormat: ScoreFormat;
  rowOrder: string;
  animeList: MediaListTypeOptionsObject;
  mangaList: MediaListTypeOptionsObject;
}

export interface MediaTitleObject {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

export type MediaType = "ANIME" | "MANGA";
export type MediaFormat =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";
export type MediaStatus = "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
export type MediaSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
export type MediaSource =
  | "ORIGINAL"
  | "MANGA"
  | "LIGHT_NOVEL"
  | "VISUAL_NOVEL"
  | "VIDEO_GAME"
  | "OTHER"
  | "NOVEL"
  | "DOUJINSHI"
  | "ANIME"
  | "WEB_NOVEL"
  | "LIVE_ACTION"
  | "GAME"
  | "COMIC"
  | "MULTIMEDIA_PROJECT"
  | "PICTURE_BOOK";

export interface FuzzyDateObject {
  year: number;
  month: number;
  day: number;
}

export interface MediaTrailerObject {
  id: number;
  site: string;
  thumbnail: string;
}

export interface MediaCoverImageObject {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

export interface MediaTagObject {
  id: number;
  name: string;
  description: string;
  category: string;
  rank: number;
  isGeneralSpoiler: boolean;
  isMediaSpoiler: boolean;
  isAdult: boolean;
  userId: number;
}

export interface AiringScheduleObject {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
  mediaId: number;
  media: MediaObject;
}

export interface MediaTrendEdgeObject {
  node: MediaTrendObject;
}

export interface MediaTrendObject {
  mediaId: number;
  date: number;
  trending: number;
  averageScore: number;
  popularity: number;
  inProgress: number;
  releasing: boolean;
  episode: number;
  media: MediaType;
}

export interface AiringScheduleConnectionObject {
  edges: MediaTrendEdgeObject[];
  nodes: MediaTrendEdgeObject[];
  pageInfo: PageInfoObject;
}

export interface MediaTrendConnectionObject {
  edges: MediaTrendEdgeObject[];
  nodes: MediaTrendObject[];
  pageInfo: PageInfoObject;
}

export interface MediaExternalLinkObject {
  id: number;
  url: string;
  site: string;
}

export interface MediaStreamingEpisodeObject {
  title: string;
  thumbnail: string;
  url: string;
  site: string;
}

export type MediaRankType = "RATED" | "POPULAR";
export interface MediaRankObject {
  id: number;
  rank: number;
  type: MediaRankType;
  format: MediaFormat;
  year: number;
  season: MediaSeason;
  allTime: boolean;
  context: string;
}

export interface ReviewEdgeObject {
  node: ReviewObject;
}

export type ReviewRating = "NO_VODE" | "UP_VOTE" | "DOWN_VOTE";

export interface ReviewObject {
  id: number;
  userId: number;
  mediaId: number;
  mediaType: MediaType;
  summary: string;
  body: string;
  rating: number;
  ratingAmount: number;
  userRating: ReviewRating;
  score: number;
  private: boolean;
  siteUrl: string;
  createdAt: number;
  updatedAt: number;
  user: UserObject;
  media: MediaObject;
}

export interface ReviewConnectionObject {
  edges: ReviewEdgeObject[];
  nodes: ReviewObject;
  pageInfo: PageInfoObject;
}

export interface RecommendationEdgeObject {
  node: RecommendationObject;
}

export type RecommendationRating = "NO_RATING" | "RATE_UP" | "RATE_DOWN";
export interface RecommendationObject {
  id: number;
  rating: number;
  userRating: RecommendationRating;
  media: MediaObject;
  mediaRecommendation: MediaObject;
  user: UserObject;
}

export interface RecommendationConnectionObject {
  edges: RecommendationEdgeObject[];
  nodes: RecommendationObject[];
  pageInfo: PageInfoObject;
}

export interface ScoreDistributionObject {
  score: number;
  amount: number;
}

export type MediaListStatus = "CURRENT" | "PLANNING" | "COMPLETED" | "DROPPED" | "PAUSED" | "REPEATING";

export interface StatusDistributionObject {
  status: MediaListStatus;
  amount: number;
}

export interface MediaStatsObject {
  scoreDistribution: ScoreDistributionObject[];
  statusDistribution: StatusDistributionObject[];
}

export interface MediaListObject {
  id: number;
  userId: number;
  mediaId: number;
  status: MediaListStatus;
  score: number;
  progress: number;
  progressVolumes: number;
  repeat: number;
  priority: number;
  private: boolean;
  notes: string;
  hiddenFromStatusLists: boolean;
  customLists: object;
  advancedScores: object;
  startedAt: FuzzyDateObject;
  completedAt: FuzzyDateObject;
  updatedAt: number;
  createdAt: number;
  media: MediaObject;
  user: UserObject;
}

export interface MediaListGroupObject {
  entries: MediaListObject[];
  name: string;
  isCustomList: boolean;
  isSplitCompletedList: boolean;
  status: MediaListStatus;
}

export interface MediaListCollectionObject {
  lists: MediaListGroupObject[];
  user: UserObject;
  hasNextChunk: boolean;
}

export interface MediaObject {
  id: number;
  idMal: number;
  title: MediaTitleObject;
  type: MediaType;
  format: MediaFormat;
  status: MediaStatus;
  description: string;
  startDate: FuzzyDateObject;
  endDate: FuzzyDateObject;
  season: MediaSeason;
  seasonYear: number;
  seasonInt: number;
  episodes: number;
  duration: number;
  chapters: number;
  volumes: number;
  countryOfOrigin: string;
  isLicensed: boolean;
  source: MediaSource;
  hashtag: string;
  trailer: MediaTrailerObject;
  updatedAt: number;
  coverImage: MediaCoverImageObject;
  bannerImage: string;
  genres: string[];
  synonyms: string[];
  averageScore: number;
  meanScore: number;
  popularity: number;
  isLocked: boolean;
  trending: number;
  favourites: number;
  tags: MediaTagObject[];
  relations: MediaConnectionObject;
  characters: CharacterConnectionObject;
  staff: StaffConnectionObject;
  studios: StudioConnectionObject;
  isFavourite: boolean;
  isAdult: boolean;
  nextAiringEpisode: AiringScheduleObject;
  airingSchedule: AiringScheduleConnectionObject;
  trends: MediaTrendConnectionObject;
  externalLinks: MediaExternalLinkObject[];
  streamingEpisodes: MediaStreamingEpisodeObject[];
  rankings: MediaRankObject[];
  mediaListEntry: MediaListObject;
  reviews: ReviewConnectionObject;
  recommendations: RecommendationConnectionObject;
  stats: MediaStatsObject;
  siteUrl: string;
  autoCreateForumThread: boolean;
  isRecommendationBlocked: boolean;
  modNotes: string;
}

export type MediaRelation =
  | "ADAPTATION"
  | "PREQUEL"
  | "SEQUEL"
  | "PARENT"
  | "SIDE_STORY"
  | "CHARACTER"
  | "SUMMARY"
  | "ALTERNATIVE"
  | "SPIN_OFF"
  | "OTHER"
  | "SOURCE"
  | "COMPILATION"
  | "CONTAINS";

export interface CharacterNameObject {
  first: string;
  middle: string;
  last: string;
  full: string;
  native: string;
  alternative: string[];
  alternativeSpoiler: string[];
  userPreferred: string;
}

export interface CharacterImageObject {
  large: string;
  medium: string;
}

export interface CharacterObject {
  id: number;
  name: CharacterNameObject;
  image: CharacterImageObject;
  description: string;
  gender: string;
  dateOfBirth: FuzzyDateObject;
  age: string;
  bloodType: string;
  isFavourite: boolean;
  isFavouriteBlocked: boolean;
  siteUrl: string;
  media: MediaConnectionObject;
  favourites: number;
  modNotes: string;
}

export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";

export interface StaffNameObject {
  first: string;
  middle: string;
  last: string;
  full: string;
  native: string;
  alternative: string[];
  userPreferred: string;
}

export interface StaffImageObject {
  large: string;
  medium: string;
}

export interface StaffObject {
  id: number;
  name: StaffNameObject;
  languageV2: string;
  image: StaffImageObject;
}

export interface StaffRoleTypeObject {
  voiceActor: StaffObject;
  roleNotes: string;
  dubGroup: string;
}

export interface MediaEdgeObject {
  node: MediaObject;
  id: number;
  relationType: MediaRelation;
  isMainStudio: boolean;
  characters: CharacterObject[];
  characterRole: CharacterRole;
  characterName: string;
  roleNotes: string;
  dubGroup: string;
  staffRole: string;
  voiceActors: StaffObject[];
  voiceActorRoles: StaffRoleTypeObject[];
  favouriteOrder: number;
}

export interface PageInfoObject {
  totel: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface MediaConnectionObject {
  edges: MediaEdgeObject[];
  nodes: MediaObject[];
  pageInfo: PageInfoObject;
}

export interface CharacterEdgeObject {
  node: CharacterObject;
  id: number;
  role: CharacterRole;
  name: string;
  voiceActors: StaffObject[];
  voiceActorRoles: StaffRoleTypeObject[];
  media: MediaObject[];
  favouriteOrder: number;
}

export interface CharacterConnectionObject {
  edges: CharacterEdgeObject[];
  nodes: CharacterObject[];
  pageInfo: PageInfoObject;
}

export interface StaffEdgeObject {
  node: StaffObject;
  id: number;
  role: String;
  favouriteOrder: number;
}

export interface StaffConnectionObject {
  edges: StaffEdgeObject[];
  nodes: StaffObject[];
  pageInfo: PageInfoObject;
}

export interface StudioObject {
  id: number;
  name: string;
  isAnimationStudio: boolean;
  media: MediaConnectionObject;
  siteUrl: string;
  isFavourite: boolean;
  favourites: number;
}

export interface StudioEdgeObject {
  node: StudioObject;
  id: number;
  isMain: boolean;
  favouriteOrder: number;
}

export interface StudioConnectionObject {
  edges: StudioEdgeObject[];
  nodes: StudioObject[];
  pageInfO: PageInfoObject;
}

export interface FavouritesObject {
  anime: MediaConnectionObject;
  manga: MediaConnectionObject;
  characters: CharacterConnectionObject;
  staff: StaffConnectionObject;
  studios: StudioConnectionObject;
}

export interface ActivityReplyObject {
  id: number;
  userId: number;
  activityId: number;
  text: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: number;
  user: UserObject;
  likes: UserObject[];
}

export interface TextActivityObject {
  id: number;
  userId: number;
  type: ActivityType;
  replyCount: number;
  text: string;
  siteUrl: string;
  isLocked: boolean;
  isSubscribed: boolean;
  likeCount: number;
  isLiked: boolean;
  createdAt: number;
  user: UserObject;
  replies: ActivityReplyObject[];
  likes: [UserObject];
}

export interface ListActivityObject {
  id: number;
  userId: number;
  type: ActivityType;
  replyCount: number;
  status: string;
  progress: string;
  isLocked: boolean;
  isSubscribed: boolean;
  likeCount: number;
  isLiked: boolean;
  siteUrl: string;
  createdAt: number;
  user: UserObject;
  media: MediaObject;
  replies: ActivityReplyObject[];
  likes: UserObject[];
}

export interface MessageActivityObject {
  id: number;
  recipientId: number;
  messengerId: number;
  type: ActivityType;
  replyCount: number;
  message: string;
  isLocked: boolean;
  isSubscribed: boolean;
  likeCount: number;
  isLiked: boolean;
  isPrivate: boolean;
  siteUrl: boolean;
  createdAt: number;
  recipient: UserObject;
  messenger: UserObject;
  replies: ActivityReplyObject[];
  likes: UserObject[];
}

export interface UserFormatStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  format: MediaFormat;
}

export interface UserStatusStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  format: MediaListStatus;
}

export interface UserScoreStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  format: number;
}

export interface UserLengthStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  length: number;
}

export interface UserReleaseYearStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  releaseYear: number;
}

export interface UserStartYearStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  startYear: number;
}

export interface UserGenreStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  genre: string;
}

export interface UserTagSatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  tag: MediaTagObject;
}

export interface UserCountryStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  country: string;
}

export interface UserVoiceActorStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  voiceActor: StaffObject;
  characterIds: number[];
}

export interface UserStaffStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  staff: StaffObject;
}

export interface UserStudioStatisticObject {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  studio: StudioObject;
}

export interface UserStatisticsObject {
  count: number;
  meanScore: number;
  standartDeviation: number;
  minutesWatched: number;
  episodesWatched: number;
  chaptersRead: number;
  volumesRead: number;
  formats: UserFormatStatisticObject[];
  statuses: UserStatusStatisticObject[];
  scores: UserScoreStatisticObject[];
  lengths: UserLengthStatisticObject[];
  releaseYears: UserReleaseYearStatisticObject[];
  startYears: UserStartYearStatisticObject[];
  genres: UserGenreStatisticObject[];
  tags: UserTagSatisticObject[];
  countries: UserCountryStatisticObject[];
  voiceActors: UserVoiceActorStatisticObject[];
  staff: UserStaffStatisticObject[];
  studios: UserStudioStatisticObject[];
}

export interface UserStatisticTypesObject {
  anime: UserStatisticsObject;
  manga: UserStatisticsObject;
}

export interface UserPreviousNameObject {
  name: string;
  createdAt: number;
  updatedAt: number;
}

export type ActivityUnion = TextActivityObject | ListActivityObject | MessageActivityObject;
export type ModRole =
  | "ADMIN"
  | "LEAD_DEVELOPER"
  | "DEVELOPER"
  | "LEAD_COMMUNITY"
  | "COMMUNITY"
  | "DISCORD_COMMUNITY"
  | "LEAD_ANIME_DATA"
  | "ANIME_DATA"
  | "LEAD_MANGA_DATA"
  | "MANGA_DATA"
  | "LEAD_SOCIAL_MEDIA"
  | "SOCIAL_MEDIA"
  | "RETIRED";
export interface UserObject {
  id: number;
  name: string;
  about: string;
  avatar: AvatarObject;
  bannerImage: string;
  isFollowing: boolean;
  isFollower: boolean;
  isBlocked: boolean;
  bans: object;
  options: UserOptionsObject;
  mediaListOptions: MediaListOptionsObject;
  favourites: FavouritesObject;
  statistics: UserStatisticTypesObject;
  unreadNotificationCount: number;
  siteUrl: string;
  donatorTier: number;
  donatorBadge: string;
  moderatorRoles: ModRole[];
  createdAt: number;
  updatedAt: number;
  previousNames: UserPreviousNameObject[];
}
