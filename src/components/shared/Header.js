import React, { useContext, useEffect, useState } from 'react';
import { Text, Flex } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import { PokemolContext } from '../../contexts/PokemolContext';
import { Web3SignIn } from './Web3SignIn';
import UserAvatar from './UserAvatar';

const Header = () => {
  const location = useLocation();
  const { state } = useContext(PokemolContext);
  const [pageTitle, setPageTitle] = useState();

  console.log('state.user', state.user);

  useEffect(() => {
    console.log('location', location);

    // move to helper
    switch (location.pathname) {
      case '/': {
        setPageTitle('Hub');
      }
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <Flex direction="row" justify="space-between" p={6}>
      <Text fontSize="3xl">{pageTitle}</Text>

      <Text fontSize="m">{state.network}</Text>

      {state.user ? (
        <UserAvatar address={state.user.username} />
      ) : (
        <Web3SignIn />
      )}
    </Flex>
  );
};
export default Header;
