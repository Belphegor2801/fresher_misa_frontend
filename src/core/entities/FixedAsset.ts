import { FixedAssetCategory } from './FixedAssetCategory';
import { Department } from "./Department";

import { MHelper } from '@/resources/helper';

type FixedAssetId = string;
type FixedAssetCode = string;
type FixedAssetName = string;

type Quantity = number;
type Cost = number;

type DepreciationRate = number;
type DepreciationValueYear = number;
type AccumulatedDepreciation = number;
type TrackedYear = number;
type Lifetime = number;
type ProductionYear = number;
type RemainingValue = number;


type StartUsingDate = Date;
type PurchaseDate = Date;

/**
 * Thực thể tài sản cố định
 * createdBy: NXHinh (14/09/2023)
 */

export class FixedAsset {
    fixed_asset_id: FixedAssetId;
    fixed_asset_code: FixedAssetCode;
    fixed_asset_name: FixedAssetName;
    department?: Department;
    fixed_asset_category?: FixedAssetCategory;
    cost: Cost;
    quantity: Quantity;
    depreciation_rate: DepreciationRate;
    depreciation_value_year: DepreciationValueYear;
    accumulated_depreciation: AccumulatedDepreciation;
    tracked_year: TrackedYear;
    life_time: Lifetime;
    production_year?: ProductionYear;
    remaining_value: RemainingValue;
    start_using_date: StartUsingDate;
    purchase_date: PurchaseDate;

    constructor(
        fixed_asset_id? : FixedAssetId,
        fixed_asset_code? : FixedAssetCode,
        fixed_asset_name?: FixedAssetName,
        cost?: Cost,
        quantity?: Quantity,
        department?: Department,
        fixed_asset_category?: FixedAssetCategory,
        depreciation_rate?: DepreciationRate,
        depreciation_value_year?: DepreciationValueYear,
        accumulated_depreciation?: AccumulatedDepreciation,
        tracked_year?: TrackedYear,
        life_time?: Lifetime,
        production_year?: ProductionYear,
        remaining_value?: RemainingValue,
        start_using_date?: StartUsingDate,
        purchase_date?: PurchaseDate,
    ){
        this.fixed_asset_id = fixed_asset_id ?? "";
        this.fixed_asset_code = fixed_asset_code ?? "";
        this.fixed_asset_name = fixed_asset_name ?? "";
        this.cost = cost ?? 0;
        this.quantity = quantity ?? 0;
        this.department = department;
        this.fixed_asset_category = fixed_asset_category;
        this.depreciation_rate = depreciation_rate ?? 0;
        this.depreciation_value_year = depreciation_value_year ?? 0;
        this.accumulated_depreciation = accumulated_depreciation ?? 0;
        this.tracked_year = tracked_year ?? MHelper.getCurrentYear();
        this.life_time = life_time ?? 0;
        this.production_year = production_year ?? MHelper.getCurrentYear();
        this.remaining_value = remaining_value ?? 0;
        this.start_using_date = start_using_date?? MHelper.getCurrentDate();
        this.purchase_date = purchase_date?? MHelper.getCurrentDate();
    }
}

