import { migrateDatabase } from "@/database/migrations";
import * as SQLite from "expo-sqlite";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as operations from "../database/operations";
import { initDatabase } from "../database/schema";
import { Image, Marker } from "../types";

interface DatabaseContextType {
    addMarker: (marker: Marker) => Promise<void>;
    addImage: (image: Image) => Promise<void>;
    getMarkers: () => Promise<Marker[]>;
    getImages: (marker_id: number) => Promise<Image[]>;
    deleteMarker: (id: number) => Promise<void>;
    deleteImage: (id: number) => Promise<void>;

    isLoading: boolean;
    error: Error | null;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const db = await initDatabase();
                await migrateDatabase();
                setDb(db);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        }

        init();

        return () => {
            if (db) {
                db.closeAsync();
            }
        };
    }, []);

    const addMarker = async (marker: Marker) => {
        if (db) {
            try {
                await operations.addMarker(marker);
            } catch (error) {
                setError(error as Error);
            }
        } else {
            setError(new Error("Database not initialized"));
        }
    }

    const addImage = async (image: Image) => {
        if (db) {
            try {
                await operations.addImage(image);
            } catch (error) {
                setError(error as Error);
            }
        } else {
            setError(new Error("Database not initialized"));
        }
    }

    const getMarkers = async () => {
        if (db) {
            try {
                return await operations.getMarkers();
            } catch (error) {
                setError(error as Error);
                return [];
            }
        } else {
            setError(new Error("Database not initialized"));
            return [];
        }
    }

    const getImages = async (marker_id: number) => {
        if (db) {
            try {
                return await operations.getImages(marker_id);
            } catch (error) {
                setError(error as Error);
                return [];
            }
        } else {
            setError(new Error("Database not initialized"));
            return [];
        }
    }

    const deleteMarker = async (id: number) => {
        if (db) {
            try {
                await operations.deleteMarker(id);
            } catch (error) {
                setError(error as Error);
            }
        } else {
            setError(new Error("Database not initialized"));
        }
    }

    const deleteImage = async (id: number) => {
        if (db) {
            try {
                await operations.deleteImage(id);
            } catch (error) {
                setError(error as Error);
            }
        } else {
            setError(new Error("Database not initialized"));
        }
    }

    const contextValue: DatabaseContextType = {
        addMarker,
        addImage,
        getMarkers,
        getImages,
        deleteMarker,
        deleteImage,
        isLoading,
        error
    }

    return (
        <DatabaseContext.Provider value={contextValue}>
            {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error("useDatabase must be used within a DatabaseProvider");
    }
    return context;
};
