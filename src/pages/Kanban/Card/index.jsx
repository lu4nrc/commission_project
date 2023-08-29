
import { ChatCentered, DotsThree } from '@phosphor-icons/react';
import { Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import UpdateCard from './updateCard';
import { supabase } from '../../../services/supabase';

export default function Card({ card, index }) {
  const [cardInfor, setCardInfor] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // Buscar  Empresas do Supabase
      const { data: businessData, error: businessError } = await supabase
        .from('business')
        .select(`*`)
        .eq('id', card.id);

      if (businessError) {
        console.log('FetchError: ', businessError.message);
      } else {
        setCardInfor(businessData[0] || []);
      }
    };

    fetchData();
  }, []);

  if (!cardInfor) {
    // Retornar algo enquanto os dados estão sendo buscados
    return (
      <div
        className="shadow-md border border-gray-50 bg-slate-200-100 mb-2 h-[150px]  flex flex-col  select-none overflow-hidden rounded-md bg-white/75  dark:bg-slate-800 text-zinc-700">
        Carregando...
      </div>
    );
  }

  let tempStyle = '';

  if (cardInfor.temperature === 'FRIO') {
    tempStyle =
      'text-xs p-1 text-blue-700 bg-blue-100 border-blue-300 leading-tight px-2 rounded-full  border border-blue-300';
  } else if (cardInfor.temperature === 'MORNO') {
    tempStyle =
      'text-xs p-1 text-orange-700 bg-orange-100 border-orange-300 leading-tight px-2 rounded-full  border border-orange-300';
  } else {
    tempStyle =
      'text-xs p-1 text-red-700 bg-red-100 border-red-300 leading-tight px-2 rounded-full  border border-red-300';
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
          <div className="flex justify-between h-7  px-1 pt-2">
            {cardInfor.temperature && <span className={tempStyle}>{cardInfor.temperature}</span>}
            <span className="  bg-slate-100 right-auto leading-tight px-2 rounded-full rounded-tr-lg border border-slate-300">
              {cardInfor.category}
            </span>
          </div>
          <div className="flex  p-1 ">
            <div className=" min-h-[80px] flex flex-col gap-1 p-2 w-full">
              <p className="font-semibold truncate">{cardInfor.name}</p>
              <p className="font-medium text-xs truncate">{cardInfor.contact.name}</p>
              <p className="font-normal text-xs truncate">
                {cardInfor.city} - {cardInfor.state}
              </p>
            </div>
          </div>
          <div className=" bottom-0 flex justify-between border-t-[1px] max-h-8 w h-8  px-2">
            <button type="button" className="flex gap-1 text-gray-500 justify-center items-center">
              <ChatCentered size={18} />
              <p className="text-center">{cardInfor.comments.length}</p>
            </button>
            <UpdateCard business={cardInfor} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
