export type SpatialHash = string

interface IVector3 {
  x: number
  y: number
  z: number
}

type Cell = [number, number, number]

export class BoundlessGrid<T = any> {
  private grid: Record<SpatialHash, T[]> = {}
  private entities = new Map<T, SpatialHash>()

  constructor(public cellSize: number = 10) {}

  set(entity: T, position: IVector3) {
    /* Calculate hash for entity */
    const hash = this.calculateHashForPosition(position)

    const previous = this.entities.get(entity)

    if (previous && previous !== hash) {
      this.remove(entity)
    }

    /* Make sure cell is created */
    if (this.grid[hash] === undefined) this.grid[hash] = []

    /* Add the entity to the grid */
    this.grid[hash].push(entity)

    /* Remember this hash */
    this.entities.set(entity, hash)
  }

  remove(entity: T) {
    const previous = this.entities.get(entity)

    if (previous) {
      const previousCell = this.grid[previous]
      const pos = previousCell.indexOf(entity, 0)
      previousCell.splice(pos, 1)
      this.entities.delete(entity)
    }
  }

  getEntitiesInCell(cell: Cell) {
    const hash = this.calculateHashForCell(cell)
    return this.grid[hash]
  }

  getNearbyEntities(
    position: IVector3,
    maxDistance: number,
    maxEntities: number = Infinity
  ) {
    const [ax, ay, az] = this.calculateCell({
      x: position.x - maxDistance,
      y: position.y - maxDistance,
      z: position.z - maxDistance
    })

    const [bx, by, bz] = this.calculateCell({
      x: position.x + maxDistance,
      y: position.y + maxDistance,
      z: position.z + maxDistance
    })

    const entities = []

    for (let ix = ax; ix <= bx; ix++) {
      for (let iy = ay; iy <= by; iy++) {
        for (let iz = az; iz <= bz; iz++) {
          if (entities.length >= maxEntities) break

          const hash = this.calculateHashForCell([ix, iy, iz])
          entities.push(...(this.grid[hash] || []))
        }
      }
    }

    return entities
  }

  calculateCell({ x, y, z }: IVector3): Cell {
    return [
      Math.floor(x / this.cellSize),
      Math.floor(y / this.cellSize),
      Math.floor(z / this.cellSize)
    ]
  }

  private calculateHashForCell(cell: Cell): SpatialHash {
    /* JSON.stringify is surprisingly fast :b */
    return JSON.stringify(cell)
  }

  private calculateHashForPosition(position: IVector3): SpatialHash {
    return this.calculateHashForCell(this.calculateCell(position))
  }
}
