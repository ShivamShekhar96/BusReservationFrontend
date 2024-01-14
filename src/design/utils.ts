import { css } from "@emotion/css";

export const getClassNames = (styles = {}): any => {
  return css({
    "&&": { ...styles },
  });
};

export const getObjectClassNames = (styles = {}): any => {
  const newClassNames = {};
  Object.keys(styles).forEach((key) => {
    newClassNames[key] = getClassNames(styles[key]);
  });
  return newClassNames
};
