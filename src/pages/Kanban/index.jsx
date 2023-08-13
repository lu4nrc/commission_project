import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { dbUpdateColumn, dbaAddColumn, supabase } from '../../services/supabase';
import Loader from '../../utils/loader';
import Column from './Column';
import CreateColumn from './CreateColumn';

const itemsFromBackend = [
  { id: uuidv4(), content: 'First task' },
  { id: uuidv4(), content: 'Second task' },
  { id: uuidv4(), content: 'Third task' },
  { id: uuidv4(), content: 'Fourth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Fifth task' },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: 'Contato',
    isAdd: true,
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: 'Estudo',
    isAdd: false,
    items: [],
  },
  [uuidv4()]: {
    name: 'Proposta',
    isAdd: false,
    items: [],
  },
  [uuidv4()]: {
    name: 'Fechado',
    isAdd: false,
    items: [],
  },
};

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
    await dbUpdateColumn(sourceColumn.id, sourceItems);
    await dbUpdateColumn(destColumn.id, destItems);
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
    await dbUpdateColumn(column.id, copiedItems);
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
      setColumnData(sortedColumnData || []);
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
          await dbaAddColumn(column);
          newColumnData = [...columnData, column];
          setColumnData(newColumnData);
        } catch (error) {
          setFetchError(error);
        }
        break;
      case 'update':
        try {
          await dbUpdateColumn(column);
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

  /*  // Função para inserir um novo item em uma coluna específica
  async function insertItemIntoColumn(columnName, content) {
    try {
      // Obter os dados atuais da coluna
      const { data: columnData, error: columnError } = await supabase
        .from('columns')
        .select('id, items')
        .eq('name', columnName)
        .single();

      if (columnError) {
        throw columnError;
      }

      const itemId = uuidv4();
      const newItems = [...columnData.items, { id: itemId, content }];

      // Atualizar os itens da coluna
      const { data: updateData, error: updateError } = await supabase
        .from('columns')
        .update({ items: newItems })
        .eq('id', columnData.id);

      if (updateError) {
        throw updateError;
      }

      console.log('Item inserido na coluna com sucesso:', updateData);
    } catch (error) {
      console.error('Erro ao inserir item na coluna:', error.message);
    }
  } */

  useEffect(() => {
    fetchColumnData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-[calc(100vw-200px)] overflow-x-auto">
        <Loader disabled={Loading} />
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columnData, setColumnData)}>
          {Object.entries(columnData).map(([columnId, column], index) => (
            <Column columnId={columnId} column={column} key={index} />
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
