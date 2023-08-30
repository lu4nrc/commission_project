import React from 'react';
import { X } from '@phosphor-icons/react';

function Modal({ isOpen, toggle, children, title }) {
  return (
    <>
      {isOpen && (
        <div
          className="absolute flex justify-center items-center m-auto top-0 bottom-0 left-0 right-0 z-20 dark:bg-white/20 bg-black/20"
          onClick={toggle}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-white min-w-[512px] dark:bg-slate-800 rounded-md overflow-hidden"
          >
            <div className="relative">
              <div className="flex gap-3 justify-between px-3 pt-1">
              <h1 className="text-3xl font-semibold ">{title}</h1>
                <button
                  className=" bg-transparent dark:text-white"
                  onClick={toggle}
                >
                  <X size={24} color='gray'/>
                </button>
              </div>
            </div>
            <div className="relative p-3">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
