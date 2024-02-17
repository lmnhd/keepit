import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Input } from "./input";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { ref } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const [isRenameModalOpen, setIsRenameModalOpen, fileId, fileName] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.fileName,
    ]);

  const renameFile = async () => {
    if (!user || !fileId) return;

    console.log("rename file");
   const toastId = toast.loading("Renaming file");

    await updateDoc(doc(db, "users", user.id, 'files', fileId), {
        fileName: input
    })

    toast.success("File renamed successfully", {id: toastId})


    // rename file
    

    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen: boolean) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename this file</DialogTitle>
        </DialogHeader>
        <Input
          id="link"
          defaultValue={fileName}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              console.log("rename");
              renameFile();
            }
          }}
        />

        <div className="flex justify-end space-x-2 py-3">
          <Button
            size="sm"
            className="px-3"
            variant="ghost"
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
