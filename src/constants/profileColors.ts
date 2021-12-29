
interface ProfileColors {
  [index: string]: string
}

export const profileColors: ProfileColors = {
  "blue": "#3DB4F2",
  "purple": "#C063FF",
  "green": "#4CCA51",
  "orange": "#EF881A",
  "red": "#E13333",
  "pink": "#FC9DD6",
  "gray": "#677B94"
}

export const getUserColor = (color: string | undefined) => {
  if (!color) return;
  let isDefaultColor = profileColors[color];
  return isDefaultColor || color;
}
