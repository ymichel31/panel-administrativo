/* eslint-disable */
import { Box, Flex } from '@chakra-ui/react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';

export default function AdminNavbar(props: {
  fixed: boolean;
  onOpen: (...args: any[]) => any;
}) {
  let navbarPosition = 'fixed' as const;
  let paddingX = '15px';
  let gap = '0px';

  return (
    <Box
      position={navbarPosition}
      zIndex="1100"
      bg="transparent"
      boxShadow="none"
      backdropFilter="none"
      border="none"
      alignItems={{ xl: 'center' }}
      display="flex"
      minH="75px"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt="0px"
      pb="8px"
      right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
      px={{
        sm: paddingX,
        md: '10px',
      }}
      ps={{
        xl: '12px',
      }}
      pt="8px"
      top={{ base: '12px', md: '16px', xl: '18px' }}
      w={{
        base: 'calc(100vw - 6%)',
        md: 'calc(100vw - 8%)',
        lg: 'calc(100vw - 6%)',
        xl: 'calc(100vw - 350px)',
        '2xl': 'calc(100vw - 365px)',
      }}
    >
      <Flex w="100%" alignItems="center" justifyContent="flex-end" mb={gap}>
        <AdminNavbarLinks onOpen={props.onOpen} fixed={props.fixed} />
      </Flex>
    </Box>
  );
}
