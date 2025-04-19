/**
 * MCP Database Operations Examples
 * 
 * This file demonstrates how to use Claude's MCP to interact with SQLite database
 */

// Example 1: Create a table
async function createTableExample() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        age INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    const result = await mcp.create_table({
      query: query
    });
    
    console.log('Created users table successfully');
    return true;
  } catch (error) {
    console.error(`Error creating table: ${error.message}`);
    return false;
  }
}

// Example 2: Insert data
async function insertDataExample(name, email, age) {
  try {
    const query = `
      INSERT INTO users (name, email, age)
      VALUES ('${name}', '${email}', ${age})
    `;
    
    const result = await mcp.write_query({
      query: query
    });
    
    console.log(`Inserted user ${name} with ID ${result.lastID}`);
    return result.lastID;
  } catch (error) {
    console.error(`Error inserting data: ${error.message}`);
    return null;
  }
}

// Example 3: Read data
async function readDataExample(limit = 10) {
  try {
    const query = `
      SELECT * FROM users
      ORDER BY id DESC
      LIMIT ${limit}
    `;
    
    const result = await mcp.read_query({
      query: query
    });
    
    console.log(`Retrieved ${result.length} users`);
    result.forEach(user => {
      console.log(`- ${user.id}: ${user.name}, ${user.email}, ${user.age} years old`);
    });
    
    return result;
  } catch (error) {
    console.error(`Error reading data: ${error.message}`);
    return [];
  }
}

// Example 4: Update data
async function updateDataExample(id, newAge) {
  try {
    const query = `
      UPDATE users
      SET age = ${newAge}
      WHERE id = ${id}
    `;
    
    const result = await mcp.write_query({
      query: query
    });
    
    console.log(`Updated user ${id} with new age ${newAge}`);
    console.log(`Rows affected: ${result.changes}`);
    
    return result.changes > 0;
  } catch (error) {
    console.error(`Error updating data: ${error.message}`);
    return false;
  }
}

// Example 5: Delete data
async function deleteDataExample(id) {
  try {
    const query = `
      DELETE FROM users
      WHERE id = ${id}
    `;
    
    const result = await mcp.write_query({
      query: query
    });
    
    console.log(`Deleted user ${id}`);
    console.log(`Rows affected: ${result.changes}`);
    
    return result.changes > 0;
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`);
    return false;
  }
}

// Example 6: List tables
async function listTablesExample() {
  try {
    const result = await mcp.list_tables({});
    
    console.log('Tables in database:');
    result.forEach(table => {
      console.log(`- ${table.name}`);
    });
    
    return result.map(table => table.name);
  } catch (error) {
    console.error(`Error listing tables: ${error.message}`);
    return [];
  }
}

// Example 7: Describe table
async function describeTableExample(tableName) {
  try {
    const result = await mcp.describe_table({
      table_name: tableName
    });
    
    console.log(`Schema for table ${tableName}:`);
    result.forEach(column => {
      console.log(`- ${column.name} (${column.type}) ${column.pk ? 'PRIMARY KEY' : ''}`);
    });
    
    return result;
  } catch (error) {
    console.error(`Error describing table: ${error.message}`);
    return [];
  }
}

// Usage examples (in Claude conversation):
/*
createTableExample();
insertDataExample('Alice Johnson', 'alice@example.com', 28);
readDataExample(5);
updateDataExample(1, 31);
deleteDataExample(2);
listTablesExample();
describeTableExample('users');
*/