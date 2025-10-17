import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function Details() {
    const params = useLocalSearchParams();
    const markerId = params.id;
    const [images, setImages] = useState<string[]>([]);

    const addImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) {
            setImages([...images, result.assets[0].uri]);
        }
    };

    const removeImage = (uri: string) => { setImages(images.filter((img) => img !== uri)); };

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
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.scroll}>
                    {images.map((uri) => (
                        <View key={uri} style={styles.imageWrapper}>
                            <Image source={{ uri }} style={styles.image} />
                            <Pressable style={styles.deleteButton} onPress={() => removeImage(uri)}>
                                <Text style={styles.deleteText}>×</Text>
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
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
        color: '#E99973',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scroll: {

    },
    imageWrapper: {
        position: 'relative',
        marginRight: 10,
    },
    image: {
        width: 350,
        height: 470,
        borderRadius: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
        color: '#fff',
        fontSize: 18,
        lineHeight: 18,
    },
});