import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('map.db');
        console.log('База данных подключена')
    }
    return db;
};

export const initDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('map.db');
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS markers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          
            CREATE TABLE IF NOT EXISTS images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                marker_id INTEGER NOT NULL,
                uri TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (marker_id) REFERENCES markers (id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS db_metadata (
                key TEXT PRIMARY KEY,
                value TEXT
            );`
        );
        return db;
    } catch (error) {
        console.error('Ошибка инициализации базы данных:', error);
        throw error;
    }
};