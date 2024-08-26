import fs from 'fs';
import path from 'path';

// Function to read and log file content
export function logFileContent(filePath: string) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('File Content:\n', data);

    // Optionally, write the content to another log file
    const logFilePath = path.join(__dirname, 'fileContent.log');
    fs.writeFile(logFilePath, data, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      } else {
        console.log('File content successfully logged to', logFilePath);
      }
    });
  });
}
