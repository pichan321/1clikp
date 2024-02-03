import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import ReactPlayer from 'react-player'
import { Button, FileInput, Input } from '@mantine/core';
import axios from "axios";
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

type Clip = {
  handle?: string;
  startTime?: string;
  endTime?: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [clip, setClip] = useState<Clip>({
    handle: "",
    startTime: "",
    endTime: "",
  })


  const uploadFile = async () => {
    console.log(file)
    if (!file) {return}


    const formData = new FormData();
    formData.append('file', file);

    // Replace 'YOUR_UPLOAD_API_ENDPOINT' with your actual API endpoint

  
    var response = await axios.post("http://localhost:8080/upload", formData)
    if (response.status !== 200) {
      return
    }

    setClip({...clip, handle: response.data})
  }

  const getClip = async () => {
    axios.get(`http://localhost:8080/clip?filename=${file?.name}&startTime=${clip?.startTime}&endTime=${clip?.endTime}`, {
      responseType: 'blob',
  }).then((res) => {
    const href = URL.createObjectURL(res.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', "a.mp4"); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  })

  }
  
  return (
    <>
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 md:col-span-6"><Image src={require("@/images/icon.png")} width={100} alt=""/></div>
        <div className="col-span-10 md:col-span-6">
          <div className="flex gap-x-5 md:gap-x-5 justify-end p-10">
            <h2 className="cursor-pointer ">Documentation</h2>
            <h2 className="cursor-pointer ">Pricing</h2>
            <h2 className="cursor-pointer">About</h2>
            <h2 className="cursor-pointer">Sign Up</h2>
          </div>
        </div>
 


        <div className="col-span-12">
          <span className="flex justify-center items-center space-x-5">
            <FileInput
              // label="MP4 File"
              // description="Input description"
              placeholder="Click here to choose video"
              onChange={(e) => {
                if (e === null) {return}
                // if (!e) {return}

                setFile(e)
                setVideoUrl(URL.createObjectURL(e))
            }}
              />
              <Button variant="filled" onClick={uploadFile}>Upload</Button>
          </span>
     
        </div>

        {
          videoUrl.length > 0 &&
          <>
                <div className="col-span-6 p-5">
              <div className="flex justify-center content-center">
    
                  <video width="250" height="100" controls >
                    <source src={videoUrl} type="video/mp4"/>
                  </video>
   
              </div>
        </div>

        <div className="col-span-6 p-5 space-y-5">

            <div className="w-[200px]">
              <Input.Wrapper label="Start Time" >
                <Input value={clip.startTime} onChange={(e) => setClip((prevClip) => ({ ...prevClip, startTime: e.target.value }))} />
              </Input.Wrapper>
              <Input.Wrapper label="End Time">
                <Input value={clip.endTime} onChange={(e) => setClip((prevClip) => ({ ...prevClip, endTime: e.target.value }))} />
              </Input.Wrapper>

            </div>
            <Button rightSection={<IconDownload size={14} />} onClick={() => getClip()}>Download</Button>
        

          {/* <p>End Time: 
          <Input.Wrapper label="Input label">
        <Input />
      </Input.Wrapper>

          </p> */}
        </div>
          </>
        }
      
   
        
  
      <Footer/>

      </div>

  
 
    </div>
  

       </>
  );
}
