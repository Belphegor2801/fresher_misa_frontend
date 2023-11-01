export interface IRepository<TEntity> {
    get(filter?: string): Promise<TEntity[]>;
    getById(entityId: string): Promise<TEntity>;
    add(entity:TEntity): Promise<boolean>;
    update(entityID: string, entity: TEntity): Promise<boolean>;
    delete(entityId: string): Promise<boolean>;
    deleteMany(entityIds: string[]): Promise<boolean>;
}