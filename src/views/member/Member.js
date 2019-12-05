import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MEMBER } from '../../utils/Queries';
import { DaoDataContext } from '../../contexts/Store';
import MemberDetail from '../../components/member/MemberDetail';
import ErrorMessage from '../../components/shared/ErrorMessage';
import BottomNav from '../../components/shared/BottomNav';
import Loading from '../../components/shared/Loading';

const Member = (props) => {
  const id = props.match.params.id;
  const [daoData] = useContext(DaoDataContext);

  const options = { variables: { id } };

  if (daoData.isLegacy) {
    options.client = daoData.legacyClient;
  }

  const { loading, error, data } = useQuery(GET_MEMBER, options);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="View">
      <div className="MemberDetail">
        <MemberDetail member={data.member} />
      </div>
      <BottomNav />
    </div>
  );
};

export default Member;