export default function writeFileSyncRecursive(filePath: string , data : string, options = {}) {
  // Create directory structure
  mkdirSync(dirname(filePath), { recursive: true });
  
  // Write the file
  writeFileSync(filePath, data, options);
}