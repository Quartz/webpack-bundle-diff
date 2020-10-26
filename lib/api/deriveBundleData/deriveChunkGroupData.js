"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveChunkGroupData = void 0;
function deriveChunkGroupData(stats, options) {
    const assetFilter = (options && options.assetFilter) || defaultAssetFilter;
    const chunkGroupData = {};
    const assetSizeMap = getAssetSizeMap(stats);
    // Process each named chunk group
    for (let chunkGroupName of Object.keys(stats.namedChunkGroups)) {
        const chunkGroup = stats.namedChunkGroups[chunkGroupName];
        let size = 0;
        let assets = [];
        let ignoredAssets = [];
        // Process each asset in the chunk group
        for (let asset of chunkGroup.assets) {
            if (!assetFilter(asset)) {
                ignoredAssets.push(asset);
            }
            else {
                assets.push(asset);
                size += assetSizeMap.get(asset);
            }
        }
        chunkGroupData[chunkGroupName] = { size, assets, ignoredAssets };
    }
    return chunkGroupData;
}
exports.deriveChunkGroupData = deriveChunkGroupData;
// Create a map of asset name -> asset size
function getAssetSizeMap(stats) {
    const assetSizeMap = new Map();
    for (let asset of stats.assets) {
        assetSizeMap.set(asset.name, asset.size);
    }
    return assetSizeMap;
}
// By default filter out source maps since they don't count towards bundle size
function defaultAssetFilter(asset) {
    return !asset.endsWith('.map');
}
