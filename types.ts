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
    images: Image[];
    removeImage: (id: number) => void;
}
export type MapProps = {
    children?: React.ReactNode;
    onLongPress?: (event: any) => void;
}

export type Marker = {
    id?: number;
    latitude: number;
    longitude: number;
    created_at?: string;
}

export type Image = {
    id?: number;
    marker_id: number;
    uri: string;
    created_at?: string;
}