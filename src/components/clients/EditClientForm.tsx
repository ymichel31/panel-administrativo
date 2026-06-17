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
import { useState } from 'react';
import { updateClientAction } from 'actions/clients';
import { Client, ClientForm } from 'types/client';
import { formatDate } from 'utils/date';

type EditClientFormProps = {
  client: Client;
};

type ClientFormValue = string | number | null;

export default function EditClientForm({ client }: EditClientFormProps) {
  const router = useRouter();
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');

  const [form, setForm] = useState<ClientForm>({
    first_name: client.first_name,
    last_name: client.last_name,
    email: client.email,
    phone: client.phone,
    plan_id: client.plan_id,
    code: client.code,
  });
  
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: string, value: ClientFormValue) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    const result = await updateClientAction(client.id, form);

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
        <Heading size="lg" color={textColor}>
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
              <FormLabel color={textColor}>Nombre</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                value={form.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={textColor}>Apellido</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                value={form.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={textColor}>Email</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={textColor}>Teléfono</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={textColor}>Código</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                value={form.code}
                onChange={(e) => handleChange('code', e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel color={textColor}>Plan</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                type="number"
                value={form.plan_id ?? ''}
                onChange={(e) => {
                  if (e.target.value === '') {
                    handleChange('plan_id', null);
                  } else {
                    handleChange('plan_id', Number(e.target.value));
                  }
                }}
              />
            </Box>

            <Box>
              <FormLabel color={textColor}>Creado</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                readOnly
                value={formatDate(client.created_at)}
              />
            </Box>

            <Box>
              <FormLabel color={textColor}>Actualizado</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                readOnly
                value={formatDate(client.updated_at)}
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
