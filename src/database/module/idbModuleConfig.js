// idbConfigand.tsx
// This file configures the IndexedDB database using the idb library.
// It exports functions to initialize the database, perform CRUD operations,
// and manage the object store.

// Importing necessary types from idb library
// IDBPDatabase is a type that represents the IndexedDB database instance.
// openDB is a function to open or create a database.
// dbPromise is a promise that resolves to the database instance.
// It is used to ensure that the database is initialized only once.
// This helps in managing the database connection efficiently.
import { openDB } from "idb";

// Declare a variable to hold the database promise
let dbPromise;

// Db Name and Version
// Define constants for the database name and version.
// This helps in managing the database schema and versioning.
const DB_NAME = "module-database";

// Database version — Increment this when you change schema (like adding new tables or indexes)
const DB_VERSION = 1;

// Object store (table) names — keep them as constants to avoid typos in other files
const STOR_MODULE = "modules";

// idbConfigand.tsx
// This file configures the IndexedDB database using the idb library.
// It exports functions to initialize the database, perform CRUD operations,
// and manage the object store.
// Initialize the database with the schema of the table.
export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create an object store if it doesn't exist
        // module tabel
        if (!db.objectStoreNames.contains(STOR_MODULE)) {
          const store = db.createObjectStore(STOR_MODULE, {
            keyPath: "id", // Use 'id' as the primary key
            autoIncrement: true, // Automatically increment the key
          });
          store.createIndex("project_id", "project_id"); // Create an index on 'project_id'
          store.createIndex("module_name", "module_name", { unique: false }); // Create an index on 'name'
          store.createIndex("description", "description", { unique: false }); // Create an index on 'createdAt'
        }
      },
    });
  }
  return dbPromise;
}

// Get the database instance
// This function initializes the database if it hasn't been initialized yet
// and returns the promise for the database instance.
// It ensures that the database is only initialized once.
export async function getDB() {
  if (!dbPromise) {
    await initDB();
  }
  return dbPromise;
}

// CRUD operations
// Create, Read, Update, Delete
export async function getItem(key) {
  console.log("Getting item by key:", key);
  const db = await getDB();
  return db.get(STOR_MODULE, key);
}

// Set or Update an item
export async function setItem(key, value) {
  const db = await getDB();
  return db.put(STOR_MODULE, value, key);
}

// Delete an item
export async function deleteItem(key) {
  const db = await getDB();
  return db.delete(STOR_MODULE, key);
}

// Clear the entire store
export async function clearStore() {
  const db = await getDB();
  return db.clear(STOR_MODULE);
}

// Additional operations
export async function getAllItems() {
  const db = await getDB();
  return db.getAll(STOR_MODULE);
}

// Get all keys in the store
export async function getKeys() {
  const db = await getDB();
  return db.getAllKeys(STOR_MODULE);
}
