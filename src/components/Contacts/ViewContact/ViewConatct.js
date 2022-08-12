import React,{useEffect,useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import Profile from '../../../img/profile.png'
import {ContactService} from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewConatct = () => {

  let {contactId} = useParams();

  let [state, setState] = useState({
    loading : false,
    contact : {},
    errorMessage: '',
    group : {}
  });

  // useEffect(() => {
  //   ContactService.getGroups(contactId)
  //   ContactService.getContact(contactId)
  //   .then(response => {
  //     // console.log(response.data);
  //     setState({
  //       ...state,
  //       loading: false,
  //       contact: response.data,
  //       group: response.data.group
  //     });
  //   }).catch(error => {
  //     setState({
  //       ...state,
  //       loading: false,
  //       errorMessage: error.message
  //     });
  //   }
  //   );
  // });

  //useEffect using async await
  useEffect(() => {
    async function getContact() {
      try {
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups(response.data);
        console.log(response.data);
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        });
      }
    }
    getContact();
  } , []);


  // useEffect(async() => {
  //   try{
  //       let response = await ContactService.getContact(contactId);
  //   }
  //   catch(error){

  //   }
  // });

  let {loading , contact , errorMessage,group} = state;

  return (
    <>
      <section className="view-contact-intro p-3">
        {/* <h2>{contactId}</h2> */}
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">View Contact</p>
              <p className='fst-italic'>Within the download you'll find the following directories and files,
                logically grouping common assets and providing both compiled and minified variations.</p>
            </div>
          </div>
        </div>
      </section>

      {
        loading ? <Spinner /> : <>
          {
            Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
        <section className="view-contact mt-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 ">
              <img src={contact.photo} alt="contact" className="contact-img" />
            </div>
            <div className="col-md-8 ">
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
                    <li className="list-group-item list-group-item-action">
                      Company : <span className="fw-bold">{contact.company}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Title : <span className="fw-bold">{contact.title}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Group : <span className="fw-bold">{group.name}</span>
                    </li>
                  </ul>
            </div>
            <div className="col">
              <Link to={'/contacts/list'} className="btn btn-warning">Back</Link>
            </div>
          </div>
        </div>
      </section>
          }
        </>
      }
    </>
  )
}

export default ViewConatct