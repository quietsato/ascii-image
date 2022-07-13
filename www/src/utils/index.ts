export class PromiseFileReader {
  private fileReader: FileReader = new FileReader();
  readAsDataURL(blob: Blob): Promise<string | ArrayBuffer | null | undefined> {
    return new Promise((resolve, reject) => {
      this.fileReader.addEventListener("loadend", ({ target }) =>
        resolve(target?.result)
      ),
        this.fileReader.addEventListener("error", ({ target }) =>
          reject(target?.error)
        );
      this.fileReader.readAsDataURL(blob);
    });
  }
}

export class PromiseImageElement {
  element: HTMLImageElement = new Image();
  loadDataUrl(dataUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.element.addEventListener("load", () => {
        resolve();
      });
      this.element.addEventListener("error", (error) => {
        reject(error);
      });
      this.element.src = dataUrl;
    });
  }
}
