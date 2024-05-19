interface FruirtsStationaryCommonProps {
    fruits: Record<string, any>[];
    stationary: Record<string, any>[];
}
export interface FruitsStationaryProps {
    masterData: FruirtsStationaryCommonProps;
    handleCardClick: (type: string, id: string) => void;
    update: (type: string) => void;
}