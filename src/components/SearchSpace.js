"use client";

import React, { useState, useRef, useEffect } from "react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

import * as lamejs from "@breezystack/lamejs";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import ClipLoader from "react-spinners/ClipLoader";

import { Zoom } from "@mui/material";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import useProduct from "@/store/store";

import { useRouter } from "next/navigation";

const connect_ = async () => {
  await register(await connect());
};
connect_();

const SearchSpace = () => {
  const { product, setProduct } = useProduct((state) => state);

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [counter, setCounter] = useState(0);
  const [transcribed, setTranscribed] = useState("");

  useEffect(() => {
    console.log("transcribed text: ", transcribed);
  });

  // recording variables references
  const mediaRecorderRef = useRef(null);
  const audioBlobsRef = useRef([]);
  const capturedStreamRef = useRef(null);

  // start recording
  const startRecording = async () => {
    return navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
        },
      })
      .then((stream) => {
        audioBlobsRef.current = [];
        capturedStreamRef.current = stream;

        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "audio/wav",
        });

        mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
          audioBlobsRef.current.push(event.data);
        });

        mediaRecorderRef.current.start();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // stop recording
  function stopRecording_() {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) {
        resolve(null);
        return;
      }

      mediaRecorderRef.current.addEventListener("stop", () => {
        const mimeType = mediaRecorderRef.current.mimeType;
        const audioBlob = new Blob(audioBlobsRef.current, { type: mimeType });

        if (capturedStreamRef.current) {
          capturedStreamRef.current
            .getTracks()
            .forEach((track) => track.stop());
        }
        console.log("audioblob: ", audioBlob);
        resolve(audioBlob);
      });

      mediaRecorderRef.current.stop();
    });
  }

  const convertWavToMp3 = (wavBlob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
        const arrayBuffer = this.result;

        const wavDecoder = lamejs.WavHeader.readHeader(
          new DataView(arrayBuffer)
        );

        const wavSamples = new Int16Array(
          arrayBuffer,
          wavDecoder.dataOffset,
          wavDecoder.dataLen / 2
        );

        const mp3Encoder = new lamejs.Mp3Encoder(
          wavDecoder.channels,
          wavDecoder.sampleRate,
          128
        );

        const mp3Buffer = mp3Encoder.encodeBuffer(wavSamples);

        const mp3Data = mp3Encoder.flush();

        const mp3BufferWithHeader = new Uint8Array(
          mp3Buffer.length + mp3Data.length
        );
        mp3BufferWithHeader.set(mp3Buffer, 0);
        mp3BufferWithHeader.set(mp3Data, mp3Buffer.length);

        const mp3Blob = new Blob([mp3BufferWithHeader], { type: "audio/mp3" });

        resolve(mp3Blob);
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsArrayBuffer(wavBlob);
    });
  };

  const [loading, setLoading] = useState(false);

  const sendToBackend = async (url) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
        {
          url: url,
        }
      );
      if (response) {
        setTranscribed(response.data); // returns the transcribed text
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in /upload");
    }
  };

  const firebaseUpload = async (mp3Blob) => {
    const audioRef = ref(storage, `audio/${"one_" + v4()}`);
    setLoading(true);
    try {
      const response = await uploadBytes(audioRef, mp3Blob);
      if (response) {
        try {
          const url = await getDownloadURL(response.ref);
          if (url) {
            sendToBackend(url);
          }
        } catch (error) {
          console.error("Error retrieving download url");
        }
      }
    } catch (error) {
      console.error("Error uploading to firebase (check out storage creds)");
    }
  };

  const stopRecording = async () => {
    const wavAudioBlob = await stopRecording_();
    setLoading(true);
    if (!wavAudioBlob) {
      console.error("Not received wavAudioBlob");
    } else {
      const mp3Blob = await convertWavToMp3(wavAudioBlob);
      if (!mp3Blob) {
        console.error("Note received mp3 blob");
      } else {
        firebaseUpload(mp3Blob);
      }
    }
  };

  const handleClick = () => {
    setOpen(!open);
    setSearch(!search);
    setCounter(counter + 1);
    if (counter === 0) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/translate`,
        {
          text: transcribed,
        }
      );
      if (response) console.log(response.data);
      setProduct(response.data);
      router.push("/main/product");

    } catch (error) {
      console.error("error in translation | fetch product");
    }finally{
      setSearchLoading(false);
    }
  };

  return (
    <div
      className={`bg-red-100 bg-opacity-70 h-56 mx-60 rounded-lg ${
        counter !== 2 ? "grid grid-cols-2" : "flex justify-center items-center"
      }`}
    >
      {counter !== 2 ? (
        <>
          <div className="flex justify-center items-center text-lg tracking-wide">
            {search ? <>Listening...</> : <>Tap on mic to speak...</>}
          </div>
          <div className="flex justify-center items-center">
            <img
              src={open ? "/mic2.gif" : "/mic2static.png"}
              alt="mic"
              className="w-40 h-auto rounded-full"
              onClick={handleClick}
            />
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <HashLoader color="#837373" size={50} />
              <div className="text-[#3a3333]">Transcribing</div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center">
              <Zoom
                in={counter === 2}
                style={{ transitionDelay: counter === 2 ? "500ms" : "0ms" }}
              >
                <div>
                  <IoIosCheckmarkCircleOutline size={60} fill="#3a3333" />
                </div>
              </Zoom>
              <Zoom
                in={counter === 2}
                style={{ transitionDelay: counter === 2 ? "600ms" : "0ms" }}
              >
                <div>{transcribed}</div>
              </Zoom>
              <Zoom
                in={counter === 2}
                style={{ transitionDelay: counter === 2 ? "600ms" : "0ms" }}
              >
                <div>
                  <button className="px-7 py-2 rounded-full bg-[#3a3333] text-xs text-white hover:bg-[#1d1717]" onClick={handleSearch}>
                  {searchLoading ? <ClipLoader size={22} color="#ffffff" /> : <>Search</>}
                  </button>
                </div>
              </Zoom>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchSpace;
