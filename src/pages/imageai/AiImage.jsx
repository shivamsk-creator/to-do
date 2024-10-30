import React, { useState } from 'react'

const AiImage = () => {
    const [prompt, setPrompt] = useState("")
    const [image, setImage] = useState("")

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        const imageUrl = URL.createObjectURL(result);
        console.log("image", result)
        return imageUrl;
    }


    const generateImage = () => {

        query({"inputs": prompt}).then((response) => {
            // Use image
            setImage(response);
        });
    }
    

  return (
    <section style={{background: "white", color: "black"}}>
        <input type="text" onChange={(e)=> setPrompt(e.target.value)} />
        <button className='btn-primary' onClick={generateImage}>Generate</button>
        <img src={image} alt="" />
    </section>
  )
}

export default AiImage