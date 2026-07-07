'use client';

import {
  Box,
  Button,
  Checkbox,
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
import { updatePlanAction } from 'actions/plans';
import { Plan, UpdatePlan } from 'types/plan';

type EditPlanFormProps = {
  plan: Plan;
};

export default function EditPlanForm({ plan }: EditPlanFormProps) {
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState<UpdatePlan>({
    name: plan.name,
    days: plan.days,
    total_classes: plan.total_classes,
    price: plan.price,
    unlimited: plan.unlimited,
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setErrorMsg('');

    const result = await updatePlanAction(plan.id, {
      name: form.name.trim(),
      days: form.days,
      total_classes: form.unlimited ? 0 : form.total_classes,
      price: form.price,
      unlimited: form.unlimited,
    });

    setSaving(false);

    if (!result.success) {
      setErrorMsg(result.error ?? 'No se pudo actualizar el plan.');
      return;
    }

    toast({
      title: 'Plan actualizado',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    router.push('/admin/plans');
  };

  return (
    <Box pt={{ base: '20px', md: '0px', xl: '0px' }}>
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
            Editar plan
          </Heading>

          <Text color="gray.400" fontSize="sm" mb="24px">
            Modifica los datos del plan.
          </Text>

          <Box as="form" onSubmit={handleSubmit}>
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
                placeholder="Nombre del plan"
                size="lg"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Días de vigencia
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                placeholder="30"
                size="lg"
                type="number"
                min={1}
                value={form.days || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    days: Number(e.target.value),
                  })
                }
              />
            </FormControl>

            <FormControl mb="24px" isRequired={!form.unlimited}>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Total de clases
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                placeholder="12"
                size="lg"
                type="number"
                min={1}
                isDisabled={form.unlimited}
                value={form.unlimited ? '' : form.total_classes || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    total_classes: Number(e.target.value),
                  })
                }
              />
            </FormControl>

            <FormControl mb="24px" isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={useColorModeValue('navy.700', 'white')}
                mb="8px"
              >
                Precio
              </FormLabel>

              <Input
                variant="auth"
                fontSize="sm"
                placeholder="150000"
                size="lg"
                type="number"
                min={0}
                value={form.price || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Number(e.target.value),
                  })
                }
              />
            </FormControl>

            <FormControl mb="32px">
              <Checkbox
                colorScheme="brand"
                isChecked={form.unlimited}
                onChange={(e) =>
                  setForm({
                    ...form,
                    unlimited: e.target.checked,
                  })
                }
              >
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color={useColorModeValue('navy.700', 'white')}
                >
                  Plan ilimitado
                </Text>
              </Checkbox>
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
                Guardar cambios
              </Button>

              <Button
                variant="outline"
                fontSize="sm"
                fontWeight="500"
                onClick={() => router.push('/admin/plans')}
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
