import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="fixed inset-0 bg-gray-950/50 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-6 text-left shadow-xl transition-all sm:my-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-5">
                    {title && <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">{title}</h3>}
                    <button
                        type="button"
                        className="rounded-md bg-white dark:bg-gray-900 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-2 text-gray-900 dark:text-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
}
