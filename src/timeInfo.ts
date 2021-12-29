export const seasons = [
  {
    season: "SPRING",
    seasonStart: 3,
    seasonEnd: 5,
  },
  {
    season: "SUMMER",
    seasonStart: 6,
    seasonEnd: 8,
  },
  {
    season: "FALL",
    seasonStart: 9,
    seasonEnd: 11,
  },
  {
    season: "WINTER",
    seasonStart: 12,
    seasonEnd: 2,
  },
]


const now = new Date();


export const seasonYear = now.getFullYear();
export const nextYear = seasonYear + 1;
export const month = now.getMonth();

export let nextSeason = "";
export const season = seasons.find((season, index) => {
  if (season.seasonStart <= month && month <= season.seasonEnd) {
    nextSeason = seasons[index + 1].season;
    return true
  };

  var diff = season.seasonEnd - season.seasonStart;
  if (diff <= 0) {
    nextSeason = seasons[index + 1 >= seasons.length ? 0 : index + 1].season;
    return true;
  };
})?.season;
