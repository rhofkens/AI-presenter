import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MetadataForm } from '../MetadataForm';
import { TEMPLATE_TYPES } from '@/constants/templates';
import type { TagType } from '@/constants/tags';

describe('MetadataForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  const fillForm = async (
    title: string,
    description: string,
    template = TEMPLATE_TYPES.BUSINESS,
    tags: TagType[] = ['camera', 'audio']
  ) => {
    const { getByLabelText, getByText } = screen;

    // Fill title and description
    fireEvent.change(getByLabelText('Project Title'), {
      target: { value: title },
    });
    fireEvent.change(getByLabelText('Description'), {
      target: { value: description },
    });

    // Select template
    fireEvent.click(getByText(template));

    // Add tags
    const tagInput = screen.getByPlaceholderText('Type a tag and press Enter');
    for (const tag of tags) {
      fireEvent.change(tagInput, { target: { value: tag } });
      fireEvent.keyDown(tagInput, { key: 'Enter' });
    }
  };

  it('renders form fields correctly', () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Project Title')).toBeInTheDocument();
    
    const descriptionField = screen.getByLabelText('Description');
    expect(descriptionField).toBeInTheDocument();
    expect(descriptionField.tagName.toLowerCase()).toBe('textarea');
    expect(descriptionField).toHaveProperty('placeholder', 'Enter a description of your video project...');
    
    expect(screen.getByText('Template')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    await fillForm(
      'Test Project',
      'Test Description',
      TEMPLATE_TYPES.BUSINESS,
      ['camera', 'audio']
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Project',
        description: 'Test Description',
        template: TEMPLATE_TYPES.BUSINESS,
        tags: ['camera', 'audio'],
      });
    });
  });

  it('shows validation errors for required fields', async () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    // Submit without filling any fields
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
      expect(screen.getByText('Please select a template')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates title length', async () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    const longTitle = 'a'.repeat(101);
    await fillForm(longTitle, 'Test Description');

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(screen.getByText('Title must be less than 100 characters')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates description length', async () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    const longDescription = 'a'.repeat(501);
    await fillForm('Test Project', longDescription);

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(screen.getByText('Description must be less than 500 characters')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('handles multiline description', async () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    const multilineDescription = 'Line 1\nLine 2\nLine 3';
    await fillForm('Test Project', multilineDescription);

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          description: multilineDescription,
        })
      );
    });
  });

  it('limits number of tags', async () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    await fillForm('Test Project', 'Test Description', TEMPLATE_TYPES.BUSINESS, [
      'camera',
      'audio',
      'light',
      'streaming',
      'editing',
    ]);

    // Try to add one more tag
    const tagInput = screen.getByPlaceholderText('Type a tag and press Enter');
    expect(tagInput).not.toBeInTheDocument();
  });

  it('allows form submission with optional fields empty', async () => {
    render(<MetadataForm onSubmit={mockOnSubmit} />);

    await fillForm('Test Project', '', TEMPLATE_TYPES.BUSINESS, []);

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Project',
        description: '',
        template: TEMPLATE_TYPES.BUSINESS,
        tags: [],
      });
    });
  });
});