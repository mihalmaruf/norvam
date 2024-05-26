import React, { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import "./AiChat.scss"
import { HiOutlinePaperAirplane } from "react-icons/hi2";

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyB5LBq0FdOmLBPbe2qNWkNcGh1kAWrvDq4"; // Replace with your actual API key

const AiChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [chat, setChat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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

      const newChat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });
      setChat(newChat);
      setIsLoading(false);
    };

    initializeChat();
  }, []);

  useEffect(() => {
    const textarea = document.getElementById("myTextarea") as HTMLTextAreaElement;
    textarea.style.height = "0px"; // Reset height to get intrinsic height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [input]);

  const handleSubmit = async () => {
    if (!chat) return;
    setIsLoading(true);
    setMessages([...messages, { role: "user", content: input }]);

    const result = await chat.sendMessage(input);
    const response = result.response;
    setMessages([...messages, { role: "Norvam Ai", content: response.text() }]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="aichat-container">
      <div className="ai_response">
      <>
      <span>Chat With Norvam!</span>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {
            <p>{
              typeof message.content === 'string' ? message.content.split('\n').map((line: any, index: any) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              )) :
              message.content}</p>
            }
          </div>
        ))}
      </>
      {isLoading && 
      <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>}
      </div>
      <div className="search_box">
      <div className="search_field">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="myTextarea"
            placeholder="User helper or Enter prompt here" />
            <div className="submit">
            <HiOutlinePaperAirplane size={25} onClick={handleSubmit} />
          </div>
        </div>
      </div>
      </div>
  );
};

export default AiChat;
