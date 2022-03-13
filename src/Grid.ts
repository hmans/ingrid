export abstract class Grid<Entity = any> {
  abstract placeEntity(entity: Entity, position: IVector3): void

  abstract removeEntity(entity: Entity): void

  abstract hasEntity(entity: Entity): boolean

  abstract clear(): void

  abstract getEntitiesInSameCell(position: IVector3): Entity[]

  abstract getNearbyEntities(
    position: IVector3,
    maxDistance: number,
    maxEntities: number
  ): Entity[]
}
