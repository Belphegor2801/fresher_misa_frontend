type RecipientId = string;
type RecipientName = string;
type Department = string;
type DepartmentPosition = string;
type DocumentId = string;

/**
 * Thực thể thông tin giao nhận
 * createdBy: NXHinh (25/10/2023)
 */

export class Recipient{
    recipient_id: RecipientId;
    recipient_name: RecipientName;
    department: Department;
    department_position: DepartmentPosition;
    document_id: DocumentId;

    constructor(
        recipient_id?: RecipientId,
        recipient_name?: RecipientName,
        department?: Department,
        department_position?: DepartmentPosition,
        document_id?: DocumentId
    ){
        this.recipient_id = recipient_id ?? "";
        this.recipient_name = recipient_name ?? "";
        this.department = department ?? "";
        this.department_position = department_position ?? "";
        this.document_id = document_id ?? "";
    }
}