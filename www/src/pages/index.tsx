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

  const [error, setError] = React.useState<string | null>(null);
  const [videoSource, setVideoSource] = React.useState<string | null>(null);

  const inputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoSource(null);
    setError(null);

    const files = e.target.files;
    if (files === null) {
      return;
    }
    if (files.length === 0) {
      // No file is selected
      return;
    }
    const file = files[0];

    if (file.type.startsWith("image")) {
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
          1920
        );
      }
    } else if (file.type.startsWith("video")) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSource(videoUrl);
    }
  };

  const videoTimerCallback = () => {
    const video = videoRef.current;
    if (video === null) {
      return;
    }
    if (video.paused || video.ended) {
      return;
    }
    const inputCanvas = inputCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;
    if (inputCanvas && outputCanvas) {
      try {
        AsciiImage.drawAsciiArtFromVideo(video, inputCanvas, outputCanvas, 720);
      } catch (e) {
        if (e instanceof DOMException) {
          // Ignore
        } else {
          console.error(e);
        }
      }
    }
    setTimeout(() => {
      videoTimerCallback();
    }, 1000 / 24);
  };

  const onVideoPlay: React.ReactEventHandler<HTMLVideoElement> = async () => {
    videoTimerCallback();
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

        {videoSource && (
          <video
            className={styles.video}
            autoPlay
            controls
            onPlay={onVideoPlay}
            src={videoSource}
            ref={videoRef}
          />
        )}
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
