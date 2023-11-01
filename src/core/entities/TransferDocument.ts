import { MHelper } from '@/resources/helper';

type DocumentId = string;
type DocumentCode = string;

type Cost = number;
type RemainingValue = number;

type TrackedYear = number;
type TransferDate = Date;
type DocumentDate = Date;

type Note = string;

/**
 * Thực thể tài sản cố định
 * createdBy: NXHinh (14/09/2023)
 */

export class TransferDocument {
    document_id: DocumentId;
    document_code: DocumentCode;
    cost: Cost;
    remaining_value: RemainingValue;
    tracked_year: TrackedYear;
    transfer_date: TransferDate;
    document_date: DocumentDate;
    note: Note;

    constructor(
        document_id? : DocumentId,
        document_code? : DocumentCode,
        cost?: Cost,
        remaining_value?: RemainingValue,
        tracked_year?: TrackedYear,
        transfer_date?: TransferDate,
        document_date?: DocumentDate,
        note?: Note,
    ){
        this.document_id = document_id ?? "";
        this.document_code = document_code ?? "";
        this.cost = cost ?? 0;
        this.remaining_value = remaining_value ?? 0;
        this.tracked_year = tracked_year ?? MHelper.getCurrentYear();
        this.transfer_date = transfer_date?? MHelper.getCurrentDate();
        this.document_date = document_date?? MHelper.getCurrentDate();
        this.note = note?? "";
    }
}

