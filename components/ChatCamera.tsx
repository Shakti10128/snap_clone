'use client'

import { readFileAsDataURL } from '@/lib/utils';
import { CameraIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import PreveiwImageDialog from './PreviewImageDialog';
import PreveiwUserDialog from './PreviewUserDialog';

const ChatCamera = () => {
    const [selectedFile,setSelecetedFile] = useState<string>("");
    const [flag,setFlag] = useState(false);
    const imageRef = useRef<HTMLInputElement>(null);

    const fileChangeHandler = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target?.files?.[0];
        if(file) {
            const dataUrl = await readFileAsDataURL(file);
            setSelecetedFile(dataUrl);
        }
        console.log(selectedFile);
    }

    const CloseDialog = ()=>{
        setSelecetedFile("");
        setFlag(false);
    }

  return (
    <>
        <div className='flex flex-col items-center justify-center m-2 rounded-md bg-clip-padding backdrop-blur-sm bg-opacity-5 border p-5'>
            <div className='rounded-full p-8 bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-200 cursor-pointer text-white'
            // imageRef is targeting to the input tag
            onClick={()=> imageRef.current?.click()}
            >
                <CameraIcon size={"50px"}/>
                <input 
                ref={imageRef}
                type='file'
                // accepted file
                accept='image/'
                hidden
                onChange={fileChangeHandler}
                />
            </div>
            <p className='w-2/3 text-lg text-center text-white mt-4  font-semibold'>
                Lets send your first snap
            </p>
        </div>
        {
            flag === false ? (
                <PreveiwImageDialog
                selectedFile={selectedFile}
                close={CloseDialog}
                imageChange={()=> imageRef.current?.click()}
                setFlag={setFlag}
                />
            ) : (
                <PreveiwUserDialog
                selectedFile={selectedFile}
                close={CloseDialog}
                onPreview = {()=>setFlag(false)}
                />
            )
        }
    </>
  )
}

export default ChatCamera