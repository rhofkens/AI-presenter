import { test, expect } from '@playwright/experimental-ct-react';
import { SlidesList } from '../SlidesList';
import { SlideItemProps } from '../SlideItem';
import { TestRoot } from '@/test/setup';

const customSlides: SlideItemProps[] = [
  {
    id: 1,
    title: 'Custom Slide 1',
    description: 'First custom slide description',
  },
  {
    id: 2,
    title: 'Custom Slide 2',
    description: 'Second custom slide description',
  },
];

test('renders mock slides when no slides are provided', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlidesList />
    </TestRoot>
  );
  
  // Check if mock slides are rendered
  await expect(component.getByText('Introduction to AI Presenter')).toBeVisible();
  await expect(component.getByText('Getting Started')).toBeVisible();
  await expect(component.getByRole('list')).toBeVisible();
  
  // Count list items
  const listItems = await component.getByRole('list').locator('article').all();
  expect(listItems.length).toBe(5);
});

test('renders provided custom slides', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlidesList slides={customSlides} />
    </TestRoot>
  );
  
  // Check if custom slides are rendered
  await expect(component.getByText('Custom Slide 1')).toBeVisible();
  await expect(component.getByText('Custom Slide 2')).toBeVisible();
  
  // Count list items
  const listItems = await component.getByRole('list').locator('article').all();
  expect(listItems.length).toBe(2);
});

test('renders slides in a scrollable container', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlidesList />
    </TestRoot>
  );
  
  const container = component.locator('div').first();
  await expect(container).toHaveClass(/overflow-y-auto/);
});

test('maintains consistent spacing between slides', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlidesList slides={customSlides} />
    </TestRoot>
  );
  
  const slideContainer = component.getByRole('list');
  await expect(slideContainer).toHaveClass(/space-y-3/);
});

test('displays slide numbers correctly', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlidesList slides={customSlides} />
    </TestRoot>
  );
  
  await expect(component.getByText('1')).toBeVisible();
  await expect(component.getByText('2')).toBeVisible();
});