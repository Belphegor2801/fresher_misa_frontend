type DocumentDetailsId = String;
type DocumentId = string;
type FixedAssetId = string;
type FixedAssetCode = string;
type FixedAssetName = string;

type Cost = number;
type RemainingValue = number;

type DepartmentBeforeId = String;
type DepartmentBeforeName = String;
type DepartmentAfterId = String;
type DepartmentAfterName = String;

type Reason = string;

/**
 * Thực thể tài sản cố định
 * createdBy: NXHinh (14/09/2023)
 */

export class TransferDocumentDetails {
    document_details_id: DocumentDetailsId;
    document_id: DocumentId;
    fixed_asset_id: FixedAssetId;
    fixed_asset_code: FixedAssetCode;
    fixed_asset_name: FixedAssetName;
    cost: Cost;
    remaining_value: RemainingValue;

    department_before_id: DepartmentBeforeId;
    department_before_name: DepartmentBeforeName;
    department_after_id: DepartmentAfterId;
    department_after_name: DepartmentAfterName;
    
    reason: Reason;

    constructor(
        document_details_id: DocumentDetailsId,
        document_id: DocumentId,
        fixed_asset_id: FixedAssetId,
        fixed_asset_code: FixedAssetCode,
        fixed_asset_name: FixedAssetName,
        cost: Cost,
        remaining_value: RemainingValue,

        department_before_id: DepartmentBeforeId,
        department_before_name: DepartmentBeforeName,
        department_after_id: DepartmentAfterId,
        department_after_name: DepartmentAfterName,
        reason: Reason,
    ){
        this.document_details_id = document_details_id ?? "";
        this.document_id = document_id ?? "";
        this.fixed_asset_id = fixed_asset_id ?? "";
        this.fixed_asset_code = fixed_asset_code ?? "";
        this.fixed_asset_name = fixed_asset_name ?? "";
        this.cost = cost ?? 0;
        this.remaining_value = remaining_value ?? 0;
        this.department_before_id = department_before_id ?? "";
        this.department_before_name = department_before_name ?? "";
        this.department_after_id = department_after_id ?? "";
        this.department_after_name = department_after_name ?? "";
        this.reason = reason ?? "";
    }
}

