import { MResource } from "./resources";
import { MEnum } from "./enum";

var Resource = MResource["VN"]

export const excelOptionsObject = {
    SheetName: Resource.ExcelExport.SheetName,
    FileName: Resource.ExcelExport.FileName,
    Columns: [
        {
            ColumnName: Resource.ExcelExport.Header.fixed_asset_code,
            FieldName: "fixed_asset_code",
        },
        {
            ColumnName: Resource.ExcelExport.Header.fixed_asset_name,
            FieldName: "fixed_asset_name",
        },
        {
            ColumnName: Resource.ExcelExport.Header.fixed_asset_category_name,
            FieldName: "fixed_asset_category_name",
            ColumnWidth: 30,
        },
        {
            ColumnName: Resource.ExcelExport.Header.department_name,
            FieldName: "department_name",
            ColumnWidth: 30,
        },
        {
            ColumnName: Resource.ExcelExport.Header.quantity,
            FieldName: "quantity",
            DataType: MEnum.ExcelExport.DataType.Number,
        },
        {
            ColumnName: Resource.ExcelExport.Header.cost,
            FieldName: "cost",
            DataType: MEnum.ExcelExport.DataType.Number,
        },

        {
            ColumnName: Resource.ExcelExport.Header.accumulated_depreciation,
            FieldName: "accumulated_depreciation",
            DataType: MEnum.ExcelExport.DataType.Number,
        },
        {
            ColumnName: Resource.ExcelExport.Header.remaining_value,
            FieldName: "remaining_value",
            DataType: MEnum.ExcelExport.DataType.Number,
        },
        {
            ColumnName: Resource.ExcelExport.Header.life_time,
            FieldName: "life_time",
            DataType: MEnum.ExcelExport.DataType.Number,
        },
        {
            ColumnName: Resource.ExcelExport.Header.purchase_date,
            FieldName: "purchase_date",
            DataType: MEnum.ExcelExport.DataType.Date,
        },
        {
            ColumnName: Resource.ExcelExport.Header.start_using_date,
            FieldName: "start_using_date",
            DataType: MEnum.ExcelExport.DataType.Date,
        },
    ],
};