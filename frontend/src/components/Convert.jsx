import React,{useState} from 'react';
import { FaFile } from "react-icons/fa";
import axios from 'axios'  //backend me data bhejo
const Convert = () => {
        const [selectedFile, setSelectedFile] = useState(null);
        const [convert, setConvert] = useState("");
        const [downloadError, setDownloadError] = useState("");
    
        const handleFileChange = (e) => {
           console.log(e.target.files[0]);
           setSelectedFile(e.target.files[0]);
        };
        

        // const handleSubmit = async (event) => {
        //   event.preventDefault();

        //   if (!selectedFile) {
        //     alert("Please select a file to upload");
        //     return;
        //   }
          
        //   const formData = new FormData();
        //   formData.append("file", selectedFile);

        //   try {
        //     const response = await axios.post(
        //       "http://localhost:5000/convertFile",
        //       formData,
        //       {
        //         headers: {
        //           "Content-Type": "multipart/form-data",
        //         },
        //       }
        //     );

        //     // Handle successful response
        //     console.log("File converted successfully", response.data);
        //     alert("File converted and received successfully!");
        //   } catch (error) {
        //     console.error("Error uploading file:", error);
        //     alert("Failed to upload file");
        //   }

          const handleSubmit = async (event) => {
            event.preventDefault();  //no reloading
            if (!selectedFile) {
              setConvert("Please select a file");
              
              return;
            }
            const formData = new FormData();
            formData.append("file", selectedFile);
            try {
              const response = await axios.post(
                "https://backendword2pdf-hov4.onrender.com/convertFile",
                formData,
                {
                  responseType: "blob", //binary data ->files etc
                }
              );
              
              // https://wordtopdf-mern-stack.onrender.com
               console.log(response.data);
              const url = window.URL.createObjectURL(new Blob([response.data]));
              console.log(url);
              const link = document.createElement("a");
              console.log(link);
              link.href = url;
              console.log(link);
              link.setAttribute(
                "download",
                selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
              );
              console.log(link);
              document.body.appendChild(link);
              console.log(link);
              link.click();
              link.parentNode.removeChild(link);
              setSelectedFile(null);
              setDownloadError("");
              setConvert("File Converted Successfully");
            } catch (error) {
              console.log(error);
              if (error.response && error.response.status == 400) {
                setDownloadError("Error occurred: ", error.response.data.message);
              } else {
                setConvert("");
              }
            }
        };

  return (
    <>
      <div className="pt-50 max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
        <div className=" flex h-screen items-center justify-center">
          <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-700 text-center mb-4 ">
              Convert Word to PDF in Realtime
            </h1>

            <div div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                accept=".doc,.docx"
                className="hidden"
                id="inputWaliFile"
                onChange={handleFileChange}
              />
              <label
                htmlFor="inputWaliFile"
                className="w-full flex items-center justify-center px-4 py-6 bg-pink-400 text-gray-900 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-400 duration-300 hover:text-white  "
              >
                <FaFile className="text-3xl mr-3" />
                <span className="text-2xl mr-2 ">
                  {selectedFile ?selectedFile.name : "Choose File"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className=" text-white bg-pink-800 hover:bg-blue-400 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
              >
                Convert File
              </button>
              {convert && (
                <div className="text-green-500 text-center">{convert}</div>
              )}
              {downloadError && (
                <div className="text-red-500 text-center">{downloadError}</div>
              )}
              {/* This checks if the convert variable is truthy. If it is, it renders a  with a green text indicating the value of convert */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Convert
//  h-screen =100vh  items-center->vertivally center justify-center->horizontally center
// border-dashed->dash border ,border-2 ->light gray border