import React from 'react';
import MemberProvider from '../contexts/MembersContext';
import Members from '../components/members';

const MembersPage = () => {
  return (
    <MemberProvider>
      <Members/>
    </MemberProvider>
      
  )
}

export default MembersPage;