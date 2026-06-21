'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import PlansSearch from 'components/plans/PlansSearch';
import PlansTable from 'components/plans/PlansTable';
import Link from 'next/link';
import { useState } from 'react';
import { Plan } from 'types/plan';

type PlansPageContentProps = {
  plans: Plan[];
};

export default function PlansPageContent({ plans }: PlansPageContentProps) {
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  let filteredPlans = plans;

  if (query) {
    filteredPlans = plans.filter((plan) =>
      plan.name.toLowerCase().includes(query),
    );
  }

  return (
    <Box>
      <Flex
        mb="20px"
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        gap="20px"
      >
        <Flex direction="column" align="flex-start" gap="5">
          <Heading size="lg" color={useColorModeValue('navy.700', 'white')}>
            Planes
          </Heading>
          <Button
            as={Link}
            href="/admin/plans/create"
            variant="brand"
            fontSize="sm"
            fontWeight="500"
          >
            Nuevo plan
          </Button>
        </Flex>
        <PlansSearch value={search} onChange={setSearch} />
      </Flex>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <PlansTable tableData={filteredPlans} />
      </SimpleGrid>
    </Box>
  );
}
