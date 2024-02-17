"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useAppStore } from "@/store/store";
import { DeleteModal } from "../ui/deletemodal";
import RenameModal from "../ui/renameModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [
    fileId,
    setFileId,
    fileName,
    setFileName,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isRenameModalOpen,
    setIsRenameModalOpen,
  ] = useAppStore((state) => [
    state.fileId,
    state.setFileId,
    state.fileName,
    state.setFileName,
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
  ]);

  const openDeleteModal = (fileID: string, fileName: string) => {
    setFileId(fileID);

    setIsDeleteModalOpen(true);
  };
  const openRenameModal = (fileID: string, fileName: string) => {
    setFileId(fileID);
    setFileName(fileName);
    setIsRenameModalOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <DeleteModal />
                <RenameModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col">
                        <div className="text-sm">
                          {(cell.getValue() as Date).toLocaleDateString()}
                        </div>

                        <div className="text-xs text-gray-500">
                          {(cell.getValue() as Date).toLocaleDateString()}
                        </div>
                      </div>
                    ) : cell.column.id === "filename" ? (
                      <p
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => {
                          console.log("rename");

                          openRenameModal(
                            (row.original as FileType).id,
                            (row.original as FileType).filename
                          );
                        }}
                      >
                        {cell.getValue() as string}
                        <PencilIcon size={15} className="ml-2" />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      console.log("delete");
                      openDeleteModal(
                        (row.original as FileType).id,
                        (row.original as FileType).filename
                      );
                    }}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No files yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
