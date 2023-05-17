import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
  RiVipCrownFill,
  
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <VStack p="16" spacing={'8'} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      <LinkButton
        url={'dashboard'}
        Icon={RiDashboardFill}
        text={'Dashboard'}
        active={location.pathname === '/admin/dashboard'}
      />
      <LinkButton
        url={'createproject'}
        Icon={RiAddCircleFill}
        text={'Create Project'}
        active={location.pathname === '/admin/createproject'}
      />
      <LinkButton
        url={'projects'}
        Icon={RiEyeFill}
        text={'Projects'}
        active={location.pathname === '/admin/projects'}
      />
      <LinkButton
        url={'users'}
        Icon={RiUser3Fill}
        text={'User'}
        active={location.pathname === '/admin/users'}
      />
      <LinkButton
        url={'enrolledusers'}
        Icon={RiVipCrownFill}
        text={'Enrolled Users'}
        active={location.pathname === '/admin/enrolledusers'}
      />

    </VStack>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'larger'}
        variant={'ghost'}
        colorScheme={active ? 'purple' : ''}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
