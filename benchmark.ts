import { BoundlessGrid } from "./src"
import { table } from "table"

const now = performance.now

type Entity = {
  id: number
  position: {
    x: number
    y: number
    z: number
  }
}

const makeEntities = (num: number): Entity[] => {
  const entities = []
  for (let i = 0; i < num; i++) {
    entities.push({
      id: i,
      position: {
        x: Math.random() * 1000 - 1000,
        y: Math.random() * 1000 - 1000,
        z: Math.random() * 1000 - 1000
      }
    })
  }

  return entities
}

const addEntities = (iterations = 1000, numEntities = 10_000) => {
  /* Create entities */
  const entities = makeEntities(numEntities)
  const grid = new BoundlessGrid()

  const start = now()
  for (let i = 0; i < iterations; i++) {
    /* Add objects to grid */
    for (const entity of entities) {
      grid.set(entity, entity.position)
    }
    grid.clear()
  }
  const stop = now()
  const time = (stop - start) / iterations

  return [`Adding ${numEntities} entities:`, time.toFixed(3)]
}

const moveEntities = (iterations = 1000, numEntities = 10_000) => {
  /* Create entities */
  const entities = makeEntities(numEntities)
  const grid = new BoundlessGrid()

  for (const entity of entities) {
    grid.set(entity, entity.position)
  }

  const start = now()

  for (let i = 0; i < iterations; i++) {
    /* Move and update all entities */
    for (const entity of entities) {
      entity.position.x = Math.random() * 1000 - 1000
      entity.position.y = Math.random() * 1000 - 1000
      entity.position.z = Math.random() * 1000 - 1000
      grid.set(entity, entity.position)
    }
  }
  const stop = now()
  const time = (stop - start) / iterations

  return [`Moving ${numEntities} entities:`, time.toFixed(3)]
}

const results = [
  ["Benchmark Name", "Average Time per Iteration (ms)"],
  addEntities(),
  moveEntities()
]

console.log(table(results))
