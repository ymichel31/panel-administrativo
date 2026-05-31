// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text
				my='32px'
				h='26px'
				fontSize='26px'
				lineHeight='26px'
				fontWeight='bold'
				color={logoColor}
				textAlign='center'
				whiteSpace='nowrap'
			>
				Be Strong Unity
			</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
