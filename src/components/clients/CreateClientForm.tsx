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
import { FormEvent, useState } from 'react';
import { createClientAction } from 'actions/clients';
import { CreateClient } from 'types/client';
import { Plan } from 'types/plan';

type CreateClientFormProps = {
  plans: Plan[];
};

const emptyForm: CreateClient = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  plan_id: 0,
  dni: 0,
};

export default function CreateClientForm({ plans }: CreateClientFormProps) {
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState<CreateClient>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setErrorMsg('');

    const result = await createClientAction({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      plan_id: form.plan_id,
      dni: form.dni,
    });

    setSaving(false);

    if (!result.success) {
      setErrorMsg(result.error ?? 'No se pudo crear el cliente.');
      return;
    }

    toast({
      title: 'Cliente creado',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    router.push('/admin/clients');
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Card flexDirection="column" w="100%" maxW="640px" p="30px">
          <Heading
            color={useColorModeValue('navy.700', 'white')}
            fontSize="28px"
            mb="8px"
          >
            Nuevo cliente
          </Heading>

          <Text color="gray.400" fontSize="sm" mb="24px">
            Completa los datos para registrar un cliente.
          </Text>

          <Box as="form" onSubmit={handleSubmit}>
            {/* Nombre */}
            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Nombre
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                placeholder="Nombre del cliente"
                size="lg"
                value={form.first_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    first_name: e.target.value,
                  })
                }
              />
            </FormControl>

            {/* Apellido */}
            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Apellido
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                placeholder="Apellido del cliente"
                size="lg"
                value={form.last_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    last_name: e.target.value,
                  })
                }
              />
            </FormControl>

            {/* Email */}
            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Email
              </FormLabel>

              <Input
                type="email"
                variant="auth"
                fontSize="sm"
                placeholder="email@cliente.com"
                size="lg"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </FormControl>

            {/* Teléfono */}
            <FormControl mb="24px">
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Teléfono
              </FormLabel>

              <Input
                type="tel"
                variant="auth"
                fontSize="sm"
                placeholder="Teléfono del cliente"
                size="lg"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </FormControl>

            {/* Código */}
            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                DNI
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                placeholder="CC: 123456"
                size="lg"
                type="number"
                value={form.dni}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dni: Number(e.target.value),
                  })
                }
              />
            </FormControl>

            {/* Plan */}
            <FormControl mb="32px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Plan
              </FormLabel>

              <Select
                variant="auth"
                fontSize="sm"
                placeholder="Selecciona un plan"
                size="lg"
                value={form.plan_id ?? ''}
                onChange={(e) => {
                  if (e.target.value === '') {
                    setForm({ ...form, plan_id: null });
                  } else {
                    setForm({
                      ...form,
                      plan_id: Number(e.target.value),
                    });
                  }
                }}
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </Select>
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
                isLoading={saving}
              >
                Guardar cliente
              </Button>

              <Button
                variant="outline"
                fontSize="sm"
                fontWeight="500"
                onClick={() => router.push('/admin/clients')}
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
