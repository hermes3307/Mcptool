/**
 * MCP File Operations Examples
 * 
 * This file demonstrates how to use Claude's MCP to perform file system operations
 */

// Example 1: Reading a file
async function readFileExample(filePath) {
  try {
    // Read file content as text
    const content = await window.fs.readFile(filePath, { encoding: 'utf8' });
    console.log(`File content: ${content.substring(0, 200)}...`);
    return content;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

// Example 2: Writing a file
async function writeFileExample(filePath, content) {
  try {
    await window.fs.writeFile(filePath, content);
    console.log(`Successfully wrote to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
    return false;
  }
}

// Example 3: Getting directory listing
async function listDirectoryExample(dirPath) {
  try {
    const files = await window.fs.readdir(dirPath);
    console.log(`Files in ${dirPath}:`);
    files.forEach(file => console.log(` - ${file}`));
    return files;
  } catch (error) {
    console.error(`Error listing directory: ${error.message}`);
    return [];
  }
}

// Example 4: Checking if a file exists
async function fileExistsExample(filePath) {
  try {
    await window.fs.stat(filePath);
    console.log(`File ${filePath} exists`);
    return true;
  } catch (error) {
    console.log(`File ${filePath} does not exist`);
    return false;
  }
}

// Example 5: Processing a CSV file
async function processCsvExample(csvPath) {
  try {
    const content = await window.fs.readFile(csvPath, { encoding: 'utf8' });
    
    // Using PapaParse to parse CSV
    import Papa from 'papaparse';
    const result = Papa.parse(content, {
      header: true,
      dynamicTyping: true
    });
    
    console.log(`Parsed ${result.data.length} rows from CSV`);
    console.log(`Headers: ${result.meta.fields.join(', ')}`);
    
    return result.data;
  } catch (error) {
    console.error(`Error processing CSV: ${error.message}`);
    return null;
  }
}

// Usage examples (in Claude conversation):
/*
readFileExample('example.txt');
writeFileExample('new-file.txt', 'Hello, this is a test');
listDirectoryExample('.');
fileExistsExample('config.json');
processCsvExample('data.csv');
*/