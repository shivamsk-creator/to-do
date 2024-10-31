import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import Loader from "../../common/Loader";

const AiImage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [stabilityImages, setStabilityImages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    const imageUrl = URL.createObjectURL(result);
    console.log("image", result);
    return imageUrl;
  }

  const generateImageFromStability = async () => {
    const path =
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer sk-syeSAqzLamQLpB52MKFqAaUPHYrFnsOX8AY1bvHLGISxPuck",
    };

    const body = {
      steps: 40,
      width: 1024,
      height: 1024,
      seed: 0,
      cfg_scale: 5,
      samples: 2,
      text_prompts: [
        {
          text: prompt,
          weight: 1,
        },
        {
          text: "blurry, bad",
          weight: -1,
        },
      ],
    };

    const response = await fetch(path, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log("response1=>", response);

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();

    return responseJSON;
  };

  const generateImage = async () => {
    // query({"inputs": prompt}).then((response) => {
    //     // Use image
    //     setImage(response);
    // });

    if (!prompt) {
      return;
    }

    try {
      setLoading(true);
      const response = await generateImageFromStability();
      console.log("response", response);
      // setImage(response?.images[0]);
      setStabilityImages(response?.artifacts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (data) => {
    // Create a link element
    const link = document.createElement("a");
    link.href = data; // Set the href to the base64 image
    link.download = "downloaded_image.png"; // Set the download filename

    // Programmatically click the link to trigger the download
    link.click();
  };

  return (
    <section
      style={{
        background: "white",
        color: "black",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <h2 className="my-5">What type of Image you want ?</h2>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Bollywood actor SRK in a suit with a smile"
        style={{ width: "50%", margin: "auto" }}
      />
      <button
        className="btn btn-primary mt-4"
        onClick={generateImage}
        disabled={loading}
      >
        Generate
      </button>
      <Loader loading={loading} />
      <img src={image} alt="" />
      <div className="d-flex py-4 justify-content-center flex-wrap gap-4">
        {stabilityImages.map((img, index) => (
          <div className="d-flex flex-column" style={{ margin: "10px" }}>
            <img
              key={index}
              src={`data:image/png;base64,${img?.base64}`}
              alt={prompt}
              style={{ width: "200px", height: "auto", marginBottom: "10px" }}
            />
            <button
              className="btn btn-primary"
              onClick={() =>
                downloadImage(`data:image/png;base64,${img?.base64}`)
              }
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AiImage;
