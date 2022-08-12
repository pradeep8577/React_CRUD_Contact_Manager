import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList = () => {

  let [query, setQuery] = useState({
    text : '',
  });
  
  let [state, setState] = useState({
      loading : false,
      contacts : [],
      filteredContacts : [],
      errorMessage: ''
  });

  // useEffect(() => {
  //   ContactService.getAllContacts()
  //   .then(response => {
  //     console.log(response.data);
  //     setState({
  //       ...state,
  //       loading: false,
  //       contacts: response.data
  //     });
  //   }).catch(error => {
  //     setState({
  //       ...state,
  //       loading: false,
  //       errorMessage: error.message
  //     });
  //   }
  //   );
  // } , []);

  useEffect(()=>{
    async function getContacts() {
      try {
        setState({
          ...state,
          loading:true
        });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        });
      }
    }
    getContacts();
  },[]);

  // delete contact
  let clickDelete = async (contactId) => {
    try{
        let response = await ContactService.deleteContact(contactId);
        if (response)
        {
          setState({
            ...state,
            loading: true,
          });
          let response = await ContactService.getAllContacts();
          setState({
            ...state,
            loading: false,
            contacts: response.data,
            filteredContacts: response.data
          });
        }
    }
    catch (error) {
      setState({
        ...state,
        errorMessage: error.message
      });
    }
  };


  // search contact
  let searchContacts = (event) => {
    setQuery({
      ...query,
      text: event.target.value
    });
    let theContacts = state.contacts.filter(contact =>{
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setState({
      ...state,
      filteredContacts: theContacts
    });
  }


  let {loading , contacts,filteredContacts, errorMessage} = state;

  return (
    <>
    {/* <pre>{JSON.stringify(contacts)}</pre> */}
    {/* <pre>{query.text}</pre> */}
    <section className="contact-search p-3">
      <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 fw-bold">Contact<span className="text-warning"> Manager </span>
                <Link to={'/contacts/add'} className="btn btn-success btn-sm float-right ms-2">
                 <i className="fa fa-plus-circle me-2"></i>Add Contact</Link>
              </p>

              <p className="fst-italic">Our default branch is for development of our Bootstrap 5 release. Head to 
              the v4-dev branch to view the readme, documentation, and source code for Bootstrap 4.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <form className="row">
                <div className="col">
                <div className="mb-2">
                  <input
                    name='text'
                    value={query.text}
                    onChange={searchContacts} 
                    type="text" className="form-control" placeholder="Search Contacts" />
                </div>
                </div>
                <div className="col">
                <div className="mb-2">
                  <input type="Submit" className="btn btn-outline-dark" placeholder="Search" />
                </div>
                </div>
              </form>
            </div>
            </div>
        </div>
      </div>
    </section>

    {
      loading ? <Spinner/>: <>
      <section className='contact-list'>
      <div className="container">
        <div className="row">
          {
            filteredContacts.length > 0 && 
            filteredContacts.map(contact => {
              return(
          <>
          <div className="col-md-6" key={contact.id}>
            <div className="card-body my-2">
              <div className="row align-items-center d-flex justify-content-around">
                <div className="col-md-4">
                  <img src={contact.photo} alt="profile" className="contact-img"/>
                </div>
                <div className="col-md-7">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                      Name : <span className="fw-bold">{contact.name}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Mobile : <span className="fw-bold">{contact.mobile}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Email : <span className="fw-bold">{contact.email}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-1 d-flex flex-column align-items-center">
                <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                    <i className="fa fa-eye "></i></Link>
                  <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                    <i className="fa fa-pen "></i></Link>
                  <button onClick={()=>clickDelete(contact.id)} className="btn btn-danger">
                    <i className="fa fa-trash "></i></button>
                </div>
              </div>
            </div>       
          </div> 
                </>
              )
            })
          }
 
          </div>
        </div>
    </section>
      </>
    }

    </>
  )
}

export default ContactList