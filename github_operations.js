/**
 * MCP GitHub Operations Examples
 * 
 * This file demonstrates how to use Claude's MCP to interact with GitHub
 */

// Example 1: Search repositories
async function searchRepositories(query, perPage = 5) {
  try {
    const result = await mcp.search_repositories({
      query: query,
      perPage: perPage
    });
    
    console.log(`Found ${result.total_count} repositories matching "${query}"`);
    result.items.forEach(repo => {
      console.log(`- ${repo.full_name}: ${repo.description || 'No description'}`);
    });
    
    return result.items;
  } catch (error) {
    console.error(`Error searching repositories: ${error.message}`);
    return [];
  }
}

// Example 2: Create a new repository
async function createRepository(name, description = '', isPrivate = false) {
  try {
    const result = await mcp.create_repository({
      name: name,
      description: description,
      private: isPrivate,
      autoInit: true
    });
    
    console.log(`Created repository ${result.full_name}`);
    console.log(`URL: ${result.html_url}`);
    
    return result;
  } catch (error) {
    console.error(`Error creating repository: ${error.message}`);
    return null;
  }
}

// Example 3: Add a file to a repository
async function createOrUpdateFile(owner, repo, path, content, message, branch = 'main') {
  try {
    const result = await mcp.create_or_update_file({
      owner: owner,
      repo: repo,
      path: path,
      content: btoa(content), // Convert to base64
      message: message,
      branch: branch
    });
    
    console.log(`File ${path} created/updated in ${owner}/${repo}`);
    return result;
  } catch (error) {
    console.error(`Error creating/updating file: ${error.message}`);
    return null;
  }
}

// Example 4: Get file contents
async function getFileContents(owner, repo, path, branch = 'main') {
  try {
    const result = await mcp.get_file_contents({
      owner: owner,
      repo: repo,
      path: path,
      branch: branch
    });
    
    // Decode content from base64
    const content = atob(result.content);
    console.log(`Retrieved file ${path} from ${owner}/${repo}`);
    
    return content;
  } catch (error) {
    console.error(`Error getting file contents: ${error.message}`);
    return null;
  }
}

// Example 5: Create an issue
async function createIssue(owner, repo, title, body) {
  try {
    const result = await mcp.create_issue({
      owner: owner,
      repo: repo,
      title: title,
      body: body
    });
    
    console.log(`Created issue #${result.number}: ${result.title}`);
    console.log(`URL: ${result.html_url}`);
    
    return result;
  } catch (error) {
    console.error(`Error creating issue: ${error.message}`);
    return null;
  }
}

// Usage examples (in Claude conversation):
/*
searchRepositories('claude example');
createRepository('my-new-repo', 'A test repository');
createOrUpdateFile('username', 'repo-name', 'hello.txt', 'Hello World!', 'Add hello.txt');
getFileContents('username', 'repo-name', 'README.md');
createIssue('username', 'repo-name', 'Bug report', 'I found a bug in the code');
*/