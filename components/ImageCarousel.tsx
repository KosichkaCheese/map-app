import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CarouselProps } from '../types';


export default function ImageCarousel({ images, removeImage }: CarouselProps) {
    return (
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.scroll}>
            {images.map((img) => (
                <View key={img.id} style={styles.imageWrapper}>
                    <Image source={{ uri: img.uri }} style={styles.image} />
                    <Pressable style={styles.deleteButton} onPress={() => removeImage(img.id!)}>
                        <Text style={styles.deleteText}>×</Text>
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
})

