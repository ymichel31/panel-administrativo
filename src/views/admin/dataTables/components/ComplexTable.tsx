import { Box, Flex, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table';
import { MdEdit } from 'react-icons/md';
import Card from 'components/card/Card';
import { Client } from 'types/client';

const columnHelper = createColumnHelper<Client>();

export default function ComplexTable(props: {
	tableData: Client[];
	onEdit?: (client: Client) => void;
}) {
	const { tableData, onEdit } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const columns = [
		columnHelper.accessor('first_name', {
			id: 'first_name',
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					NOMBRE
				</Text>
			),
			cell: (info: any) => (
				<Flex w='100%' justify='center' align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('last_name', {
			id: 'last_name',
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					APELLIDO
				</Text>
			),
			cell: (info: any) => (
				<Flex w='100%' justify='center' align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('email', {
			id: 'email',
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					EMAIL
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center' w='100%'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('phone', {
			id: 'phone',
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
		columnHelper.accessor('code', {
			id: 'code',
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					CÓDIGO DE CLIENTE
				</Text>
			),
			cell: (info: any) => (
				<Flex w='100%' justify='center' align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700' textAlign='center'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('plan_id', {
			id: 'plan_id',
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
						onClick={() => onEdit?.(info.row.original)}
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
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
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
						{table.getRowModel().rows.slice(0, 11).map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
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
 