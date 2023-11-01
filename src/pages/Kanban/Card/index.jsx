import { ChatCentered, DotsThree } from '@phosphor-icons/react';
import { Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect, useMemo } from 'react';
import UpdateCard from './updateCard';
import { supabase } from '../../../services/supabase';
import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';

export default function Card({ card, index, updateCards }) {
  const theme = useTheme();
  let tempStyle = '';

  function capitalizar(text) {
  return  text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }


  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Stack
          justifyContent={'space-between'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          height={150}
          boxShadow={theme.shadows[2]}
          borderRadius={1}
          mb={1.5}
          bgcolor={theme.palette.background.paper}
          p={1}
        >
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Chip size="small" label={card.temperature} variant="filled" color={card.temperature === 'FRIO' ? 'secondary' : card.temperature === 'MORNO' ? 'warning': 'error'}/>
            {card.category && <Chip size="small" label={capitalizar(card.category)} variant="outlined" />}
          </Stack>
          <Stack height={'100%'} py={1.5} >
            <Typography noWrap variant="body1" fontWeight={'bold'}>
              {capitalizar(card.name)}
            </Typography>

            {card.contact && (
              <Typography noWrap variant="body1">
                {capitalizar(card.contact.name)}
              </Typography>
            )}
            <Typography noWrap variant="body1" color={theme.palette.text.secondary}>
              {capitalizar(card.city)} - {card.state}
            </Typography>
          </Stack>
          <Stack height={15} spacing={0.5} justifyContent={'center'}>
            <Divider />
            <Stack justifyContent={'space-between'} direction={'row'}>
              <ChatCentered size={18} />
              <UpdateCard cardInfor={card} updateCards={updateCards} />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
}
