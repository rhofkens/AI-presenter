import './index.css';
import '@/index.css';
import React from 'react';
import { Card } from '@/components/ui/card';
import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom';

expect.extend(matchers);

// Add any global providers or context needed for tests
export function TestRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-white" data-testid="test-root">
      {children}
    </div>
  );
}

// Register any components that need to be available globally in tests
export const registerTestComponents = {
  Card,
};

// Export any test utilities that might be needed
export function createTestProps<T>(overrides: Partial<T> = {}): T {
  return {
    ...overrides,
  } as T;
}