import { create } from "zustand";

interface AppStore {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (isOpen: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (isOpen: boolean) => void;

    fileId: string;
    setFileId: (fileId: string) => void;

    fileName: string;
    setFileName: (fileName: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (isOpen: boolean) => set({ isDeleteModalOpen: isOpen }),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (isOpen: boolean) => set({ isRenameModalOpen: isOpen }),

    fileId: "",
    setFileId: (fileId: string) => set({ fileId: fileId }),

    fileName: "",
    setFileName: (fileName: string) => set({ fileName: fileName }),
}))
