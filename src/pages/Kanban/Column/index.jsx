import { Plus } from '@phosphor-icons/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import '../../../utils/scroll.css';
import Card from '../Card';
export default function Column({ column, columnId }) {
  console.log(column.isAdd);
  return (
    <div className="flex flex-col w-80" key={columnId}>
      <header className="flex justify-between h-14 bg-white border items-center p-3">
        <h2 className="font-semibold">{column.name}</h2>
        {column.isAdd && (
          <button type="button" className="cursor-pointer bg-emerald-500 rounded-lg p-1">
            <Plus size={24} color="#fff" />
          </button>
        )}
      </header>
      <div className=" ">
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? 'bg-red-0' : 'bg-blue-0'
              } p-1 w-full p-3 h-[calc(100vh-115px)] overflow-y-auto column border-l-[1px]`}
            >
              {column.items.map((item, index) => (
                <Card item={item} index={index} key={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
