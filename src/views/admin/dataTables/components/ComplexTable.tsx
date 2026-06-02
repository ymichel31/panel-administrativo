import { Box, Flex, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table';
import { MdEdit } from 'react-icons/md';
// Custom components
import Card from 'components/card/Card';
export type RowObj = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	days_available: number;
	plan_type: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable(props: {
	tableData: RowObj[];
	onEdit?: (client: RowObj) => void;
}) {
	const { tableData, onEdit } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const data = tableData;
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
		columnHelper.accessor('days_available', {
			id: 'days_available',
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DIAS DISPONIBLES
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
		columnHelper.accessor('plan_type', {
			id: 'plan_type',
			header: () => (
				<Text
					w='100%'
					textAlign='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					TIPO DE PLAN
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
						onClick={() => onEdit?.(info.row.original)}
					/>
				</Flex>
			)
		})
	];
	const table = useReactTable({
		data,
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
 