/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';
import { DropZone } from '../DropZone';

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveClass(className: string): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

// Define minimal types for drag and drop
interface MockDataTransferItem {
  kind: string;
  type: string;
  getAsFile(): File | null;
  getAsString(callback: (data: string) => void): void;
}

interface MockDataTransferItemList {
  length: number;
  add(data: string, type: string): MockDataTransferItem | null;
  clear(): void;
  remove(index: number): void;
  [index: number]: MockDataTransferItem;
}

interface MockDataTransfer {
  dropEffect: DataTransfer['dropEffect'];
  effectAllowed: DataTransfer['effectAllowed'];
  files: FileList;
  items: MockDataTransferItemList;
  types: string[];
  clearData(format?: string): void;
  getData(format: string): string;
  setData(format: string, data: string): void;
  setDragImage(image: Element, x: number, y: number): void;
}

describe('DropZone', () => {
  const createFile = (
    name: string,
    size: number,
    type: string
  ): File => {
    const file = new File([''], name, { type });
    Object.defineProperty(file, 'size', {
      get() {
        return size;
      },
    });
    return file;
  };

  const createMockDataTransferItem = (file: File): MockDataTransferItem => ({
    kind: 'file',
    type: file.type,
    getAsFile: () => file,
    getAsString: () => {},
  });

  const createMockDataTransferItemList = (file?: File): MockDataTransferItemList => {
    const items: MockDataTransferItem[] = file ? [createMockDataTransferItem(file)] : [];
    const list = {
      add: () => null,
      clear: () => {},
      remove: () => {},
      length: items.length,
    } as MockDataTransferItemList;
    
    items.forEach((item, index) => {
      list[index] = item;
    });

    return list;
  };

  const createDragEvent = (
    type: string,
    file?: File
  ): Partial<React.DragEvent> => {
    const dataTransfer: MockDataTransfer = {
      dropEffect: 'none',
      effectAllowed: 'none',
      files: {
        length: file ? 1 : 0,
        item: (index: number) => (file && index === 0 ? file : null),
        [Symbol.iterator]: function* () {
          if (file) yield file;
        },
      } as FileList,
      items: createMockDataTransferItemList(file),
      types: file ? ['Files'] : [],
      clearData: () => {},
      getData: () => '',
      setData: () => {},
      setDragImage: () => {},
    };

    return {
      preventDefault: vi.fn(),
      dataTransfer: dataTransfer as unknown as DataTransfer,
    };
  };

  it('renders correctly', () => {
    render(<DropZone />);
    expect(
      screen.getByText(/Drag and drop your PowerPoint presentation here/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/PPT or PPTX files up to 50MB/i)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DropZone isLoading={true} />);
    expect(screen.getByText(/Uploading.../i)).toBeInTheDocument();
  });

  it('handles valid PPT file drop', () => {
    const onFileAccepted = vi.fn();
    const onError = vi.fn();
    const { container } = render(
      <DropZone onFileAccepted={onFileAccepted} onError={onError} />
    );

    const file = createFile(
      'test.ppt',
      1024,
      'application/vnd.ms-powerpoint'
    );
    const dropEvent = createDragEvent('drop', file);

    fireEvent.drop(container.firstChild as HTMLElement, dropEvent);

    expect(onFileAccepted).toHaveBeenCalledWith(file);
    expect(onError).not.toHaveBeenCalled();
  });

  it('handles valid PPTX file drop', () => {
    const onFileAccepted = vi.fn();
    const onError = vi.fn();
    const { container } = render(
      <DropZone onFileAccepted={onFileAccepted} onError={onError} />
    );

    const file = createFile(
      'test.pptx',
      1024,
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    );
    const dropEvent = createDragEvent('drop', file);

    fireEvent.drop(container.firstChild as HTMLElement, dropEvent);

    expect(onFileAccepted).toHaveBeenCalledWith(file);
    expect(onError).not.toHaveBeenCalled();
  });

  it('handles invalid file type', () => {
    const onFileAccepted = vi.fn();
    const onError = vi.fn();
    const { container } = render(
      <DropZone onFileAccepted={onFileAccepted} onError={onError} />
    );

    const file = createFile('test.pdf', 1024, 'application/pdf');
    const dropEvent = createDragEvent('drop', file);

    fireEvent.drop(container.firstChild as HTMLElement, dropEvent);

    expect(onFileAccepted).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(
      'Only PowerPoint files (PPT/PPTX) are allowed'
    );
    expect(
      screen.getByText('Only PowerPoint files (PPT/PPTX) are allowed')
    ).toBeInTheDocument();
  });

  it('handles file size exceeding limit', () => {
    const onFileAccepted = vi.fn();
    const onError = vi.fn();
    const { container } = render(
      <DropZone onFileAccepted={onFileAccepted} onError={onError} />
    );

    const file = createFile(
      'test.ppt',
      51 * 1024 * 1024,
      'application/vnd.ms-powerpoint'
    );
    const dropEvent = createDragEvent('drop', file);

    fireEvent.drop(container.firstChild as HTMLElement, dropEvent);

    expect(onFileAccepted).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith('File size must be less than 50MB');
    expect(
      screen.getByText('File size must be less than 50MB')
    ).toBeInTheDocument();
  });

  it('handles drag events correctly', () => {
    const { container } = render(<DropZone />);
    const dropzone = container.firstChild as HTMLElement;

    fireEvent.dragOver(dropzone, createDragEvent('dragover'));
    expect(dropzone).toHaveClass('border-primary');

    fireEvent.dragLeave(dropzone, createDragEvent('dragleave'));
    expect(dropzone).not.toHaveClass('border-primary');
  });

  it('ignores drop when loading', () => {
    const onFileAccepted = vi.fn();
    const { container } = render(
      <DropZone onFileAccepted={onFileAccepted} isLoading={true} />
    );

    const file = createFile(
      'test.ppt',
      1024,
      'application/vnd.ms-powerpoint'
    );
    const dropEvent = createDragEvent('drop', file);

    fireEvent.drop(container.firstChild as HTMLElement, dropEvent);

    expect(onFileAccepted).not.toHaveBeenCalled();
  });
});