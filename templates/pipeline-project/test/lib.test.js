import { describe } from 'riteway'

import { pipelineFactory } from 'NotificationPipeline'
import { generator, detector, consumer, subscriber, requestor, content } from '../index.js'

describe('Library', async (assert) => {
  let cfg = {
    generator: generator(),
    detector,
    consumer,
    subscriber,
    requestor,
    content
  }
  let pipelinegenerator = pipelineFactory(cfg)
  var stream = []
  for await (const value of pipelinegenerator) {
    console.log(value)
    stream.push(value)
  }
  assert({
    given: 'the library',
    should: 'Should do something',
    actual: `${stream.length}`,
    expected: '1'
  })
})
