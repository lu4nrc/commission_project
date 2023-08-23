/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { ChatCentered, DotsThree } from '@phosphor-icons/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Card({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative flex flex-col gap-1 select-none pt-6 mb-2 min-h-[175px] overflow-hidden rounded-md border border-slate-300 ${
            snapshot.isDragging ? 'bg-white/75 border border-slate-300 shadow-md ' : 'dark:bg-slate-800'
          } text-zinc-700`}
        >
          <span className="absolute top-1 right-1 bg-slate-100  px-2 rounded-full rounded-tr-lg border border-slate-300">
            {item.category}
          </span>
          <div className="flex flex-col gap-1 p-2">
            <p className="font-semibold">{item.name}</p>
            <p className="font-normal text-sm">{item.cnpj}</p>
            <p className="font-normal text-xs">{item.contact}</p>
            <p className="font-normal text-xs">
              {item.city} - {item.state}
            </p>
          </div>
          <div className="flex justify-between items-center border border-t-[1px] absolute bottom-0 w-full h-8 px-2">
            <button type="button" className="flex gap-1 text-gray-500 justify-center items-center">
              <ChatCentered size={18} />
              <p className="text-center">{item.comments.length}</p>
            </button>
            <button type="button">
              <DotsThree color="gray" size={24} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
