import React from "react";
import {Routes , Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ContactList from './components/Contacts/ContactList/ContactList';
import AddContact from './components/Contacts/AddContact/AddContact';
import EditContact from './components/Contacts/EditContact/EditConact';
import ViewContact from './components/Contacts/ViewContact/ViewConatct';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'} />} />
        <Route path={'/contacts/list'} element={<ContactList/>}/>
        <Route path={'/contacts/add'} element={<AddContact/>}/>
        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
        
      </Routes>
    </>
  );
}

export default App;
