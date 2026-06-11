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
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateClientAction } from 'actions/clients';
import { getClientById } from 'services/clients';
import { ClientForm } from 'types/client';

const emptyForm: ClientForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  plan_id: null,
  code: '',
};

const formatDate = (value?: string) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('es-CO');
};

export default function EditClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState<ClientForm>(emptyForm);
  const [createdAt, setCreatedAt] = useState<string>();
  const [updatedAt, setUpdatedAt] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setErrorMsg('');

      const client = await getClientById(id);

      if (!client) {
        setErrorMsg('No se pudo cargar el cliente.');
        return;
      }

      setForm({
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        phone: client.phone,
        plan_id: client.plan_id,
        code: client.code,
      });

      setCreatedAt(client.created_at);
      setUpdatedAt(client.updated_at);
    };

    load();
  }, [id]);

  const handleChange = (
    field: keyof ClientForm,
    value: string | number | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    const result = await updateClientAction(id, form);

    setSaving(false);

    if (!result.success) {
      setErrorMsg('No se pudo guardar los cambios.');
      return;
    }

    toast({
      title: 'Cliente actualizado',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    router.push('/admin/clients');
  };

  return (
    <Box>
      <Flex justify="space-between" mb="20px">
        <Heading size="lg" color={useColorModeValue('navy.700', 'white')}>
          Editar cliente
        </Heading>

        <Button onClick={() => router.push('/admin/clients')}>
          Volver
        </Button>
      </Flex>

      <Card p="30px">
        <FormControl as="form" onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="24px">

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Nombre
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                value={form.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Apellido
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                value={form.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Email
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Teléfono
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Código
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                value={form.code}
                onChange={(e) => handleChange('code', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Plan
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                type="number"
                value={form.plan_id ?? ''}
                onChange={(e) =>
                  handleChange(
                    'plan_id',
                    e.target.value === '' ? null : Number(e.target.value),
                  )
                }
              />
            </Box>

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Creado
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                readOnly
                value={formatDate(createdAt)}
              />
            </Box>

            <Box>
              <FormLabel color={useColorModeValue('navy.700', 'white')}>
                Actualizado
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={useColorModeValue('navy.700', 'white')}
                readOnly
                value={formatDate(updatedAt)}
              />
            </Box>

          </SimpleGrid>

          {errorMsg && (
            <Text color="red.500" mt="20px">
              {errorMsg}
            </Text>
          )}

          <Flex mt="30px" justify="flex-end" gap="12px">
            <Button variant="outline" onClick={() => router.push('/admin/clients')}>
              Cancelar
            </Button>

            <Button type="submit" isLoading={saving}>
              Guardar
            </Button>
          </Flex>

        </FormControl>
      </Card>
    </Box>
  );
}