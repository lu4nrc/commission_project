import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  dbUpdateColumnItems,
  dbUpdateColumnName,
  dbaAddColumn,
  supabase,
} from '../../services/supabase';
import Loader from '../../utils/loader';
import Column from './Column';
import CreateColumn from './CreateColumn';

async function onDragEnd(result, columns, setColumns) {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
    await dbUpdateColumnItems(sourceColumn.id, sourceItems);
    await dbUpdateColumnItems(destColumn.id, destItems);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
    await dbUpdateColumnItems(column.id, copiedItems);
  }
}

function Kanban() {
  const [columnData, setColumnData] = useState({});
  const [fetchError, setFetchError] = useState();
  const [Loading, setLoading] = useState(false);

  const fetchColumnData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('columns').select('*');

    if (error) {
      setFetchError('Não foi possível buscar');
      setColumnData([]);
    } else {
      const sortedColumnData = [...data].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      const updateData = await updateArray(sortedColumnData);

      setColumnData(updateData || []);
      setFetchError('');
    }
    setLoading(false);
  };

  const updateColumnData = async (column, type) => {
    setLoading(true);
    let newColumnData;
    switch (type) {
      case 'create':
        try {
          newColumnData = [...columnData, column];
          setColumnData(newColumnData);
          await dbaAddColumn(column);
        } catch (error) {
          setFetchError(error);
        }
        break;
      case 'update_name':
        try {
          await dbUpdateColumnName(column);
          newColumnData = columnData.map((oldColumn) =>
            oldColumn.id === column.id ? column : oldColumn
          );
          setColumnData(newColumnData);
        } catch (error) {
          setFetchError(error);
        }
        break;
      case 'update_items':
        try {
          newColumnData = columnData.map((oldColumn) =>
          oldColumn.id === column.id ? column : oldColumn
          );
          setColumnData(newColumnData);
          await dbUpdateColumnItems(column.id, column.items);
        } catch (error) {
          setFetchError(error);
        }
        break;
      default:
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchColumnData();
  }, []);

  //ChatGPT
  const fetchBusinessesBatch = async (cardIds) => {
    const { data: businessesData, error: businessesError } = await supabase
      .from('business')
      .select('*')
      .in('id', cardIds);

    if (businessesError) {
      console.log('FetchError: ', businessesError.message);
      return [];
    } else {
      return businessesData;
    }
  };

  //ChatGPT
  async function updateArray(array) {
    const cardIds = array.reduce((ids, column) => {
      column.items.forEach((card) => ids.add(card.id));
      return ids;
    }, new Set());

    const businessData = await fetchBusinessesBatch(Array.from(cardIds));

    const updatedArray = array.map((column) => ({
      ...column,
      items: column.items.map((card) => {
        const updatedCard = businessData.find((business) => business.id === card.id);
        return updatedCard || card;
      }),
    }));

    return updatedArray;
  }

  return (
    <div className="w-full">
      <div className="flex w-[calc(100vw-200px)] overflow-x-auto">
        <Loader disabled={Loading} />
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columnData, setColumnData)}>
          {Object.entries(columnData).map(([columnId, column], index) => (
            <Column
              columnId={columnId}
              column={column}
              key={index}
              updateColumnData={updateColumnData}
            />
          ))}
          <div className="m-2">
            <CreateColumn updateColumnData={updateColumnData} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Kanban;
