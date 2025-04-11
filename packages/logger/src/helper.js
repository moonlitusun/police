import winston from 'winston';

const { format } = winston;
const { printf } = format;

const parseMsg = (str = '', message) => {
  if (typeof message === 'string') {
    str += message;
    return str;
  }

  if (Array.isArray(message)) {
    const len = message.length - 1;
    message.forEach(
      (item, index) =>
        (str = `${parseMsg(str, item)}${
          index !== len
            ? `
    =========`
            : ''
        }`)
    );
    return str;
  }

  for (let key in message) {
    str += `
    ${key}: ${message[key]}`;
  }

  return str;
};

export const myFormat = printf(({ level, message, timestamp, meta }) => {
  let str = `${new Date(timestamp).toLocaleString()} [${meta.label || 'Police'}] ${level}:`;

  str = parseMsg(str, message);
  delete meta.label;
  return str + `\n   meta: ${JSON.stringify(meta)}`;
});