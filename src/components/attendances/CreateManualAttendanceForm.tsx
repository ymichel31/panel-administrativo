'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { createManualAttendanceAction } from 'actions/attendance';
import { Client } from 'types/client';

type CreateManualAttendanceFormProps = {
  clients: Client[];
};

type ManualAttendanceForm = {
  date: string;
  time: string;
};

function getDefaultDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDefaultTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

function filterClients(clients: Client[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return clients.filter((client) => {
    const firstName = client.first_name.toLowerCase();
    const lastName = client.last_name.toLowerCase();
    const dni = client.dni.toString().toLowerCase();

    return (
      firstName.includes(normalizedQuery) ||
      lastName.includes(normalizedQuery) ||
      dni.includes(normalizedQuery)
    );
  });
}

const emptyForm: ManualAttendanceForm = {
  date: getDefaultDate(),
  time: getDefaultTime(),
};

type ClientSearchResultItemProps = {
  client: Client;
  onSelect: (client: Client) => void;
};

function ClientSearchResultItem({
  client,
  onSelect,
}: ClientSearchResultItemProps) {
  const resultBg = useColorModeValue('gray.50', 'navy.900');
  const resultBorder = useColorModeValue('gray.200', 'whiteAlpha.200');
  const resultHoverBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const labelColor = useColorModeValue('navy.700', 'white');
  const mutedColor = useColorModeValue('gray.500', 'whiteAlpha.700');

  return (
    <Box
      as="button"
      type="button"
      w="100%"
      textAlign="left"
      px="16px"
      py="12px"
      bg={resultBg}
      borderBottomWidth="1px"
      borderColor={resultBorder}
      _last={{ borderBottomWidth: 0 }}
      _hover={{ bg: resultHoverBg }}
      onClick={() => onSelect(client)}
    >
      <Text fontSize="sm" fontWeight="600" color={labelColor}>
        {client.first_name} {client.last_name}
      </Text>
      <Text fontSize="xs" color={mutedColor}>
        DNI: {client.dni}
      </Text>
    </Box>
  );
}

export default function CreateManualAttendanceForm({
  clients,
}: CreateManualAttendanceFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<ManualAttendanceForm>(emptyForm);
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const labelColor = useColorModeValue('navy.700', 'white');
  const mutedColor = useColorModeValue('gray.500', 'whiteAlpha.700');
  const selectedBg = useColorModeValue('brand.50', 'whiteAlpha.100');
  const resultBorder = useColorModeValue('gray.200', 'whiteAlpha.200');

  const activeClients = clients.filter((client) => client.is_active);
  const filteredClients = filterClients(activeClients, clientSearch);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setClientSearch('');
  };

  const handleClearClient = () => {
    setSelectedClient(null);
    setClientSearch('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedClient) {
      return;
    }

    setSaving(true);
    setErrorMsg('');

    const result = await createManualAttendanceAction({
      client_id: selectedClient.id,
      date: form.date,
      time: form.time,
    });

    setSaving(false);

    if (!result.success) {
      setErrorMsg(result.error ?? 'No se pudo registrar la asistencia.');
      return;
    }

    toast({
      title: 'Asistencia registrada',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    router.push('/admin/attendances');
  };

  return (
    <Box pt={{ base: '20px', md: '0px', xl: '0px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Card flexDirection="column" w="100%" maxW="640px" p="30px">
          <Heading color={labelColor} fontSize="28px" mb="8px">
            Registrar asistencia
          </Heading>

          <Text color="gray.400" fontSize="sm" mb="24px">
            Completa los datos para registrar una asistencia manualmente.
          </Text>

          <Box as="form" onSubmit={handleSubmit}>
            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={labelColor}
                mb="8px"
              >
                Cliente
              </FormLabel>

              {selectedClient ? (
                <Flex
                  align="center"
                  justify="space-between"
                  gap="12px"
                  p="12px 16px"
                  borderRadius="12px"
                  bg={selectedBg}
                >
                  <Box>
                    <Text fontSize="sm" fontWeight="600" color={labelColor}>
                      {selectedClient.first_name} {selectedClient.last_name}
                    </Text>
                    <Text fontSize="xs" color={mutedColor}>
                      DNI: {selectedClient.dni}
                    </Text>
                  </Box>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    fontSize="sm"
                    onClick={handleClearClient}
                  >
                    Cambiar
                  </Button>
                </Flex>
              ) : (
                <>
                  <Input
                    variant="auth"
                    fontSize="sm"
                    placeholder="Buscar por nombre o DNI..."
                    size="lg"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                  />

                  {clientSearch.trim() && (
                    <Box
                      mt="8px"
                      borderWidth="1px"
                      borderColor={resultBorder}
                      borderRadius="12px"
                      overflow="hidden"
                      maxH="240px"
                      overflowY="auto"
                    >
                      {filteredClients.length > 0 ? (
                        filteredClients.map((client) => (
                          <ClientSearchResultItem
                            key={client.id}
                            client={client}
                            onSelect={handleSelectClient}
                          />
                        ))
                      ) : (
                        <Text px="16px" py="12px" fontSize="sm" color={mutedColor}>
                          No se encontraron clientes
                        </Text>
                      )}
                    </Box>
                  )}
                </>
              )}
            </FormControl>

            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={labelColor}
                mb="8px"
              >
                Fecha
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                type="date"
                size="lg"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </FormControl>

            <FormControl mb="32px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={labelColor}
                mb="8px"
              >
                Hora
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                type="time"
                size="lg"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </FormControl>

            {errorMsg && (
              <Text color="red.500" fontSize="sm" mb="20px">
                {errorMsg}
              </Text>
            )}

            <Flex gap="12px" flexWrap="wrap">
              <Button
                type="submit"
                variant="brand"
                fontSize="sm"
                fontWeight="500"
                isDisabled={!selectedClient}
                isLoading={saving}
              >
                Guardar asistencia
              </Button>

              <Button
                variant="outline"
                fontSize="sm"
                fontWeight="500"
                onClick={() => router.push('/admin/attendances')}
              >
                Cancelar
              </Button>
            </Flex>
          </Box>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
