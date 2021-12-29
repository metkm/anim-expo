const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export const timeSince = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds)!;
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
};

export const capitalizeFirstLetter = (content: string) => {
  var str = content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();
  return str.replace(/[^A-Za-z0-9]/g, " ");
};

const ytRegex = /youtube\((?<link>.+v=(?<id>.+))\)/;
const imgRegex = /img(?<width>\d+)\((?<link>.+)\)/;

export const handleAnilistMarkdown = (markdown: string) => {
  var tempText = markdown;

  // youtube
  var ytMatch = ytRegex.exec(tempText);
  if (ytMatch) {
    tempText = tempText.replace(
      ytRegex,
      `[![ytlink](https://img.youtube.com/vi/${ytMatch.groups?.id}/0.jpg)](${ytMatch.groups?.link})`
    );
  }
  // youtube

  // image
  var imgMatch = imgRegex.exec(tempText);
  if (imgMatch) {
    tempText = tempText.replace(imgRegex, `![img](${imgMatch.groups?.link})`);
  }
  // image

  return tempText;
};
