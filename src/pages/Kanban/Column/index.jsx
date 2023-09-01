import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import '../../../utils/scroll.css';
import Card from '../Card';
import CreateCard from '../Card/CreateCard';
import UpdateColumn from '../UpdateColumn';
import { dbUpdateBusiness, supabase } from '../../../services/supabase';

export default function Column({ column, columnId, updateColumnData }) {
  const updateCards = async (item, type) => {

    let items = [...column.items, item];
    let updateColumn = { ...column, items };;


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
          items = column.items.map((existingItem) => {
            if (existingItem.id === item.id) {
              return item;
            }
            return existingItem;
          });
          updateColumn = { ...column, items };
          await supabase
            .from('business')
            .update({ temperature: item.temperature })
            .eq('id', item.id);
          updateColumnData(updateColumn, 'update_items');
        } catch (error) {
          console.log(error);
        }
        break;
      case 'delete':
    
        try {
          await supabase.from('business').update({ is_card: false }).eq('id', item.id);
          items = column.items.filter((existingItem) => existingItem.id !== item.id);
          updateColumn = { ...column, items };
          updateColumnData(updateColumn, 'update_items');
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
