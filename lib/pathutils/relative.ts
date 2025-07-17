export default function relative(to: string, from?: string) {
  let baseUrl = from ?? import.meta.url;
  
  // If no 'from' provided, try to get caller's URL
  if (!from) {
    const stack = new Error().stack;
    const callerLine = stack?.split('\n')[2];
    const match = callerLine?.match(/file:\/\/[^:)]+/);
    if (match) {
      baseUrl = match[0];
    }
  }
  
  const baseDir = path.dirname(fileURLToPath(baseUrl));
  const absolutePath = path.resolve(baseDir, to);
  
  return pathToFileURL(absolutePath).href;
}