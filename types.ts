export type MarkerType = {
    id: number;
    latitude: number;
    longitude: number;
    images: ImageType[];
};

export type ImageType = {
    id: number;
    uri: string;
};

export type MarkersNavigationProps = {
    id: string;
    latitude: string;
    longitude: string;
};

export type CarouselProps = {
    marker: MarkerType;
    removeImage: (id: number) => void;
}
export type MapProps = {
    children?: React.ReactNode;
    onLongPress?: (event: any) => void;
}