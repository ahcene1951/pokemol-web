import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { timeToNow, truncateAddr } from '../../utils/helpers';
import { Box, Heading, Skeleton, Flex, Text, Avatar } from '@chakra-ui/core';
import makeBlockie from 'ethereum-blockies-base64';
import { getProfile } from '3box';

const ProposalHistoryCard = ({ activity, isLoaded }) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      let profileRes;
      try {
        profileRes = await getProfile(activity.activityData.memberAddress);
      } catch (err) {}
      setProfile(profileRes);
    };

    if (activity.activityData) {
      fetchProfile();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  const renderTitle = () => {
    if (activity && activity.activityData) {
      if (activity.__typename === 'Vote') {
        return `${profile?.name ||
          truncateAddr(activity.activityData.memberAddress)} voted ${
          +activity.uintVote === 1 ? 'yes' : 'no'
        }`;
      } else {
        return `${profile?.name ||
          truncateAddr(activity.activityData.memberAddress)} ${
          activity.historyStep
        }`;
      }
    } else {
      return '--';
    }
  };

  return (
    <Box
      rounded='lg'
      bg='blackAlpha.600'
      borderWidth='1px'
      borderColor='whiteAlpha.200'
      p={6}
      m={6}
      mt={2}
    >
      <Link
        to={
          activity?.activityData?.type !== 'rage'
            ? `/dao/${activity.molochAddress}/proposals/${activity.proposalId}`
            : '#'
        }
      >
        <Skeleton isLoaded={isLoaded}>
          <Flex direction='row' justifyContent='space-between'>
            <Flex direction='column'>
              <Heading as='h4' size='sm'>
                {renderTitle()}
              </Heading>

              <Text>
                {activity?.activityData?.createdAt
                  ? timeToNow(activity.activityData.createdAt)
                  : '--'}
              </Text>

              {activity.__typename === 'Vote' ? (
                <Text
                  color={+activity.uintVote === 1 ? 'green.500' : 'red.500'}
                  fontSize='xs'
                >
                  253 Shares
                </Text>
              ) : null}

              {activity.historyStep === 'Processed' ? (
                <Text
                  color={activity.didPass ? 'green.500' : 'red.500'}
                  fontSize='xs'
                >
                  {activity.didPass ? 'Passed' : 'Failed'}
                </Text>
              ) : null}
            </Flex>

            {profile && profile.image ? (
              <Avatar
                src={`${'https://ipfs.infura.io/ipfs/' +
                  profile.image[0].contentUrl['/']}`}
                mr={3}
                size='sm'
              ></Avatar>
            ) : (
              <Avatar
                src={makeBlockie(
                  activity?.activityData?.memberAddress || '0x0',
                )}
                mr={3}
              />
            )}
          </Flex>
        </Skeleton>
      </Link>
    </Box>
  );
};

export default ProposalHistoryCard;