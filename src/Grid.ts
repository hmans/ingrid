export abstract class Grid<Entity = any> {
  abstract set(entity: Entity, position: IVector3): void
  abstract remove(entity: Entity): void
  abstract has(entity: Entity): boolean
  abstract clear(): void
  abstract getEntitiesInSameCell(position: IVector3): Entity[]
  abstract getNearbyEntities(
    position: IVector3,
    maxDistance: number,
    maxEntities: number
  ): Entity[]
}
