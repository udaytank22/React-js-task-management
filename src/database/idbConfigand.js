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
const DB_NAME = "project-database";

// Database version — Increment this when you change schema (like adding new tables or indexes)
const DB_VERSION = 1;

// Object store (table) names — keep them as constants to avoid typos in other files
const STORE_PROJECT = "projects";

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
        // project tabel
        if (!db.objectStoreNames.contains(STORE_PROJECT)) {
          const store = db.createObjectStore(STORE_PROJECT, {
            keyPath: "id", // Use 'id' as the primary key
            autoIncrement: true, // Automatically increment the key
          });

          store.createIndex("project_name", "project_name", { unique: false }); // Create an index on 'name'
          store.createIndex("description", "description", { unique: false }); // Create an index on 'createdAt'
          store.createIndex("start_date", "start_date", { unique: false }); // Create an index on 'updatedAt'
          store.createIndex("end_date", "end_date", { unique: false }); // Create an index on 'updatedAt'
          store.createIndex("status", "status", { unique: false }); // Create an index on 'status'
          store.createIndex("duration", "duration", { unique: false }); // Create an index on 'duration'
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
  const db = await getDB();
  return db.get(STORE_PROJECT, key);
}

// Set or Update an item
export async function setItem(key, value) {
  const db = await getDB();
  return db.put(STORE_PROJECT, value, key);
}

// Delete an item
export async function deleteItem(key) {
  const db = await getDB();
  return db.delete(STORE_PROJECT, key);
}

// Clear the entire store
export async function clearStore() {
  const db = await getDB();
  return db.clear(STORE_PROJECT);
}

// Additional operations
export async function getAllItems() {
  const db = await getDB();
  return db.getAll(STORE_PROJECT);
}

// Get all keys in the store
export async function getKeys() {
  const db = await getDB();
  return db.getAllKeys(STORE_PROJECT);
}
