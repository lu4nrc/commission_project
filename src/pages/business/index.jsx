import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  dbDeleteBusiness,
  dbUpdateBusiness,
  dbaAddBusiness,
  supabase,
} from '../../services/supabase';
import Loader from '../../utils/loader';
import BusinessForm from './BusinessForm';

function Business() {
  const [Loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState([]);
  const [business, setBusiness] = useState();
  const [fetchError, setFetchError] = useState('');
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setBusiness('');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const filteredRows = businessData.filter(
    (row) =>
      row.name.toLowerCase().includes(filter.toLowerCase()) ||
      row.name.toLowerCase().includes(filter.toLowerCase()) ||
      row.cnpj.toLowerCase().includes(filter.toLowerCase())
  );

  const updateBusinessData = async (business, type) => {
    let newBusinessData;
    setLoading(true);
    switch (type) {
      case 'create':
        try {
          await dbaAddBusiness(business);
          newBusinessData = [...businessData, business];
          setBusinessData(newBusinessData);
        } catch (error) {
          console.error('Ocorreu um erro ao adicionar empresa:', error.message);
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
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    setLoading(true);
    let { data, error } = await supabase.from('business').select('*');

    if (error) {
      setFetchError('Não foi possível buscar');
      setBusinessData([]);
      console.log(error);
    } else {
      data.sort((a, b) => a.name.localeCompare(b.name));
      setBusinessData(data || []);
      setFetchError('');
    }
    setLoading(false);
  };

  function capitalizar(text) {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function handleEdit(business) {
    setBusiness(business);
    setOpen(true);
  }

  return (
    <Stack p={1.5} sx={{ width: '100%', overflow: 'hidden' }}>
      <Loader disabled={Loading} />
      <Modal open={open} onClose={handleClose}>
        <BusinessForm
          updateBusinessData={updateBusinessData}
          business={business}
          onClose={handleClose}
        />
      </Modal>
      <Stack
        bgcolor="#fff"
        p={1.5}
        borderRadius={2}
        sx={{ height: 'calc(100vh - 25px)' }}
        spacing={2}
      >
        <Typography variant="h4" fontWeight="medium">
          Empresas
        </Typography>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <TextField
            fullWidth
            type="text"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por nome da empresa"
          />
          <Button fullWidth sx={{ maxWidth: 200 }} variant="contained" onClick={handleOpen}>
            Criar Nova
          </Button>
        </Stack>

        {/*  <DataGrid rows={filteredRows} columns={columns} pageSize={5} /> */}

        <TableContainer /* sx={{ maxHeight: 'calc(100vh - 200px)' }} */>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Nome da empresa</TableCell>
                <TableCell>Cnpj</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows &&
                filteredRows.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1" fontWeight={'bold'}>
                          {capitalizar(business.name)}
                        </Typography>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                          {capitalizar(business.contact.name)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color={theme.palette.text.secondary}>
                        {business.cnpj}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{ maxWidth: 200 }}
                        variant="outlined"
                        onClick={() => handleEdit(business)}
                      >
                        Editar
                      </Button>

                      {/* <UpdateBusiness business={business} updateBusinessData={updateBusinessData} /> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}

export default Business;
