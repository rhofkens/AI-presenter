import { test, expect } from '@playwright/experimental-ct-react';
import { SlideItem } from '../SlideItem';
import { TestRoot } from '@/test/setup';

const mockSlide = {
  id: 1,
  title: 'Test Slide',
  description: 'Test description for the slide',
  imageUrl: 'https://example.com/test.jpg',
  narrative: 'Test narrative text explaining the slide content',
};

test('renders all slide information correctly', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlideItem {...mockSlide} />
    </TestRoot>
  );
  
  // Basic info
  await expect(component.getByText('1')).toBeVisible();
  await expect(component.getByText('Test Slide')).toBeVisible();
  await expect(component.getByText('Test description for the slide')).toBeVisible();

  // Image
  const image = component.getByAltText('Preview of slide 1');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('src', 'https://example.com/test.jpg');

  // Narrative
  await expect(component.getByText('Narrative')).toBeVisible();
  await expect(component.getByText('Test narrative text explaining the slide content')).toBeVisible();
});

test('shows placeholder when no image is provided', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlideItem {...mockSlide} imageUrl={undefined} />
    </TestRoot>
  );
  
  await expect(component.getByText('No preview available')).toBeVisible();
});

test('hides narrative section when no narrative is provided', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlideItem {...mockSlide} narrative={undefined} />
    </TestRoot>
  );
  
  const narrativeHeading = component.getByText('Narrative');
  await expect(narrativeHeading).not.toBeVisible();
});

test('applies hover styles correctly', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlideItem {...mockSlide} />
    </TestRoot>
  );
  
  const card = component.getByRole('listitem');
  await expect(card).toHaveClass(/hover:bg-slate-50/);
});

test('shows edit and delete buttons', async ({ mount }) => {
  const component = await mount(
    <TestRoot>
      <SlideItem {...mockSlide} />
    </TestRoot>
  );

  // Verify buttons are present
  await expect(component.getByTitle('Edit slide')).toBeVisible();
  await expect(component.getByTitle('Delete slide')).toBeVisible();

  // Verify button styles
  const editButton = component.getByTitle('Edit slide');
  await expect(editButton).toHaveClass(/text-slate-600/);

  const deleteButton = component.getByTitle('Delete slide');
  await expect(deleteButton).toHaveClass(/text-red-600/);
});

test('buttons are clickable', async ({ mount }) => {
  let editClicked = false;
  let deleteClicked = false;

  const component = await mount(
    <TestRoot>
      <SlideItem
        {...mockSlide}
        onEdit={() => { editClicked = true; }}
        onDelete={() => { deleteClicked = true; }}
      />
    </TestRoot>
  );

  // Click edit button
  await component.getByTitle('Edit slide').click();
  await expect(editClicked).toBeTruthy();

  // Click delete button
  await component.getByTitle('Delete slide').click();
  await expect(deleteClicked).toBeTruthy();
});

test('truncates long title and description', async ({ mount }) => {
  const longSlide = {
    id: 2,
    title: 'A very long title that should be truncated at some point to prevent overflow',
    description: 'A very long description that should be truncated at some point to prevent overflow and maintain the clean look of the slide item in the list view',
  };

  const component = await mount(
    <TestRoot>
      <SlideItem {...longSlide} />
    </TestRoot>
  );
  
  const title = component.getByText(longSlide.title);
  const description = component.getByText(longSlide.description);
  
  await expect(title).toHaveClass(/truncate/);
  await expect(description).toHaveClass(/line-clamp-2/);
});