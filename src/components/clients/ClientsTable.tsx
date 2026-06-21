'use client';

import { Box, Flex, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { MdEdit } from 'react-icons/md';
import Card from 'components/card/Card';
import { Client } from 'types/client';

const columnHelper = createColumnHelper<Client>();

const columnMinWidths: Record<string, string> = {
	first_name: '130px',
	last_name: '130px',
	phone: '140px',
	dni: '130px',
	plan_name: '150px',
	is_active: '130px',
	classes_remaining: '150px',
	actions: '90px',
};

export default function ClientsTable(props: {
	tableData: Client[];
}) {
	const { tableData } = props;
	const router = useRouter();
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const columns = [
		columnHelper.accessor('first_name', {
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					NOMBRE
				</Text>
			),
			cell: (info) => (
				<Flex w='100%' justify='center' align='center' px='2px'>
					<Text
						color={textColor}
						fontSize='sm'
						fontWeight='700'
						textAlign='center'
						whiteSpace='normal'
						wordBreak='break-word'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('last_name', {
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					APELLIDO
				</Text>
			),
			cell: (info) => (
				<Flex w='100%' justify='center' align='center' px='2px'>
					<Text
						color={textColor}
						fontSize='sm'
						fontWeight='700'
						textAlign='center'
						whiteSpace='normal'
						wordBreak='break-word'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('phone', {
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					TELÉFONO
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center' w='100%'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('dni', {
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DOCUMENTO
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center' w='100%'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('plan_name', {
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					PLAN
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center' w='100%'>
					{info.getValue() ?? '-'}
				</Text>
			)
		}),
		columnHelper.accessor('is_active', {
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					SUSCRIPCIÓN
				</Text>
			),
			cell: (info) => (
				<Text
					color={info.getValue() ? 'green.500' : 'red.400'}
					fontSize='sm'
					fontWeight='700'
					textAlign='center'
					w='100%'>
					{info.getValue() ? 'Activa' : 'Inactiva'}
				</Text>
			)
		}),
		columnHelper.accessor('classes_remaining', {
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					CLASES RESTANTES
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center' w='100%'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.display({
			id: 'actions',
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					ACCIONES
				</Text>
			),
			cell: (info) => (
				<Flex w='100%' justify='center' align='center'>
					<IconButton
						aria-label='Editar cliente'
						icon={<Icon as={MdEdit} w='18px' h='18px' />}
						variant='ghost'
						size='sm'
						color={brandColor}
						_hover={{ bg: 'transparent', opacity: 0.8 }}
						onClick={() =>
							router.push(`/admin/clients/${info.row.original.id}/edit`)
						}
					/>
				</Flex>
			)
		})
	];
	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX='auto'>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px" layout='fixed' minW='1040px'>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const minW = columnMinWidths[header.column.id] ?? '120px';
									const isNameColumn =
										header.column.id === 'first_name' ||
										header.column.id === 'last_name';
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe={isNameColumn ? '4px' : '10px'}
											px={isNameColumn ? '4px' : '8px'}
											minW={minW}
											w={minW}
											borderColor={borderColor}
											textAlign='center'>
											<Flex
												justifyContent='center'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										const minW = columnMinWidths[cell.column.id] ?? '120px';
										const isNameColumn =
											cell.column.id === 'first_name' ||
											cell.column.id === 'last_name';
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={minW}
												w={minW}
												px={isNameColumn ? '4px' : '8px'}
												py='16px'
												borderColor='transparent'
												textAlign='center'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
}
