import { BoundlessGrid } from "./src"
import { table } from "table"

const now = performance.now

/* Add objects */
const addObjects = (iterations = 1000, numEntities = 10_000) => {
  /* Create entities */
  const entities = []
  for (let i = 0; i < numEntities; i++) {
    entities.push({
      id: i,
      position: {
        x: Math.random() * 1000 - 1000,
        y: Math.random() * 1000 - 1000,
        z: Math.random() * 1000 - 1000
      }
    })
  }

  /* Add objects to grid */
  const start = now()
  for (let i = 0; i < iterations; i++) {
    const grid = new BoundlessGrid()
    for (const entity of entities) {
      grid.set(entity, entity.position)
    }
    grid.clear()
  }
  const stop = now()
  const time = (stop - start) / iterations

  return [`Adding ${numEntities} entities:`, time.toFixed(3)]
}

const results = [addObjects()]

console.log(table(results))
