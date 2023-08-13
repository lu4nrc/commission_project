import React from 'react';
import { X } from '@phosphor-icons/react';

function Modal(props) {
  return (
    <div className="">
      {props.isOpen && (
        <div
          className="absolute m-auto top-0 bottom-0 left-0 right-0 z-20 bg-black/20"
          onClick={props.toggle}
        >
          <div className="flex w-full justify-center items-center h-full">
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[512px] bg-white p-5 rounded-lg overflow-hidden"
            >
              <div className="relative">
                <button className="absolute right-0 bg-white" onClick={props.toggle}>
                  <X size={32} />
                </button>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
