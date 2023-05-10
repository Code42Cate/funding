export const parseTextFromTxt = async (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = () => reject(fileReader.error);

    fileReader.readAsText(file);
  });
