'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateClientAction } from 'actions/clients';
import { Client, UpdateClient } from 'types/client';
import { Plan } from 'types/plan';

type EditClientFormProps = {
  client: Client;
  plans: Plan[];
};

type ClientFormValue = string | number | null;

export default function EditClientForm({ client, plans }: EditClientFormProps) {
  const router = useRouter();
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');

  const [form, setForm] = useState<UpdateClient>({
    first_name: client.first_name,
    last_name: client.last_name,
    email: client.email,
    phone: client.phone,
    plan_id: client.plan_id,
    dni: client.dni,
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

        <Button onClick={() => router.push('/admin/clients')}>Volver</Button>
      </Flex>

      <Card p="30px">
        <FormControl as="form" onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="24px">
            {/* Nombre */}
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

            {/* Apellido */}
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

            {/* Email */}
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

            {/* Teléfono */}
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

            {/* DNI */}
            <Box>
              <FormLabel color={textColor}>DNI</FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                value={form.dni}
                onChange={(e) => handleChange('dni', Number(e.target.value))}
              />
            </Box>

            {/* Plan */}
            <Box>
              <FormLabel color={textColor}>Plan</FormLabel>
              <Select
                variant="auth"
                fontSize="sm"
                size="lg"
                color={textColor}
                placeholder="Selecciona un plan"
                value={form.plan_id ?? ''}
                onChange={(e) => {
                  if (e.target.value === '') {
                    handleChange('plan_id', null);
                  } else {
                    handleChange('plan_id', Number(e.target.value));
                  }
                }}
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </Select>
            </Box>
          </SimpleGrid>

          {errorMsg && (
            <Text color="red.500" mt="20px">
              {errorMsg}
            </Text>
          )}

          <Flex mt="30px" justify="flex-end" gap="12px">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/clients')}
            >
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
