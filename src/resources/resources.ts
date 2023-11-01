export const MResource = {
    "VN": {
        ErrorMsg: {
            ConfirmCancelAssetAddForm: "Bạn có muốn hủy bỏ khai báo tài sản này ?",
            ConfirmCancelAssetEditForm: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này ?",

            // Input
            FieldEmpty: "Trường dữ liệu này không được để trống",
            MaxLength: "Trường dữ liệu này không được quá 255 ký tự",
            PositiveNumber: "Trường này phải lớn hơn 0",
            InputValidate: "Cần nhập đầy đủ thông tin",

            // Toast
            SavedError: "Lưu dữ liệu thất bại",
            
            // HTTP
            ERR_NETWORK: "Có lỗi xảy ra ở đường truyền mạng, vui lòng thử lại sau!",
            BadRequest: "Có lỗi xảy ra, vui lòng thử lại sau!",
            Unauthorized: "Vui lòng đăng nhập!",
            Forbidden: "Bạn không có quyền thực hiện chức năng trên!",
            NotFound: "Có lỗi xảy ra, vui lòng thử lại sau!",
            InternalServerError: "Đã có lỗi xảy ra ở Server, vui lòng thử lại sau!"
        },
        SuccessMsg: {
            SavedSuccess: "Lưu dữ liệu thành công",
            UpdatedSuccess: "Cập nhật dữ liệu thành công",
            AddedSuccess: "Thêm dữ liệu thành công",
            DuplicatedSuccess: "Nhân bản dữ liệu thành công",
            DeletedSuccess: "Xóa dữ liệu thành công",
        },
        Header: {
            Title: "Danh sách tài sản",
            Department: "Sở tài chính",
            Year: "Năm",
        },
        Sidebar: {
            AppName: "MISA QLTS",
            Overview: "Tổng quan",
            AssetList: "Tài sản",
            SpecialAssets: "Tài sản HT - ĐB",
            Tools: "Công cụ sử dụng",
            Category: "Danh mục",
            Search: "Tra cứu",
            Report: "Báo cáo",
        },
        AssetTable: {
            Index: "STT",
            IndexTooltip: "Số thứ tự",
            AssetId: "Mã tài sản",
            AssetName: "Tên tài sản",
            AssetTypeName: "Loại tài sản",
            AssetDepartmentName: "Bộ phận sử dụng",
            AssetQuantity: "Số lượng",
            AssetHistoricalCost: "Nguyên giá",
            AccumulatedDepreciation: "HM/KH lũy kế",
            AccumulatedDepreciationTooltip: "Hao mòn, khấu hao lũy kế",
            AssetRemainingValue: "Giá trị còn lại",
            Tool: "Chức năng",
            AssetTableEmpty: "Không có dữ liệu",
            EditTooltip: "Sửa tài sản",
            DuplicateTooltip: "Nhân bản tài sản",
        },
        TableColumns: {
            Index: "STT",
            FixedAssetCode: "Mã tài sản",
            FixedAssetName: "Tên tài sản",
            DocumentCode: "Mã chứng từ",
            TransferDate: "Ngày điều chuyển",
            DocumentDate: "Ngày chứng từ",
            DepartmentName: "Bộ phận sử dụng",
            DepartmentTransferName: "Bộ phận điều chuyển đến",
            Reason: "Lí do",
            Cost: "Nguyên giá",
            RemainingValue: "Giá trị còn lại",
            TrackedYear: "Năm theo dõi",
            Note: "Ghi chú",
            Tool: "Chức năng",
        },
        Form: {
            FormTitle: {
                Add: "Thêm tài sản",
                Edit: "Sửa tài sản",
                Duplicate: "Nhân bản tài sản"
            },
            FormInputLabel: {
                AssetId: "Mã tài sản",
                AssetName: "Tên tài sản",
                AssetTypeId: "Mã loại tài sản",
                AssetTypeName: "Tên loại tài sản",
                AssetDepartmentId: "Mã bộ phận sử dụng",
                AssetDepartmentName: "Tên bộ phận sử dụng",
                AssetHistoricalCost: "Nguyên giá",
                AssetQuantity: "Số lượng",
                AssetYearOfUse: "Số năm sử dụng",
                AssetDepreciationRate: "Tỷ lệ hao mòn (%)",
                AssetDepreciationValueYear: "Giá trị hao mòn năm",
                AssetTrackYear: "Năm theo dõi",
                AssetPurchasedDate: "Ngày mua",
                AssetStartUsingDate: "Ngày sử dụng",
            },
            FormInputPlaceholder: {
                AssetId: "Nhập mã tài sản",
                AssetName: "Nhập tên tài sản",
                AssetTypeId: "Chọn mã loại tài sản",
                AssetDepartmentId: "Chọn mã bộ phận sử dụng",
                AssetPurchasedDate: "Nhập ngày mua",
                AssetStartUsingDate: "Nhập ngày sử dụng",
            },
            FormButtonText: {
                Cancel: "Huỷ",
                Save: "Lưu",
            },
            InvalidInput: {
                Required: "Trường này không được để trống",
                Invalid: "Trường này không hợp lệ",
                DateNotGreaterThanCurrentDate: "Ngày không được lớn hơn ngày hiện tại",
                PositiveNumber: "Trường này phải lớn hơn 0",
                Percent: "Trường này phải nhỏ hơn 100",
                InvalidDepreciationValue: "Trường này phải nhỏ hơn nguyên giá",
            }
        },
        ContextMenu: {
            Add: "Thêm tài sản",
            Edit: "Sửa tài sản",
            Delete: "Xóa tài sản",
            Duplicate: "Nhân bản",
        },
        Dialog: {
            Add: {
                Message: "Bạn có muốn huỷ bỏ khai báo tài sản này?",
                BtnCancel: "Không",
                BtnConfirm: "Huỷ bỏ",
            },
            Edit: {
                Message:
                    "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
                BtnCancel: "Huỷ bỏ",
                BtnSave: "Lưu",
                BtnUnSave: "Không lưu",
            },
            Delete: {
                NoSelectedMessage: "Vui lòng chọn tài sản cần xóa!",
                OneSelectedMessage: "Bạn có muốn xóa tài sản <<{asset_code}-{asset_name}>>?",
                ManySelectedMessage: "{quantity} tài sản đã được chọn. Bạn có muốn xóa bỏ các tài sản này khỏi danh sách?",
                ContextMenuSelectedMessage: "Bạn có muốn xóa tài sản <<{asset_code}-{asset_name}>>?",
                BtnClose: "Đóng",
                BtnCancel: "Không",
                BtnConfirm: "Xóa",
            },
            Duplicate: {
                Message: "Bạn có muốn huỷ bỏ khai báo tài sản này?",
                BtnCancel: "Không",
                BtnConfirm: "Huỷ bỏ",
            },
            Error: {
                close: "Đóng",
            },
        },
        ToastMessage: {
            AddSuccess: "Lưu dữ liệu thành công",
            Developing: "Tính năng đang phát triển",
            DeleteSuccess: "Xóa dữ liệu thành công",
        },
        RouterTitle: {
            HomeRouter: "Trang chủ",
            GeneralRouter: "Tổng quan",
            AssetListRouter: "Danh sách tài sản",
            CategoryRouter: "Danh mục",
            SearchRouter: "Tra cứu",
            SpecialAssetRouter: "Tài sản HH/ĐB",
            ToolsRouter: "Công cụ",
            ReportRouter: "Báo cáo"
        },
        ExcelExport: {
            SheetName: "Tài sản",
            FileName: "Danh sách tài sản ",
            Header: {
                fixed_asset_code: "Mã tài sản",
                fixed_asset_name: "Tên tài sản",
                fixed_asset_category_name: "Loại tài sản",
                department_name: "Bộ phận sử dụng",
                quantity: "Số lượng",
                cost: "Nguyên giá",
                life_time: "Số năm sử dụng",
                purchase_date: "Ngày mua",
                start_using_date: "Ngày sử dụng",
                accumulated_depreciation: "HM/KH lũy kế",
                remaining_value: "Giá trị còn lại",
            },
            exampleFileName: "Mẫu nhập liệu.xlsx",
        },
    }
}