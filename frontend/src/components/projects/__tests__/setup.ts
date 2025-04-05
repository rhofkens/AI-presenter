import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock functions
global.jest = {
  fn: vi.fn
}

// Add missing test environment types
declare global {
  namespace jest {
    function fn(): any
  }
}