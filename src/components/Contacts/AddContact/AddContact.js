import React,{useEffect,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ContactService} from '../../../services/ContactService';

function AddContact() {

  let navigate = useNavigate();

  let [state, setState] = useState({
    loading : false,
    contact : {
      name:'',
      photo:'',
      mobile:'',
      email:'',
      company:'',
      title:'',
      groupId:''
    },
    groups : [],
    errorMessage: '',
  });

  useEffect(() => {
    async function getAllContact() {
      try {
        let response = await ContactService.getAllGroups();
        console.log(response.data);
        setState({
          ...state,
          loading: false,
          groups: response.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        });
      }
    }
    getAllContact();
  } , []);


  let updateInput = (event)=>{
      setState({
        ...state,
        contact:{
          ...state.contact,
          [event.target.name] : event.target.value
        }
      });
  };

  let submitForm = async (event) =>{

    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      console.log(response.data);
      if (response)
      {
        navigate('/contacts/list',{replace:true});
      }
    }
    catch (error) {
      setState({
        ...state,
        errorMessage: error.message
      });
      navigate('/contacts/add',{replace:false});
    }

  };

  let {loading, contact, groups, errorMessage} = state;

  return (
    <>
    <section className="add-contact p-3">
      {/* <pre>{JSON.stringify(state.contact)}</pre> */}
      <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <p>Within the download you'll find the following directories and files, 
                logically grouping common assets and providing both compiled and minified variations.</p>

            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm} className="">
                <div className="mb-2">
                  <input
                    required={true} 
                    name="name" 
                    value={contact.name}
                    onChange={updateInput}  
                    type="text" className="form-control" placeholder="Name" />
                </div>
                <div className="mb-2">
                  <input 
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput} 
                    type="text" className="form-control" placeholder="Photo Url" />
                </div>
                <div className="mb-2">
                  <input 
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput} 
                  type="number" className="form-control" placeholder="Mobile" />
                </div>
                <div className="mb-2">
                  <input 
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput} 
                  type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-2">
                  <input 
                    required={true}
                    name="company"
                    value={contact.company}
                    onChange={updateInput} 
                    type="text" className="form-control" placeholder="Company" />
                </div>
                <div className="mb-2">
                  <input 
                    required={true}
                    name="title"
                    value={contact.title}
                    onChange={updateInput} 
                    type="text" className="form-control" placeholder="Title" />
                </div>
                <div className="mb-2">
                  <select
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput} 
                    className="form-control">
                    <option value="">Select Group</option>
                    {
                      groups.length > 0 && 
                        groups.map(group =>{
                          return(
                            <option key={group.id} value={group.id}>{group.name}</option> 
                          )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="Submit" className="btn btn-success me-2" value="Create" />
                  <Link to={'/contacts/list'} className="btn btn-dark" placeholder="Cancel">Cancel</Link>
                </div>
              </form>
              </div>
          </div>
      </div>
    </section>
    </>
  )
}

export default AddContact