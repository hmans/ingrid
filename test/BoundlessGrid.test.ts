import { BoundlessGrid } from "../src"

type Entity = {
  position: {
    x: number
    y: number
    z: number
  }
}

const makeEntity = (): Entity => ({
  position: {
    x: Math.random() * 1000 - 1000,
    y: Math.random() * 1000 - 1000,
    z: Math.random() * 1000 - 1000
  }
})

describe(BoundlessGrid, () => {
  describe("set", () => {
    it("adds an entity to the correct cell, depending on its position", () => {
      const grid = new BoundlessGrid(10)
      const entity = makeEntity()
      grid.set(entity, entity.position)
      expect(grid.getEntitiesInSameCell(entity.position)).toEqual([entity])
    })
  })
})
