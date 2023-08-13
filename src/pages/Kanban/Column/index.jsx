import { DotsThreeVertical } from '@phosphor-icons/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import '../../../utils/scroll.css';
import Card from '../Card';
import CreateCard from '../CreateCard';
export default function Column({ column, columnId }) {
  const updateCardData = async (card, type) => {
    setLoading(true);
    let newCardData;
    switch (type) {
      case 'create':
        try {
          await dbaAddCard(card);
          newCardData = [...columnData, card];
          setColumnData(newCardData);
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
          await dbDeleteBusiness(business);
          newBusinessData = businessData.filter((empresa) => empresa.id !== business.id);
          setBusinessData(newBusinessData);
          console.log('Remove OK');
        } catch (error) {
          console.log('error');
        }

        break;

      default:
        break;
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-w-[320px] w-80" key={columnId}>
      <header className="flex justify-between h-14 bg-white border items-center p-3">
        <div>
          <h2 className="font-semibold">{column.name}</h2>
          <a href="#" title="Numero de cards na coluna">
            <span className="text-ms font-semibold text-gray-400">{column.items.length} Total</span>
          </a>
        </div>
        <div className="flex gap-2">
          {column.isadd && <CreateCard updateCardData={updateCardData} />}
          <button type="button" className="cursor-pointer rounded-lg p-1">
            <DotsThreeVertical size={24} color="gray" />
          </button>
        </div>
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
