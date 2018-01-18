import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ModalContainer } from 'containers';

// eslint-disable-next-line no-multi-assign
Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: bool.isRequired
};

function NavLinks({ isAuthed }) {
  return isAuthed === true
    ? (
      <List>
        <ListItem><RouterLink to='/'>Home</RouterLink></ListItem>
      </List>
    )
    : null;
}

function ActionLinks({ isAuthed }) {
  return isAuthed === true
    ? (
      <List>
        <ListItem><ModalContainer /></ListItem>
        <ListItem><RouterLink to='/logout'>Logout</RouterLink></ListItem>
      </List>
    )
    : (
      <List>
        <ListItem><RouterLink to='/'>Home</RouterLink></ListItem>
        <ListItem><RouterLink to='/auth'>Authenticate</RouterLink></ListItem>
      </List>
    );
}

function Navigation({ isAuthed }) {
  return (
    <Wrapper>
      <NavWrapper>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </NavWrapper>
    </Wrapper>
  );
}

const RouterLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #1877E6;
  }
`;

const Wrapper = styled.div`
  color: #4a90e2;
  font-size: 18px;
  width: 100%;
`;

const NavWrapper = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px auto;
  max-width: 1100px;
  width: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding: 0 10px;
`;

export default Navigation;
