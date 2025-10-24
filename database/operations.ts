import { Image, Marker } from "../types";
import { getDB } from "./schema";

export const addMarker = async (marker: Marker): Promise<void> => {
    try {
        const db = await getDB();
        await db.runAsync(
            'INSERT INTO markers (latitude, longitude) VALUES (?, ?)',
            [marker.latitude, marker.longitude]
        );
    } catch (error) {
        console.error('Ошибка при добавлении маркера:', error);
        throw error;
    }
};

export const deleteMarker = async (id: number): Promise<void> => {
    try {
        const db = await getDB();
        await db.runAsync('DELETE FROM markers WHERE id = ?', [id]);
    } catch (error) {
        console.error('Ошибка при удалении маркера:', error);
        throw error;
    }
}

export const getMarkers = async (): Promise<Marker[]> => {
    try {
        const db = await getDB();
        const markers = await db.getAllAsync('SELECT * FROM markers') as Marker[];
        return markers;
    } catch (error) {
        console.error('Ошибка при получении маркеров:', error);
        throw error;
    }
}

export const addImage = async (image: Image): Promise<void> => {
    try {
        const db = await getDB();
        await db.runAsync(
            'INSERT INTO images (marker_id, uri) VALUES (?, ?)',
            [image.marker_id, image.uri]
        )
    } catch (error) {
        console.error('Ошибка при добавлении изображения:', error);
        throw error;
    }
}

export const deleteImage = async (id: number): Promise<void> => {
    try {
        const db = await getDB();
        await db.runAsync('DELETE FROM images WHERE id = ?', [id]);
    } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        throw error;
    }
}

export const getImages = async (marker_id: number): Promise<Image[]> => {
    try {
        const db = await getDB();
        const images = await db.getAllAsync('SELECT * FROM images WHERE marker_id = ?', [marker_id]) as Image[];
        return images;
    } catch (error) {
        console.error('Ошибка при получении изображений:', error);
        throw error;
    }
}