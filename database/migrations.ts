import { getDB } from './schema';

const CURRENT_DB_VERSION = 1;

export const migrateDatabase = async () => {
    const db = await getDB();

    const currentVersionRow = await db.getFirstAsync<{ value: string }>(
        'SELECT value FROM db_metadata WHERE key = "db_version";'
    );
    const currentVersion = currentVersionRow ? Number(currentVersionRow.value) : 0;

    console.log(`Текущая версия БД: ${currentVersion}, актуальная: ${CURRENT_DB_VERSION}`);

    if (currentVersion < CURRENT_DB_VERSION) {
        await db.withTransactionAsync(async () => {
            if (currentVersion < 1) {
                await db.execAsync(`
          CREATE TABLE IF NOT EXISTS markers (
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
        `);
            }

            await db.runAsync(
                `INSERT OR REPLACE INTO db_metadata (key, value) VALUES ("db_version", ?);`,
                [CURRENT_DB_VERSION.toString()]
            );
        });

        console.log(`Миграции применены, версия БД: ${CURRENT_DB_VERSION}`);
    } else {
        console.log('База данных уже актуальной версии');
    }
};