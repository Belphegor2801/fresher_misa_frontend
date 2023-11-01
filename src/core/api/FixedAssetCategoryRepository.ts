import { FixedAssetCategory } from "../entities/FixedAssetCategory.ts";
import { BaseRepository } from "./BaseRepository.ts";

export class FixedAssetCategoryRepository extends BaseRepository<FixedAssetCategory>{
    constructor() {
        super("fixed-asset-categories")
    }
}