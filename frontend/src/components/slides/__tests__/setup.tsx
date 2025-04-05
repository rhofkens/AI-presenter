import '@/index.css';
import React from 'react';

export function withTestProviders(component: React.ReactElement) {
  return <div className="p-4">{component}</div>;
}