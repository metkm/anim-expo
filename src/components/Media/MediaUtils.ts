const intervals = [
  { label: "y", seconds: 31536000 },
  { label: "d", seconds: 86400 },
  { label: "h", seconds: 3600 },
  { label: "m", seconds: 60 },
];

export const timeUntil = (seconds: number) => {
  var string = "";
  intervals.forEach(interval => {
    let left = Math.floor(seconds / interval.seconds);
    if (left <= 0) return;

    seconds -= left * interval.seconds;
    string += `${left}${interval.label} `
  })
  return string
};
