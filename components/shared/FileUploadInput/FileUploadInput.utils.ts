import { StaticImageData } from 'next/image';
import Papa, { ParseResult } from 'papaparse';

// Assests
import jpgImage from '@/assets/jpg.png';
import pngImage from '@/assets/png.png';
import svgImage from '@/assets/svg.png';
import webpImage from '@/assets/webp.png';
import defaultImage from '@/assets/default.png';
import csvImage from '@/assets/csv.png';

// Types
import { FileData } from './FileUploadInput.types';

const fileHeadersToMatch =
  'firstName,lastName,username,email,role,password,SSN,city,phone,street,state,zipCode';

export const FileUploadImageConfig: {
  jpg: StaticImageData;
  jpeg: StaticImageData;
  png: StaticImageData;
  svg: StaticImageData;
  webp: StaticImageData;
  csv: StaticImageData;
  default: StaticImageData;
} = {
  jpg: jpgImage,
  jpeg: jpgImage,
  png: pngImage,
  svg: svgImage,
  webp: webpImage,
  csv: csvImage,
  default: defaultImage,
};

export enum FileUploadType {
  jpg = 'jpg',
  jpeg = 'jpeg',
  png = 'png',
  svg = 'svg',
  webp = 'webp',
  csv = 'csv',
}

export const calcFileSize = (size: number): string =>
  size < 1000000 ? `${Math.floor(size / 1000)} KB` : `${Math.floor(size / 1000000)} MB`;

export const checkIsFileTypeValid = (file: File, supportedTypes: string): boolean =>
  supportedTypes.includes(file.type);

export const toObject = (
  rowsArray: string[][],
  valuesArray: string[][],
  delimiter: string,
): FileData[] => {
  const result = valuesArray.map((row: string[]) => {
    const values: string[] = row[0].split(delimiter);
    const headers: string[] = rowsArray[0][0].split(delimiter);
    const el = values.reduce((object: any, value: string, index: number) => {
      object[headers[index]] = value;
      return object;
    }, {} as FileData);
    return el;
  });
  return result;
};

export const csvToArray = async (file: File, delimiter = ','): Promise<FileData[]> =>
  new Promise((resolve, reject) => {
    Papa.parse<File>(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: ParseResult<File>) {
        const rowsArray: string[][] = [];
        const valuesArray: string[][] = [];
        results.data.map(obj => {
          rowsArray.push(Object.keys(obj) as Array<keyof typeof obj>);
          valuesArray.push(Object.values(obj) as Array<keyof typeof obj>);
        });
        const result = toObject(rowsArray, valuesArray, delimiter);
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });

export const checkIfFileDataMatches = (data: FileData[]) => {
  const columnNamesArray = Object.keys(data[0]);
  const joinedString = columnNamesArray.join(',');
  return Boolean(joinedString === fileHeadersToMatch);
};
