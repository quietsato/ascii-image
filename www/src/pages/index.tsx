import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";

import * as AsciiImage from "../lib/ascii_image_bg";

class PromiseFileReader {
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

class PromiseImageElement {
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

function createImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise(async (resolve, reject) => {
    const fileReader = new PromiseFileReader();
    const dataUrl = await fileReader.readAsDataURL(file);
    if (!dataUrl) {
      return reject("Failed to create data url from the passed file");
    }
    const image = new PromiseImageElement();
    try {
      await image.loadDataUrl(dataUrl.toString());
      resolve(image.element);
    } catch (e) {
      reject("Invalid image");
    }
  });
}

const Home: NextPage = () => {
  React.useEffect(() => {
    AsciiImage.init();
  }, []);

  const [error, setError] = React.useState("");

  const inputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    const files = e.target.files;
    if (files === null) {
      return;
    }
    if (files.length === 0) {
      // No file is selected
      return;
    }
    const file = files[0];

    let image;
    try {
      image = await createImageFromFile(file);
    } catch (e) {
      setError(e as string);
      return;
    }

    const inputCanvas = inputCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;
    if (inputCanvas && outputCanvas) {
      AsciiImage.drawAsciiArtFromImage(
        image,
        inputCanvas,
        outputCanvas,
        1920,
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ascii Image</title>
        <meta name="description" content="Image → ASCII Characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Hello World</h1>

        <canvas className={styles.inputCanvas} ref={inputCanvasRef}></canvas>
        <canvas className={styles.outputCanvas} ref={outputCanvasRef}></canvas>

        <input
          type="file"
          name="file-input"
          id="file-input"
          accept="image/*,video/*"
          onChange={onFileInputChange}
        />

        {error && <p className={styles.error}>{error}</p>}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
