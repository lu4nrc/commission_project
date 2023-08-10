import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../services/supabase';

import Column from './Column';

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

const onDragEnd = (result, columns, setColumns) => {
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
  }
};

function Kanban() {
  const [columns, setColumns] = useState(columnsFromBackend);

  // Função para inserir um novo item em uma coluna específica
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
  }

  useEffect(() => {
    console.table(columns);
  }, [columns]);

  return (
    <div className="flex h-full ">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <Column columnId={columnId} column={column} key={index} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default Kanban;
