export type Asset = {
    userId: string;
    type: string;
    url: string;
    content: string;
}

export type AssetData = {
    id: string;
    asset: Asset;
}