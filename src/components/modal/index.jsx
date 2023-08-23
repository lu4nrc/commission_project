import React from 'react';
import { X } from '@phosphor-icons/react';

function Modal({ isOpen, toggle, children }) {
  return (
    <div className="">
      {isOpen && (
        <div
          className="absolute m-auto top-0 bottom-0 left-0 right-0 z-20 dark:bg-white/20 bg-black/20"
          onClick={toggle}
        >
          <div className="flex w-full justify-center items-center h-full">
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[512px] bg-white dark:bg-slate-800 p-5 rounded-lg overflow-hidden"
            >
              <div className="relative">
                <button
                  className="absolute right-0 bg-transparent dark:text-white"
                  onClick={toggle}
                >
                  <X size={32} />
                </button>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
