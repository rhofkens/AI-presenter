import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TagInput } from '../TagInput';
import { TagType } from '@/constants/tags';

describe('TagInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly with empty tags', () => {
    render(<TagInput value={[]} onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText('Type a tag and press Enter')).toBeInTheDocument();
  });

  it('renders existing tags', () => {
    const tags: TagType[] = ['camera', 'audio'];
    render(<TagInput value={tags} onChange={mockOnChange} />);
    
    expect(screen.getByText('camera')).toBeInTheDocument();
    expect(screen.getByText('audio')).toBeInTheDocument();
  });

  it('adds a valid tag on Enter', () => {
    render(<TagInput value={[]} onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Type a tag and press Enter');
    fireEvent.change(input, { target: { value: 'camera' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnChange).toHaveBeenCalledWith(['camera']);
  });

  it('does not add invalid tags', () => {
    render(<TagInput value={[]} onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Type a tag and press Enter');
    fireEvent.change(input, { target: { value: 'invalid-tag' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('does not add duplicate tags', () => {
    render(<TagInput value={['camera']} onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Type a tag and press Enter');
    fireEvent.change(input, { target: { value: 'camera' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('removes a tag when clicking remove button', () => {
    render(<TagInput value={['camera', 'audio']} onChange={mockOnChange} />);
    
    const removeButtons = screen.getAllByLabelText(/Remove .* tag/);
    fireEvent.click(removeButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith(['audio']);
  });

  it('respects maxTags limit', () => {
    const tags: TagType[] = ['camera', 'audio', 'light', 'streaming', 'editing'];
    render(<TagInput value={tags} onChange={mockOnChange} maxTags={5} />);
    
    expect(screen.queryByPlaceholderText('Type a tag and press Enter')).not.toBeInTheDocument();
  });
});