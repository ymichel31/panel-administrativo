import { Icon } from '@chakra-ui/react';
import { MdDescription, MdPerson } from 'react-icons/md';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Clientes',
    layout: '/admin',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    path: '/clients',
  },
  {
    name: 'Planes',
    layout: '/admin',
    icon: (
      <Icon as={MdDescription} width="20px" height="20px" color="inherit" />
    ),
    path: '/plans',
  },
];

export default routes;
