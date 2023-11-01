/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import '../../../utils/scroll.css';
import Card from '../Card';
import CreateCard from '../Card/CreateCard';
import UpdateColumn from '../UpdateColumn';
import { supabase } from '../../../services/supabase';
import { InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';


const lightColorsArray = [
  "#F08080",
  "#E0FFFF",
  "#FFD700",
  "#90EE90",
  "#FFB6C1",
  "#FFA07A",
  "#20B2AA",
  "#87CEFA",
  "#778899",
  "#B0C4DE",
  "#7B68EE",
  "#00FA9A",
  "#ADD8E6",
  "#F0E68C",
  "#D3D3D3",
  "#FFA07A",
  "#98FB98",
  "#AFEEEE",
  "#FF69B4",
  "#D2B48C"
];

const selectRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * lightColorsArray.length);
  return lightColorsArray[randomIndex];
};

export default function Column({ column, columnId, updateColumnData, updateItems }) {
  /* const [cards, setCards] = useState(column.items); */
  const [textfilter, settextfilter] = useState('');
  const theme = useTheme();

  function filteredCards(cards) {
    if (textfilter !== null || textfilter !== '') {
      return cards.filter((card) => card.name.toLowerCase().includes(textfilter));
    }
    return cards;
  }

  const updateCards = async (item, type) => {
    let items = [item, ...column.items];
    let updateColumn = { ...column, items };

    switch (type) {
      case 'create':
        try {
          await supabase.from('business').update({ is_card: true }).eq('id', item.id);
          updateItems(updateColumn);
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

          updateItems(updateColumn);
        } catch (error) {
          console.log(error);
        }
        break;
      case 'delete':
        try {
          await supabase.from('business').update({ is_card: false }).eq('id', item.id);
          items = column.items.filter((existingItem) => existingItem.id !== item.id);
          updateColumn = { ...column, items };
          updateItems(updateColumn);
        } catch (error) {
          console.log(error);
        }
        break;

      default:
        break;
    }
  };

  return (
    <Stack spacing={0.5} minWidth={330} ml={0.5} boxShadow={theme.shadows[3]}>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor={theme.palette.background.paper}
        px={2}
        py={1}
        borderBottom={`4px solid ${selectRandomColor()}`}
      >
        <Stack justifyContent="center" direction="row" width="100%" spacing={1}>
          <Typography>{column.name}</Typography>
          <Typography variant="body2">({column.items.length})</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {column.isadd && <CreateCard updateCards={updateCards} />}
          <UpdateColumn column={column} updateColumnData={updateColumnData} />
        </Stack>
      </Stack>
      <Stack  px={2} py={1} borderRadius={2}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlass size={24}  />
              </InputAdornment>
            ),
          }}
          size="small"
          fullWidth
          onChange={(e) => settextfilter(e.target.value)}
        />
      </Stack>
      <div>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? 'bg-red-0' : 'bg-blue-0'
              } p-1 w-full p-3 h-[calc(100vh-130px)] overflow-y-auto column border-l-[1px] `}
            >
              {filteredCards(column.items, 'labor').map((card, index) => (
                <Card card={card} updateCards={updateCards} index={index} key={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Stack>
  );
}
