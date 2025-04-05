import { test, expect } from '@playwright/experimental-ct-react';
import { HomePage } from '../HomePage';

test('renders HomePage with basic elements', async ({ mount }) => {
  const component = await mount(<HomePage />);
  
  // Check main structure
  await expect(component.getByText('Home')).toBeVisible();
  await expect(component.getByText('Create new')).toBeVisible();
  
  // Check project list exists
  await expect(component.getByTestId('project-list')).toBeVisible();
});

test('displays project cards', async ({ mount }) => {
  const component = await mount(<HomePage />);
  
  // Wait for project cards to be rendered
  const projectCards = component.getByTestId('project-card');
  await expect(projectCards).toBeVisible();
});