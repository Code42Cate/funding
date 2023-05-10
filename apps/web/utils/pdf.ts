// CLIENT ONLY
import { TextItem, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const parseTextFromPdf = async (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
      const loadingTask = pdfjs.getDocument(typedArray);

      try {
        const pdf = await loadingTask.promise;
        let parsedText = '';

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => (item as TextItem).str).join(' ');
          parsedText += pageText + ' ';
        }

        resolve(parsedText);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = () => reject(fileReader.error);

    fileReader.readAsArrayBuffer(file);
  });
