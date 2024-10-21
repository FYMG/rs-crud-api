export enum ContentType {
  json = 'application/json',
  html = 'text/html',
}

function getHead({ type = ContentType.json }: { type?: ContentType } = {}) {
  return {
    'Content-Type': type,
  };
}

export default getHead;
