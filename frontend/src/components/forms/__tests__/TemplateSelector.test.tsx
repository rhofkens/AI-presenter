import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TemplateSelector } from '../TemplateSelector';
import { TEMPLATE_TYPES, TemplateType } from '@/constants/templates';

describe('TemplateSelector', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all template options', () => {
    render(<TemplateSelector value={null} onChange={mockOnChange} />);

    Object.values(TEMPLATE_TYPES).forEach((templateName) => {
      expect(screen.getByText(templateName)).toBeInTheDocument();
    });
  });

  it('highlights selected template', () => {
    const selectedTemplate: TemplateType = TEMPLATE_TYPES.BUSINESS;
    render(<TemplateSelector value={selectedTemplate} onChange={mockOnChange} />);

    const selectedButton = screen.getByText(selectedTemplate).closest('button');
    expect(selectedButton).toHaveClass('ring-2 ring-primary');
  });

  it('calls onChange when selecting a template', () => {
    render(<TemplateSelector value={null} onChange={mockOnChange} />);

    fireEvent.click(screen.getByText(TEMPLATE_TYPES.BUSINESS));
    expect(mockOnChange).toHaveBeenCalledWith(TEMPLATE_TYPES.BUSINESS);
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Please select a template';
    render(
      <TemplateSelector
        value={null}
        onChange={mockOnChange}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders template icons', () => {
    render(<TemplateSelector value={null} onChange={mockOnChange} />);

    // Check if all template buttons have an icon
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('maintains selection when clicking selected template', () => {
    const selectedTemplate: TemplateType = TEMPLATE_TYPES.BUSINESS;
    render(<TemplateSelector value={selectedTemplate} onChange={mockOnChange} />);

    fireEvent.click(screen.getByText(selectedTemplate));
    expect(mockOnChange).toHaveBeenCalledWith(selectedTemplate);
  });
});