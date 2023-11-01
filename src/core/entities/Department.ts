type DepartmentId = string;
type DepartmentCode = string;
type DepartmentName = string;

/**
 * Thực thể phòng ban
 * createdBy: NXHinh (14/09/2023)
 */

export type Department = {
    department_id: DepartmentId;
    department_code: DepartmentCode;
    department_name: DepartmentName;
}