// store/modal-store.ts
import { create } from "zustand";

type ConfirmDeleteModalState = {
  open: boolean;
  linkId: number | null;
  openModal: (linkId: number) => void;
  closeModal: () => void;
};

export const useConfirmDeleteModal = create<ConfirmDeleteModalState>((set) => ({
  open: false,
  linkId: null,
  openModal: (linkId) => set({ open: true, linkId }),
  closeModal: () => set({ open: false, linkId: null }),
}));
