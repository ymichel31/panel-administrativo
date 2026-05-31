import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import * as React from 'react';
type RowObj = {
	first_name: string;
	last_name: string;
	email: string;
	days_available: number;
	plan_type: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
	const { tableData } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
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
		})
	];
	const [ data, setData ] = React.useState(() => [ ...defaultData ]);
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
 