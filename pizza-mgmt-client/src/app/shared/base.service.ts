import { BehaviorSubject, Observable } from 'rxjs';

export class BaseService<TEntity extends { id: string }> {
  private _entity!: TEntity;
  private _entitySubject = new BehaviorSubject<TEntity | null>(null);
  selectedEntity$: Observable<TEntity | null> = this._entitySubject.asObservable();
  private _store$ = new BehaviorSubject<Record<string, TEntity>>({});
  allEntities$: Observable<Record<string, TEntity>> = this._store$.asObservable();

  get entity(): TEntity {
    return this._entity;
  }

  set entity(entity: TEntity) {
    this._entity = entity;
    this._entitySubject.next(entity);
  }

  protected updateEntity(id: string, entity: TEntity) {
    this._store$.next({
      ...this._store$.value,
      [id]: entity,
    });
  }

  protected updateEntities(entities: TEntity[]) {
    this._store$.next({
      ...this.mapEntitiesToRecord(entities, this._store$.value),
    });
  }

  protected mapEntitiesToRecord(
    entities: TEntity[],
    record: Record<string, TEntity>
  ): Record<string, TEntity> {
    return entities.reduce((acc, entity) => {
      return {
        ...acc,
        [entity.id]: entity,
      };
    }, record);
  }
}
