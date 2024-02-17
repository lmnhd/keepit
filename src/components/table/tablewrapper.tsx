"use client";

import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "./table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import { Skeleton } from "@/components/ui/skeleton";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">();

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timeStamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => {
      return {
        id: doc.id,
        filename: doc.data().fileName || doc.id,
        timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size,
        fullName: doc.data().fullName,
      };
    });
    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col space-y-5 pb-10">
        <Button variant={'outline'} className="ml-auto w-36 h-10">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div>
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="border-b ">
            {skeletonFiles.map((file) => (
              <div key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
              >
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
            {skeletonFiles.length === 0 && (
              <div className="flex items-center justify-center h-12">
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            
            )}
          </div>

        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        className="ml-auto w-36 h-10 "
        variant={"outline"}
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort by {sort === "desc" ? "Newest" : "Oldest"}
      </Button>

      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
