import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import '../../../utils/scroll.css';
import Card from '../Card';
import CreateCard from '../Card/CreateCard';
import UpdateColumn from '../UpdateColumn';
import { supabase } from '../../../services/supabase';
import { useState } from 'react';

export default function Column({ column, columnId, updateColumnData }) {
  const updateCards = async (item, type) => {
    console.log(item);
    let items = [...column.items, item];
    let updateColumn = { ...column, items };
    switch (type) {
      case 'create':
        try {
          await supabase.from('business').update({ is_card: true }).eq('id', item.id);
          updateColumnData(updateColumn, 'update_items');
        } catch (error) {
          console.log(error);
        }
        break;

      case 'update':
        try {
          await dbUpdateBusiness(business);
          newBusinessData = businessData.map((oldBusiness) =>
            oldBusiness.id === business.id ? business : oldBusiness
          );
          setBusinessData(newBusinessData);
        } catch (error) {
          business;
        }

        break;
      case 'delete':
        try {
          await dbDeleteColumn(column);
          newBusinessData = businessData.filter((empresa) => empresa.id !== business.id);
          setBusinessData(newBusinessData);
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-w-[310px] w-80" key={columnId}>
      <header className="flex justify-between h-14 bg-white border items-center p-3">
        <div className="flex gap-2">
          <h2 className="font-semibold">{column.name}</h2>
          <a href="#" title="Numero de cards na coluna">
            <span className="text-ms font-semibold text-gray-400">({column.items.length})</span>
          </a>
        </div>
        <div className="flex gap-2">
          {column.isadd && <CreateCard updateCards={updateCards} />}
          <UpdateColumn column={column} updateColumnData={updateColumnData} />
        </div>
      </header>
      <div>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? 'bg-red-0' : 'bg-blue-0'
              } p-1 w-full p-3 h-[calc(100vh-115px)] overflow-y-auto column border-l-[1px] `}
            >
              {column.items.map((card, index) => (
                <Card card={card} updateCards={updateCards} index={index} key={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
