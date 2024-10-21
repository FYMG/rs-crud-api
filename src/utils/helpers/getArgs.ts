/**
 * Parse command line arguments into an object.
 * @returns {Object.<string, string>} Object with args as keys and values
 */
function getArgs(): Record<string, string> {
  return process.argv
    .slice(2)
    .map((arg) => arg.replace(/"/g, ''))
    .filter((arg) => arg)
    .reduce((args: Record<string, string>, arg) => {
      const [key, value] = arg.split('=');
      if (typeof key === 'string' && typeof value === 'string') {
        return { ...args, [key]: value };
      }

      return args;
    }, {});
}

export default getArgs;
