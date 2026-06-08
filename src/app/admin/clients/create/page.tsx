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
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Link from 'next/link';
import { useState } from 'react';

type PlanValue = 'Básico' | 'Pro' | 'Premium' | 'Enterprise' | 'Días';

type PlanOption = {
  value: PlanValue;
  label: string;
  days: number;
};

const PLAN_OPTIONS: PlanOption[] = [
  { value: 'Básico', label: 'Básico', days: 5 },
  { value: 'Pro', label: 'Pro', days: 20 },
  { value: 'Premium', label: 'Premium', days: 12 },
  { value: 'Enterprise', label: 'Enterprise', days: 8 },
  { value: 'Días', label: 'Días', days: null },
];

export default function CreateClient() {
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [planType, setPlanType] = useState<PlanValue | ''>('');
  const [daysAvailable, setDaysAvailable] = useState('');

  const isManualDays = planType === 'Días';

  const daysPlaceholder = isManualDays
    ? 'Ingresa los días'
    : 'Selecciona un plan';

  const handlePlanChange = (value: string) => {
    const plan = PLAN_OPTIONS.find(
      (item) => item.value === value
    );

    if (!plan) {
      setPlanType('');
      setDaysAvailable('');
      return;
    }

    setPlanType(plan.value);

    if (plan.days !== null) {
      setDaysAvailable(String(plan.days));
    } else {
      setDaysAvailable('');
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Card flexDirection="column" w="100%" maxW="640px" p="30px">
          <Heading color={textColor} fontSize="28px" mb="8px">
            Nuevo cliente
          </Heading>

          <Text color="gray.400" fontSize="sm" mb="24px">
            Completa los datos para registrar un cliente.
          </Text>

          <Box as="form">
            <FormControl mb="24px" isRequired>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Nombre
                <Text color={brandStars}>*</Text>
              </FormLabel>

              <Input
                name="first_name"
                variant="auth"
                fontSize="sm"
                placeholder="Nombre del cliente"
                size="lg"
              />
            </FormControl>

            <FormControl mb="24px" isRequired>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Apellido
                <Text color={brandStars}>*</Text>
              </FormLabel>

              <Input
                name="last_name"
                variant="auth"
                fontSize="sm"
                placeholder="Apellido del cliente"
                size="lg"
              />
            </FormControl>

            <FormControl mb="24px" isRequired>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email
                <Text color={brandStars}>*</Text>
              </FormLabel>

              <Input
                name="email"
                type="email"
                variant="auth"
                fontSize="sm"
                placeholder="email@cliente.com"
                size="lg"
              />
            </FormControl>

            <FormControl mb="24px">
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Teléfono
              </FormLabel>

              <Input
                name="phone"
                type="tel"
                variant="auth"
                fontSize="sm"
                placeholder="Teléfono del cliente"
                size="lg"
              />
            </FormControl>

            <FormControl mb="24px" isRequired>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Tipo de plan
                <Text color={brandStars}>*</Text>
              </FormLabel>

              <Select
                name="plan_type"
                variant="auth"
                fontSize="sm"
                placeholder="Selecciona un plan"
                size="lg"
                value={planType}
                onChange={(e) => handlePlanChange(e.target.value)}
              >
                {PLAN_OPTIONS.map((plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="32px" isRequired>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Días disponibles
                <Text color={brandStars}>*</Text>
              </FormLabel>

              <Input
                name="days_available"
                type="number"
                min={0}
                variant="auth"
                fontSize="sm"
                placeholder={daysPlaceholder}
                size="lg"
                value={daysAvailable}
                isReadOnly={!isManualDays}
                onChange={(e) => setDaysAvailable(e.target.value)}
              />
            </FormControl>

            <Flex gap="12px" flexWrap="wrap">
              <Button
                type="submit"
                variant="brand"
                fontSize="sm"
                fontWeight="500"
              >
                Guardar cliente
              </Button>

              <Button
                as={Link}
                href="/admin/clients"
                variant="outline"
                fontSize="sm"
                fontWeight="500"
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