import DropZone from "@/components/ui/dropzone";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/tablewrapper";

async function DashboardPage() {
  const { userId } = auth();

  const docResults = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
    id:doc.id,
    filename: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
    fullName: doc.data().fullName,
    

  }))
console.log(skeletonFiles)
  return (
    <div className="border-t ">
      <DropZone />

      <section className="container space-y-5">
        <h2 className="font-bold">
            Your files
        </h2>

        <TableWrapper skeletonFiles={skeletonFiles} />
      </section>
    </div>
  );
}

export default DashboardPage;
