/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { ChatCentered, DotsThree } from '@phosphor-icons/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import UpdateCard from './updateCard';

export default function Card({ card, index }) {
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`shadow-md border border-gray-50 bg-white relative flex flex-col gap-1 select-none pt-6 mb-2 h-[150px] overflow-hidden rounded-md  ${
            snapshot.isDragging ? 'bg-white/75 border border-slate-300 shadow-lg ' : 'dark:bg-slate-800'
          } text-zinc-700`}
        >
          <span className="absolute top-1 right-1 bg-slate-100  px-2 rounded-full rounded-tr-lg border border-slate-300">
            {card.category}
          </span>
          <div className="flex flex-col gap-1 p-2">
            <p className="font-semibold">{card.name}</p>
            {/* <p className="font-normal text-sm">{card.cnpj}</p> */}
            <p className="font-medium text-xs">{card.contact.name}</p>
            <p className="font-normal text-xs">
              {card.city} - {card.state}
            </p>
          </div>
          <div className="flex justify-between items-center border-t-[1px] absolute bottom-0 w-full h-8 px-2">
            <button type="button" className="flex gap-1 text-gray-500 justify-center items-center">
              <ChatCentered size={18} />
              <p className="text-center">{card.comments.length}</p>
            </button>
            <button type="button">
              <UpdateCard />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
