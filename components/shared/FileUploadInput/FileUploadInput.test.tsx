import React from 'react';
import userEvent from '@testing-library/user-event';

// Components
import FileUploadInput from './FileUploadInput';

// Utils
import { fireEvent, render, screen } from '@/test-utils/testing-library-utils';
import { mockAlert } from '@/utils/testUtils';

const mockUploadFile = jest.fn().mockResolvedValue({
  status: true,
  message: 'Logo successfully uploaded.',
  data: 'https://res.cloudinary.com/dwpxztrya/image/upload/v1671466641/logo/testFile.jpg',
});
const mockSetNewFile = jest.fn();
const mockSetFileUrl = jest.fn();
const mockSetIsFileUploading = jest.fn();

const fileUploadInputProps = {
  name: 'image',
  accept: 'image/jpg, image/jpeg, image/png, image/svg+xml, image/webp',
  supportedFiles: 'JPG, JPEG, PNG, SVG, WEBP',
  errorMessage: 'Logo must be an image of jpeg, jpg, png, svg or webp format.',
  uploadCallback: mockUploadFile,
  setNewFile: mockSetNewFile,
  setFileUrl: mockSetFileUrl,
  isfile: false,
  setIsFileUploading: mockSetIsFileUploading,
  isFileSubmitting: false,
};

describe('FileUploadInput', () => {
  it('should render successfully', () => {
    render(<FileUploadInput {...fileUploadInputProps} />);
    const supportedFilesElement = screen.getByText('JPG, JPEG, PNG, SVG, WEBP');
    expect(supportedFilesElement).toBeInTheDocument();
    const uploadInputElement = screen.getByTestId('file-upload');
    expect(uploadInputElement).toBeInTheDocument();
  });

  it('should pick an image and display it', async () => {
    render(<FileUploadInput {...fileUploadInputProps} />);
    const uploadInputElement = screen.getByTestId('file-upload') as HTMLInputElement;
    const file = new File(['testFile'], 'testFile.jpg', { type: 'image/jpg' });
    Object.defineProperty(file, 'size', { value: 1024 });

    await userEvent.upload(uploadInputElement, file);

    expect(uploadInputElement.files).toHaveLength(1);
    expect(uploadInputElement.files?.item(0)).toStrictEqual(file);
    const fileName = screen.getByTestId('file-name');
    expect(fileName).toBeInTheDocument();
    expect(fileName.textContent).toEqual('testFile.jpg');
    const fileSize = screen.getByTestId('file-size');
    expect(fileSize).toBeInTheDocument();
    expect(fileSize.textContent).toEqual('1 KB');
  });

  it('should work with drag and drop', () => {
    render(<FileUploadInput {...fileUploadInputProps} />);
    const uploadInputElement = screen.getByTestId('file-upload') as HTMLInputElement;

    fireEvent.dragEnter(uploadInputElement);
    fireEvent.dragLeave(uploadInputElement);
    fireEvent.drop(uploadInputElement);
  });
});

it('should show an alert with confirmation message if upload was successful', async () => {
  render(<FileUploadInput {...fileUploadInputProps} />);
  const uploadInputElement = screen.getByTestId('file-upload') as HTMLInputElement;
  const file = new File(['testFile'], 'testFile.jpg', { type: 'image/jpg' });

  const user = userEvent.setup();
  await userEvent.upload(uploadInputElement, file);
  expect(mockUploadFile).toHaveBeenCalled();

  await mockAlert(user, 'Logo successfully uploaded.');
});
