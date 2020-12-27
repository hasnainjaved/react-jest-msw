import { setupWorker } from 'msw'
import { handlers } from './handlers'

if (process.env.NODE_ENV === "development") {
    setupWorker(...handlers).start()
  }