import { Department } from "../entities/Department.ts";
import { BaseRepository } from "./BaseRepository.ts";

export class DepartmentRepository extends BaseRepository<Department>{
    constructor() {
        super("departments")
    }
}