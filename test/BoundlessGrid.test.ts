import { BoundlessGrid } from "../src"

type Entity = {
  position: {
    x: number
    y: number
    z: number
  }
}

const makeEntity = (x?: number, y?: number, z?: number): Entity => ({
  position: {
    x: x ?? Math.random() * 1000 - 1000,
    y: y ?? Math.random() * 1000 - 1000,
    z: z ?? Math.random() * 1000 - 1000
  }
})

describe(BoundlessGrid, () => {
  describe("set", () => {
    it("adds an entity to the correct cell, depending on its position", () => {
      const grid = new BoundlessGrid(10)
      const entity = makeEntity()
      grid.set(entity, entity.position)
      expect(grid.has(entity)).toBeTruthy()
    })
  })

  describe("remove", () => {
    it("removes an entity from the grid", () => {
      /* First, add the entity */
      const grid = new BoundlessGrid(10)
      const entity = makeEntity()
      grid.set(entity, entity.position)
      expect(grid.getEntitiesInSameCell(entity.position)).toEqual([entity])

      /* Now remove it and check if it's gone */
      grid.remove(entity)
      expect(grid.getEntitiesInSameCell(entity.position)).toEqual([])
    })
  })

  describe("getElementsInSameCell", () => {
    it("returns the entities in the same cell as the specified position", () => {
      const grid = new BoundlessGrid(10)
      const entityA = makeEntity(0, 0, 0)
      const entityB = makeEntity(1, 1, 1)
      const entityC = makeEntity(2, 2, 2)
      const entityOutside = makeEntity(11, 11, 11)

      grid.set(entityA, entityA.position)
      grid.set(entityB, entityB.position)
      grid.set(entityC, entityC.position)
      grid.set(entityOutside, entityOutside.position)

      console.log(grid.getEntitiesInSameCell(entityA.position))

      expect(grid.getEntitiesInSameCell(entityA.position)).toEqual([
        entityA,
        entityB,
        entityC
      ])
    })
  })

  describe("getNearbyEntities", () => {
    it("returns the entities that are potentially within the specified maximum distance", () => {
      const grid = new BoundlessGrid(10)
      const entityA = makeEntity(0, 0, 0)
      const entityB = makeEntity(-1, -1, -1)
      const entityC = makeEntity(1, 1, 1)
      const entityOutsideButInCell = makeEntity(5, 5, 5)
      const entityDefinitelyOutside = makeEntity(11, 11, 11)

      grid.set(entityA, entityA.position)
      grid.set(entityB, entityB.position)
      grid.set(entityC, entityC.position)
      grid.set(entityOutsideButInCell, entityOutsideButInCell.position)
      grid.set(entityDefinitelyOutside, entityDefinitelyOutside.position)

      console.log(grid.getEntitiesInSameCell(entityA.position))

      const result = grid.getNearbyEntities(entityA.position, 3)

      expect(result).toEqual(
        expect.arrayContaining([
          entityA,
          entityB,
          entityC,
          entityOutsideButInCell
        ])
      )

      expect(result).not.toContain(entityDefinitelyOutside)
    })
  })
})
