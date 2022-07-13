import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";

import * as AsciiImage from "../lib/ascii_image_bg";
import ParamConfigurator from "../components/ParamConfigurator";
import { PromiseFileReader, PromiseImageElement } from "../utils";

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
  const [imageSource, setImageSource] = React.useState<string | null>(null);
  const [videoSource, setVideoSource] = React.useState<string | null>(null);

  const [outputSize, setOutputSize] = React.useState<number | null>(null);
  const [frameRate, setFrameRate] = React.useState<number | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const inputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const generateAscii = async () => {
    if (outputSize === null) return;
    if (frameRate === null) return;

    const fileInput = fileInputRef.current;
    if (fileInput === null) return;

    const files = fileInput.files;
    if (files === null) return;
    if (files.length === 0) return;
    const file = files[0];

    setImageSource(null);
    setVideoSource(null);
    setError(null);

    if (file.type.startsWith("image")) {
      const imageUrl = URL.createObjectURL(file);
      setImageSource(imageUrl);
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
        const error = AsciiImage.drawAsciiArtFromImage(
          image,
          inputCanvas,
          outputCanvas,
          outputSize
        );
        if (error) {
          setError(error);
        }
      }
    } else if (file.type.startsWith("video")) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSource(videoUrl);
    }
  };

  const videoTimerCallback = () => {
    if (outputSize === null) return;
    if (frameRate === null) return;

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
        const error = AsciiImage.drawAsciiArtFromVideo(
          video,
          inputCanvas,
          outputCanvas,
          outputSize
        );
        if (error) {
          setError(error);
        }
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
    }, 1000 / frameRate);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ascii Image Generator</title>
        <meta name="description" content="Image → ASCII Characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>ASCII Image Generator</h1>

        <div className={styles.paramConfigs}>
          <ParamConfigurator
            name="Max Output Size"
            default={600}
            presets={[
              ["600", 600],
              ["1024", 1024],
              ["1920", 1920],
            ]}
            validator={(v) => {
              if (v <= 0) return "Output size must be greater than 0";
              return null;
            }}
            onChange={setOutputSize}
          />
          <ParamConfigurator
            name="Frame Rate"
            default={24}
            presets={[
              ["10Hz", 10],
              ["24Hz", 24],
              ["60Hz", 60],
            ]}
            validator={(v) => {
              if (v <= 0) return "Frame rate must be greater than 0";
              return null;
            }}
            onChange={setFrameRate}
          />
        </div>

        <canvas className={styles.inputCanvas} ref={inputCanvasRef} />
        <canvas className={styles.outputCanvas} ref={outputCanvasRef} />

        {error && <p className={styles.error}>{error}</p>}
        <button onClick={generateAscii}>Regenerate</button>

        <div className={styles.previewContainer}>
          <div className={styles.previewContainerTitle}>Preview</div>
          {imageSource && (
            <img className={styles.preview} src={imageSource} ref={imageRef} />
          )}
          {videoSource && (
            <video
              className={styles.preview}
              autoPlay
              controls
              onPlay={videoTimerCallback}
              src={videoSource}
              ref={videoRef}
            />
          )}
        </div>

        <input
          type="file"
          name="file-input"
          accept="image/*,video/*"
          ref={fileInputRef}
          onChange={generateAscii}
        />
      </main>
    </div>
  );
};

export default Home;
