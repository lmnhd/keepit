"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function DropZone() {
    const [loading, setLoading] = useState(false)
    const { isLoaded, isSignedIn, user} = useUser()
    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
                await uploadPost(file)
            }
            reader.readAsArrayBuffer(file)
        
        })
    }

    const uploadPost = async (selectedFile: File) => {
        console.log("selectedFile => ",selectedFile)
       

        if(loading) return
        if(!user) return
        setLoading(true)

        const toastId = toast.loading("Uploading file...")



        // addDoc -> users/user12345/files
        const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
            userId: user.id,
            fileName: selectedFile.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timeStamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size

        })

        const imageRef = ref(storage, `users/${user.id}/${docRef.id}`)

        uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL:downloadURL
            })
        })

        setLoading(false)
        toast.success("Upload complete...",{ id: toastId})
    }
  // max filesize 20mb
  const maxSize = 20971520;

  return (
    <Dropzone onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="my-5">
            <div {...getRootProps()}
            className={cn('w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center')}
            >
              <input {...getInputProps()} />
              {!isDragActive && (
                <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
              )}
              {isDragActive && !isDragReject && <p>Drop to upload</p>}
              {isDragReject && <p>File type not accepted, sorry!</p>}
              {isFileTooLarge && <div>File is too large.</div>}
              
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DropZone;
