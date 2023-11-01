import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Business from '.';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 512,
  background: '#fff',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const regimeItems = ['Simples Nacional', 'Lucro Real', 'Lucro Presumido'];

export const estados = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];
function BusinessForm({ open, onClose, updateBusinessData, business }) {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [feeAmount, setFeeAmount] = useState(0);
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [invoicing, setInvoicing] = useState(0);
  const [collaborators, setCollaborators] = useState(0);
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [regime, setRegime] = useState(regimeItems[0]);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateBusinessData(
        {
          name,
          cnpj,
          fee_amount: feeAmount,
          contact,
          email,
          city,
          state,
          comments: {},
          regime,
          category,
          invoicing,
          collaborators,
          temperature: 'FRIO',
        },
        'create'
      );
      onClose()
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }
    try {
      await updateBusinessData(
        {
          ...business,
          name,
          category,
          cnpj,
          fee_amount: feeAmount,
          contact: { name: contact.name, phone: contact.phone },
          email,
          city,
          state,
          regime,
          invoicing,
          collaborators,
        },
        'update'
      );
      onClose()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (business) {
/* console.log(business) */
      setName(business.name);
      setCategory(business.category);
      setCnpj(business.cnpj);
      setRegime(business.regime);
      setCollaborators(business.collaborators);
      setCity(business.city);
      setState(business.state);
      setInvoicing(business.invoicing);
      setFeeAmount(business.fee_amount);
      setContact(business.contact);
      setEmail(business.email);
      setFormError(''); 
    }
  }, []);

  const handleDelete = async (business) => {
    await updateBusinessData(business, 'delete');
    toggle();
  };

  return (
    <Box component="form" sx={style} noValidate autoComplete="off" onSubmit={business.id ? handleUpdate : handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h5">Cadastrar empresa</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField
            fullWidth
            label="Razão Social"
            id="name"
            size="small"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            fullWidth
            label="Categoria"
            id="name"
            size="small"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField
            sx={{ flex: 3 }}
            label="Cnpj"
            id="cnpj"
            size="small"
            model="cnpj"
            onChange={(e) => setCnpj(e.target.value)}
            value={cnpj}
          />
          <FormControl sx={{ flex: 2 }}>
            <InputLabel>Regime tributário</InputLabel>
            <Select
              value={regime}
              label="Regime tributário"
              onChange={(e) => setRegime(e.target.value)}
              size="small"
            >
              {regimeItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField
            sx={{ flex: 4 }}
            label="Cidade"
            id="city"
            size="small"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <FormControl sx={{ flex: 3 }}>
            <InputLabel>Estados</InputLabel>
            <Select
              value={state}
              label="Estados"
              onChange={(e) => setState(e.target.value)}
              size="small"
            >
              {estados.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField
            label="Faturamento"
            id="invoicing"
            size="small"
            onChange={(e) => setInvoicing(e.target.value)}
          />
          <TextField
            label="Honorário"
            id="fee_amount"
            size="small"
            onChange={(e) => setFeeAmount(e.target.value)}
          />
          <TextField
            label="Qt. de Colaborador"
            id="collaborators"
            size="small"
            onChange={(e) => setCollaborators(e.target.value)}
          />
        </Box>
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight={'bold'}>
            Contato{' '}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <TextField
              label="Nome"
              id="contact_name"
              size="small"
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              value={contact.name}
            />
            <TextField
              label="Telefone"
              id="phone"
              model="phone"
              size="small"
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              value={contact.phone}
            />
          </Box>
          <TextField
            label="Email"
            id="email"
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Stack>

        <Button variant="contained" type="submit">
          {business.id ? 'Atualizar' : 'Cadastrar'}
        </Button>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </Stack>
    </Box>
  );
}

export default BusinessForm;
