import { useDatabase } from '@/contexts/databaseContext';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageCarousel from '../../components/ImageCarousel';
import { Image, MarkersNavigationProps } from '../../types';


export default function Details() {
    const router = useRouter();
    const params = useLocalSearchParams<MarkersNavigationProps>();
    const markerId = Number(params.id);
    const { getMarkers, getImages, addImage, deleteImage, deleteMarker } = useDatabase();

    const [images, setImages] = useState<Image[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadImages();
    }, [markerId]);

    const loadImages = async () => {
        try {
            setIsLoading(true);
            await getImages(markerId).then(setImages);
        } catch (error) {
            console.error('Ошибка при загрузке маркера:', error);
            Alert.alert('Ошибка', 'Ошибка при загрузке маркера', [{ text: 'OK' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const addImageToMarker = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Доступ к галерее запрещён. Разрешите доступ в настройках.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 0.8,
            });
            if (!result.canceled && result.assets[0]) {
                const newImage = {
                    uri: result.assets[0].uri,
                    marker_id: markerId,
                }
                await addImage(newImage);
                await loadImages();
            }
        } catch (error) {
            console.error('Ошибка при выборе изображения:', error);
            Alert.alert('Ошибка', 'Произошла ошибка при выборе изображения. Попробуйте ещё раз.', [{ text: 'OK' }]);
        }

    };

    const removeImage = async (id: number) => {
        try {
            await deleteImage(id);
            setImages(prevImages => prevImages.filter(image => image.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении изображения:', error);
            Alert.alert('Ошибка', 'Произошла ошибка при удалении изображения.', [{ text: 'OK' }]);
        }
    };

    const handleDeleteMarker = async () => {
        Alert.alert(
            'Удаление маркера',
            'Вы уверены, что хотите удалить этот маркер? Все связанные изображения также будут удалены.',
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteMarker(markerId);
                            router.back();
                        } catch (error) {
                            console.error('Ошибка при удалении маркера:', error);
                            Alert.alert('Ошибка', 'Не удалось удалить маркер', [{ text: 'OK' }]);
                        }
                    },
                },
            ]
        );
    };

    return (
        <>
            <Stack.Screen options={{ title: `Marker #${params.id}` }} />
            <View style={styles.container}>
                <Text style={styles.text}>Координаты: {'\n'}{params.latitude}, {params.longitude}</Text>

                <View style={styles.buttonContainer}>
                    <Pressable onPress={addImageToMarker} style={styles.addButton}>
                        <Text style={styles.addbuttonText}>Добавить фото</Text>
                    </Pressable>
                    <Pressable onPress={handleDeleteMarker} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Удалить маркер</Text>
                    </Pressable>
                </View>
                <ImageCarousel images={images} removeImage={removeImage} />
            </View>
            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                    <Text>Загрузка...</Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6866F',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,

    },
    text: {
        fontSize: 25,
        color: '#78321A',
        fontFamily: 'roboto',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 40,
        marginBottom: 30,
    },
    addButton: {
        backgroundColor: '#D27244',
        padding: 10,
        borderRadius: 8,
        marginBottom: 30,
    },
    addbuttonText: {
        color: '#FAB493',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loading: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    deleteButton: {
        backgroundColor: '#d24444',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginBottom: 30,
    },
    deleteButtonText: {
        color: '#FFA5A5',
        fontWeight: 'bold',
        fontSize: 16,
    },
});