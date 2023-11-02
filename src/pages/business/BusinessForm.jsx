import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { supabase } from '../../services/supabase';

const fileTypes = ['PDF', 'docx', 'doc', 'xlsx', 'xls'];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 512,
  bgcolor: '#fff',
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
  const [filesPath, setFilesPath] = useState(business.files);
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    feeAmount: 0,
    contact: { name: '', phone: '' },
    email: '',
    city: '',
    invoicing: 0,
    collaborators: 0,
    category: '',
    state: '',
    files: [],
    regime: regimeItems[0],
    formError: '',
  });

  useEffect(() => {
    if (business.id) {
      setFormData(business);
    }
  }, [business]);

  const {
    name,
    cnpj,
    feeAmount,
    contact,
    email,
    city,
    invoicing,
    collaborators,
    category,
    state,
    files,
    regime,
    formError,
  } = formData;

  const setFormError = (error) => {
    setFormData({ ...formData, formError: error });
  };

  const handleFileUpload = async (files) => {
    const uploadedFilePaths = [];

    for (const file of files) {
      const folderName = `${business.id}`;
      const fileName = `${file.name}`;
      const filePath = `${folderName}/${fileName}`;
      const { data, error } = await supabase.storage.from('businessfiles').upload(filePath, file);
      if (data) {
        uploadedFilePaths.push(data.path);
      } else {
        console.log(error);
      }
    }

    return uploadedFilePaths;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setFormError('Preencha todos os campos corretamente.');
      return;
    }

    try {
      const filePaths = await handleFileUpload(files);

      if (!filePaths) {
        setFormError('Erro ao enviar o arquivo.');
        return;
      }

      const fileData = filePaths.map((path) => ({ path }));

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
          files: fileData,
        },
        'create'
      );
      onClose();
    } catch (error) {
      console.log('Create Error:', error);
      setFormError('Preencha todos os campos corretamente.', error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name) {
      setFormError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    try {
      const filePaths = await handleFileUpload(files);

      if (!filePaths) {
        setFormError('Erro ao enviar o arquivo.');
        return;
      }

      const updatedFiles = [...filePaths];
      const oldPaths = [...filesPath]; // Inicialize oldPaths como um array vazio

      oldPaths.push(...updatedFiles);

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
          files: oldPaths, // Use oldPaths ao atualizar os arquivos
        },
        'update'
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChipClick = (label) => {
    if (label) {
      const publicUrl = supabase.storage.from('businessfiles').getPublicUrl(label, 60);

      window.open(publicUrl.data.publicUrl, '_blank');
    }
  };

  const handleFileDelete = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('businessfiles').remove(path);
      if (data) {
        const updatedFilesPath = filesPath.filter((file) => file !== path);
        setFilesPath(updatedFilesPath);
        const updatedBusinessFiles = formData.files.filter((file) => file !== path);

        setFormData({ ...formData, files: updatedBusinessFiles });
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const removeBeforeLastSlash = (str) => {
    const lastIndex = str.lastIndexOf('/');
    if (lastIndex !== -1) {
      return str.substring(lastIndex + 1);
    }
    return str;
  };

  return (
    <Box
      component="form"
      sx={style}
      noValidate
      autoComplete="off"
      onSubmit={business.id ? handleUpdate : handleSubmit}
    >
      <Stack spacing={2}>
        <Typography variant="h5">Cadastrar empresa</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField
            fullWidth
            label="Razão Social"
            id="name"
            size="small"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={name}
          />
          <TextField
            fullWidth
            label="Categoria"
            id="name"
            size="small"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
            value={cnpj}
          />
          <FormControl sx={{ flex: 2 }}>
            <InputLabel>Regime tributário</InputLabel>
            <Select
              value={regime}
              label="Regime tributário"
              onChange={(e) => setFormData({ ...formData, regime: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            value={city}
          />
          <FormControl sx={{ flex: 3 }}>
            <InputLabel>Estados</InputLabel>
            <Select
              value={state}
              label="Estados"
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, invoicing: e.target.value })}
          />
          <TextField
            label="Honorário"
            id="fee_amount"
            size="small"
            onChange={(e) => setFormData({ ...formData, fee_amount: e.target.value })}
          />
          <TextField
            label="Qt. de Colaborador"
            id="collaborators"
            size="small"
            onChange={(e) => setFormData({ ...formData, collaborators: e.target.value })}
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
              onChange={(e) =>
                setFormData({ ...formData, contact: { ...contact, name: e.target.value } })
              }
              value={contact.name}
            />
            <TextField
              label="Telefone"
              id="phone"
              model="phone"
              size="small"
              onChange={(e) =>
                setFormData({ ...formData, contact: { ...contact, phone: e.target.value } })
              }
              value={contact.phone}
            />
          </Box>
          <TextField
            label="Email"
            id="email"
            size="small"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={email}
          />
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems="center" flexWrap="wrap" maxWidth={400}>
          <Typography variant="subtitle1" fontWeight="bold">
            Arquivos anexados:
          </Typography>
          {filesPath.map((el, index) => (
            <Chip
              key={index}
              label={removeBeforeLastSlash(el)}
              onDelete={() => handleFileDelete(el)}
              clickable
              onClick={() => handleChipClick(el)}
              sx={{
                backgroundColor: '#f3f3f3',
                color: '#333',
                fontWeight: '600',
                maxWidth: '100%',
              }}
            />
          ))}
        </Stack>
        <FileUploader
          maxSize={5}
          label="Carregue ou solte arquivos aqui"
          handleChange={(files) => setFormData({ ...formData, files: files })}
          name="Files"
          types={fileTypes}
          multiple
        >
          {/*               <div>
                <p>this is inside drop area</p>
              </div> */}
        </FileUploader>
        <Button variant="contained" type="submit">
          {business.id ? 'Atualizar' : 'Cadastrar'}
        </Button>
        {formError && <p className="text-sm text-red-400">{formError}</p>}
      </Stack>
    </Box>
  );
}

export default BusinessForm;
