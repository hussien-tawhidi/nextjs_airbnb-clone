"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhoto } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface props {
  onChange: (value: string) => void;
  value: string;
}

export default function ImageUpload({ onChange, value }: props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result?.info?.secure_url);
    },
    [onChange]
  );
  console.log(value);
  return (
    <>
      <CldUploadWidget
        // onUpload={}   ==> has deprecated use On success instead
        onUpload={handleUpload}
        uploadPreset='sfyovn7a'
        options={{ maxFiles: 1 }}>
        {({ open }) => {
          return (
            <div
              className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'
              onClick={() => open()}>
              <TbPhoto size={50} />
              <p className='font-semibold text-lg'>Click to upload</p>
              {value && (
                <div className='absolute inset-0 w-full h-full'>
                  <Image
                    src={value}
                    alt='upload'
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
}
