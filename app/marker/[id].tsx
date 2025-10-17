import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ImageCarousel from '../../components/ImageCarousel';
import { markersList } from '../../components/MarkersList';
import { MarkerType, MarkersNavigationProps } from '../../types';


export default function Details() {
    const params = useLocalSearchParams<MarkersNavigationProps>();
    const markerId = Number(params.id);

    const [marker, setMarker] = useState<MarkerType | undefined>(
        markersList.markers.find(m => m.id === markerId)
    );

    useEffect(() => {
        if (marker) {
            markersList.markers = markersList.markers.map(m =>
                m.id === marker.id ? marker : m
            );
        }
    }, [marker]);

    if (!marker) return <Text style={{ padding: 20 }}>Маркер не найден</Text>;

    const addImage = async () => {
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
                setMarker({
                    ...marker,
                    images: [
                        ...marker.images,
                        {
                            id: marker.images.length,
                            uri: result.assets[0].uri
                        }
                    ],
                });
            }
        } catch (error) {
            console.error('Ошибка при выборе изображения:', error);
            alert('Произошла ошибка при выборе изображения. Попробуйте ещё раз.');
        }

    };

    const removeImage = (id: number) => {
        setMarker({
            ...marker,
            images: marker.images.filter(image => image.id !== id),
        })
    };

    return (
        <>
            <Stack.Screen options={{ title: `Marker #${params.id}` }} />
            <View style={styles.container}>
                <Text style={styles.text}>Координаты: {'\n'}{params.latitude}, {params.longitude}</Text>

                <View >
                    <Pressable onPress={addImage} style={styles.addButton}>
                        <Text style={styles.addbuttonText}>Добавить фото</Text>
                    </Pressable>
                </View>
                <ImageCarousel marker={marker} removeImage={removeImage} />
            </View>
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
});