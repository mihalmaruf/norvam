import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

import React, { useEffect, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";

import { getBase64 } from "../../utils/imageHelper";
import './AiInput.scss';

const API_KEY = "AIzaSyB5LBq0FdOmLBPbe2qNWkNcGh1kAWrvDq4";
const MODEL_NAME = "gemini-1.5-pro-latest";

const AiInput = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showImage, setShowImage] = useState(true);

  const [image, setImage] = useState("");
  const [imageInineData, setImageInlineData] = useState('');

  const generateText = async (isImage = false) => {
    setIsLoading(true);
    setError("");
    setSubject(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      let model = genAI.getGenerativeModel({ model: MODEL_NAME });

      if (isImage) {
        const result = await model.generateContent([selectedOption, userInput, imageInineData]);
        const response = await result.response;
        setGeneratedText(response.text());
      } else {
        const generationConfig = {
          temperature: 1,
          topK: 0,
          topP: 0.95,
          maxOutputTokens: 8192,
        };

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];

        const parts = [{ text: selectedOption + userInput }];
        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
          safetySettings,
        });
        setGeneratedText(result.response.text());
      }
    } catch (err) {
      setError("Failed to generate text. Please try again.");
    } finally {
      setIsLoading(false);
      setSelectedOption("");
      setUserInput("");
    }
  };

  useEffect(() => {
    const textarea = document.getElementById("myTextarea") as HTMLTextAreaElement;
    textarea.style.height = "0px"; // Reset height to get intrinsic height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [userInput]);


  const handleOptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(e.target.value);
  };

  const handleClick = async () => {
    generateText(true);
    setShowImage(!showImage);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      // getting base64 from file to render in DOM
      getBase64(file)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((result: any) => {
          setImage(result);
        })
        .catch(e => console.log(e))

      // generating content model for Gemini Google AI
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fileToGenerativePart(file).then((image: any) => {
        setImageInlineData(image);
      });
    }
  }

  // Converts a File object to a GoogleGenerativeAI.Part object.
  const fileToGenerativePart = async (file: Blob) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader?.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }



  return (
    <div className="ai_conatiner">
      {subject ?
        <div className="ai_response">
          {isLoading ?
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
            :
            <>
             <img src={image} className="image" />
              <p>{
                typeof generatedText === 'string' ? generatedText.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                )) :
                  generatedText}</p>
            </>
          }
        </div>
        :
        <div className="ai-heading">
          <span className="gradient__text">Do you want to step in to the future before others?</span>

          <div className="ai_selection">
            <select className="dropdown" value={selectedOption} onChange={handleOptionChange}>
              <option value="">Social Media Caption</option>
              <option value="Generate SEO friendly Caption with 3 tags for Facebook.">Facebook</option>
              <option value="Generate SEO friendly Caption with 3 tags for Instagram.">Instagram</option>
            </select>

            <select className="dropdown" value={selectedOption} onChange={handleOptionChange}>
              <option value="">Website Content</option>
              <option value="Generate SEO friendly website content.">Web Content</option>
              <option value="Generate SEO friendly Blog Ideas.">Blog Ideas</option>
              <option value="Generate SEO friendly Meta Title and Descripion.">SEO Meta</option>
            </select>

            <select className="dropdown" value={selectedOption} onChange={handleOptionChange}>
              <option value="">Math Problems</option>
              <option value="Solve the following Calculas Problem.">Calculas</option>
              <option value="Solve the following Algebra Problem.">Algebra</option>
            </select>

            <select className="dropdown" value={selectedOption} onChange={handleOptionChange}>
              <option value="">Code Helper</option>
              <option value="Solve the following React Js or React Native issue.">React/React Native</option>
              <option value="Solve the following Javascript issue.">Javascript</option>
              <option value="Solve the following Node Js issue.">Node Js</option>
              <option value="Solve the following Flutter issue.">Flutter</option>
            </select>
          </div>
        </div>
      }

      <div className="search_box">
        <div className="search_field">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            id="myTextarea"
            placeholder="User helper or Enter prompt here" />
            <div className="submit">
            <div className="imageUpload">
    <label htmlFor="uploadFile">
        <IoImageOutline size={25} />
    </label>
    <input type='file' id="uploadFile" style={{display: "none"}} onChange={(e) => handleImageChange(e)} />
</div>
            <HiOutlinePaperAirplane size={25} onClick={handleClick} />
          </div>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default AiInput