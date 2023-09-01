
import { ChatCentered, DotsThree } from '@phosphor-icons/react';
import { Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect, useMemo } from 'react';
import UpdateCard from './updateCard';
import { supabase } from '../../../services/supabase';


export default function Card({ card, index, updateCards }) {

  let tempStyle = '';


  if (card.temperature === 'FRIO') {
    tempStyle =
      'text-xs p-1 text-blue-700 bg-blue-100 border-blue-300 leading-tight px-2 rounded-full  border border-blue-300';
  } else if (card.temperature === 'MORNO') {
    tempStyle =
      'text-xs p-1 text-orange-700 bg-orange-100 border-orange-300 leading-tight px-2 rounded-full  border border-orange-300';
  } else if(card.temperature === 'QUENTE') {
    tempStyle =
      'text-xs p-1 text-red-700 bg-red-100 border-red-300 leading-tight px-2 rounded-full  border border-red-300';
  } else {
    tempStyle =
      'text-xs p-1 text-green-700 bg-green-100 border-green-300 leading-tight px-2 rounded-full  border border-green-300';
  }

  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`shadow-md border h-[150px] border-gray-50 bg-white mb-2  flex flex-col  select-none overflow-hidden rounded-md  ${
            snapshot.isDragging
              ? 'bg-white/75 border border-slate-300 shadow-lg '
              : 'dark:bg-slate-800'
          } text-zinc-700`}
        >
          <div className="flex justify-between h-8  px-1 pt-2">
            {card.temperature && <span className={tempStyle}>{card.temperature}</span>}
            <span className="  bg-slate-100 right-auto leading-tight px-2 rounded-full rounded-tr-lg border border-slate-300">
              {card.category}
            </span>
          </div>
          <div className="flex  p-1 ">
            <div className=" min-h-[80px] flex flex-col gap-1 p-2 w-full">
              <p className="font-semibold truncate">{card.name}</p>
              {card.contact && <p className="font-medium text-xs truncate">{card.contact.name}</p>}
              <p className="font-normal text-xs truncate">
                {card.city} - {card.state}
              </p>
            </div>
          </div>
          <div className=" bottom-0 flex justify-between border-t-[1px] max-h-8 w h-8  px-2">
            <button type="button" className="flex gap-1 text-gray-500 justify-center items-center">
              <ChatCentered size={18} />
              {/* <p className="text-center">{card.comments.length}</p> */}
            </button>
            <UpdateCard cardInfor={card} updateCards={updateCards}/>
          </div>
        </div>
      )}
    </Draggable>
  );
}
