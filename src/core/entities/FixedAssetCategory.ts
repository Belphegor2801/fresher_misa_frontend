type FixedAssetCategoryId = string;
type FixedAssetCategoryCode = string;
type FixedAssetCategoryName = string;

/**
 * Thực thể loại tài sản
 * createdBy: NXHinh (14/09/2023)
 */
export type FixedAssetCategory = {
    fixed_asset_category_id: FixedAssetCategoryId;
    fixed_asset_category_code: FixedAssetCategoryCode;
    fixed_asset_category_name: FixedAssetCategoryName;
}