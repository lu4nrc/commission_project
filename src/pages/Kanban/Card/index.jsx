/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
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
          className={`select-none  p-4 mb-2 min-h-[85px] rounded-md border border-slate-300 ${
            snapshot.isDragging ? 'bg-white/75 border border-slate-300 shadow-md ' : 'bg-white'
          } text-zinc-700`}
          /*           style={{
            userSelect: 'none',
            padding: 16,
            margin: '0 0 8px 0',
            minHeight: '50px',
            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
            color: 'white',
            ...provided.draggableProps.style,
          }} */
        >
          <p className="font-semibold">{item.content}</p>
        </div>
      )}
    </Draggable>
  );
}
