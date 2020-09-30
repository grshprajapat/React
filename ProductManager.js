import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import Http from '../../Http';
import AdminHeaderNav from '../../pages/AdminHeaderNav';
import AdminFooter from '../../pages/AdminFooter';
import Pagination from '../../components/Pagination';

 var base64 = require('base-64');
 
 
class ProductManager extends Component {
  constructor(props) {
    super(props);
	
	// var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
	
    this.state = {
      loading: true,
      data: [],
      moreLoaded: false,
      error: false,
      errorMessage: '',
		// exampleItems: exampleItems,
		pageOfItems: [],
		search: null,
    };
	
	// alert(this.state.exampleItems);

      
	this.onChangePage = this.onChangePage.bind(this);
	
    // API Endpoint
    this.api = window.appUrl+'api/v1/products';
    this.apiDelete = window.appUrl+'api/v1/deleteProduct';
  }
	
  onChangePage(pageOfItems) {
	  // alert(pageOfItems);
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }  
  
//init controller
 abortController = new window.AbortController();
 
  componentDidMount() {
	
	var access_token = localStorage.getItem('access_token');
	// fetch(this.api)
	fetch(this.api, { 
	   method: 'get', 
	   headers: new Headers({
		 // Your header content
		 'Authorization': 'bearer '+access_token
	   }),
	   signal: this.abortController.signal
	 })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => { //alert(response); 
	  // console.log(response.data);
        const { data } = response.data;
        this.setState({ data: response.data , error: false, loading: false});
		if(response.data == '')
		{
			this.setState({
			  error: true,
			  errorMessage: 'No record.',
			});
		}
      })
      .catch(() => {
        this.setState({
          // error: true,
          // errorMessage: 'Unable to fetch data.',
        });
      });
	  
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  deleteProduct = (item) => {
  // deleteProduct = (e) => {
    // const { key } = e.target.dataset;
	// alert(item);
    const key  = item;
    const { data: products } = this.state;
	
	
	let formData = new FormData();
	formData.append("id", key);

	axios({
	  method: "post",
	  url: this.apiDelete,
	  data: formData,
	  config: { headers: { "Content-Type": "multipart/form-data" } }
	 })
	 .then((response) => {
        if (response.status === 204) {
          const index = products.findIndex(
            (pro) => parseInt(pro.id, 10) === parseInt(key, 10),
          );
          const update = [...products.slice(0, index), ...products.slice(index + 1)];
          this.setState({ data: update });
        }
      })
      .catch((error) => {
        console.log(error);
      });
		  
  };

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }
  
  /* clearSearch=(event)=>{
    this.setState({search:null})
  } */
  
  
  renderLoading() {
	  return(
			<div>
				<i style={{margin: '20% 229%'}} className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
				<span className="sr-only">Loading...</span>
			</div>
	  );
  }
  
  renderContent() {
	  const products = Array.from(this.state.data);
	 // alert(this.state.error);
	  const { jAdminAuthenticated } = this.props;
	  let count = 1;
	  return(
			
			<tbody>
			  {this.state.pageOfItems.filter((data)=>{
			  if(this.state.search == null)
				  return data
			  else if(data.title.toLowerCase().includes(this.state.search.toLowerCase()) || data.sub_title.toLowerCase().includes(this.state.search.toLowerCase())){
				  return data
			  }
			  else if(!data)
			  {
				  return 'asd'
			  }
			}).map((data) => (
			<tr key={data.id}>
			  <td>{count++}</td>
			  <td>{data.title}</td>
			  <td>{data.sub_title}</td>
			  <td>
				{(jAdminAuthenticated === 'superadmin' || jAdminAuthenticated === 'admin' || jAdminAuthenticated === 'write') && 
				  <Link to={window.appUrl+`admin/editProduct/${data.id}`}>
					<button
					  type="button"
					  className="btn btn-sm btn-primary"
					  data-key={data.id}
					>
					  Edit
					</button>
				  </Link>
				}  
			  </td>
			  <td>
			  {(jAdminAuthenticated === 'superadmin' || jAdminAuthenticated == 'admin') && 
			  <button
				type="button"
				className="btn btn-sm btn-secondary"
				onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteProduct(data.id) } }  >
				Delete
			  </button>
			  }
			  </td>
			</tr>
			))}
			</tbody>
										
	  );
  }
  
  render() {
    const { loading, error, errorMessage, apiMore } = this.state;
	
	
	const admin_type = localStorage.getItem('role');
	// alert(base64.decode(admin_type));
    const { adminAuthenticated } = this.props;
	const { jAdminAuthenticated } = this.props;
	
	if (!adminAuthenticated) {
      // return <Redirect to={from} />;
	  return <Redirect to={window.appUrl} />;
    }
	
	 /* const elementStyle ={
      position: 'absolute',
		right: '5px',
		top: '0',
		bottom: '0',
		height: '14px',
		margin: 'auto',
		fontSize: '14px',
		cursor: 'pointer',
		color: '#ccc'
    }
	 */
	
    return (
      <div className="wrapper">
        
		<AdminHeaderNav />
		
		{/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h4>
					{(jAdminAuthenticated === 'superadmin' || jAdminAuthenticated === 'admin' || jAdminAuthenticated === 'write') && 
						<Link to={window.appUrl+'admin/addProduct'}>
							<button type="button" className="btn btn-sm btn-primary" ><i className="fa fa-plus"/>&nbsp; 
							Add Product</button>
						</Link>
					}
				</h4>
              </div>
              <div className="col-sm-6">
			  <small>
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="dashboard">Home</Link></li>
                  <li className="breadcrumb-item active">Product Tables</li>
                </ol>
			  </small>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content" style={{ maxWidth: '100%', textAlign: 'inherit'}}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title mb-0"> 
					Products
					{/*<form style={{float: 'left'}} className="form-inline ml-3">
						<div className="input-group input-group-sm">
						  <input className="form-control form-control-navbar" type="search" placeholder="Search by name or title" onChange={(e)=>this.searchSpace(e)} />
						  <div className="input-group-append">
							<button className="btn btn-navbar" type="submit">
							  <i className="fa fa-search" />
							</button>
						  </div>
						</div>
					</form>*/}
					</h3>
					
					{/*<div className="btn-group col-md-3">
					  <input type="search" style={{height: '10%'}} className="form-control" placeholder="Search by name or title" onChange={(e)=>this.searchSpace(e)}/>
					</div>*/}
					
                  </div>
                  {/* /.card-header */}
				  
                  <div className="card-body">
				    <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
					  <div className="row">
						<div className="col-sm-12 col-md-6" />
						  <div className="col-sm-12 col-md-6" />
							</div>
							  <div className="row">
							    
								<div className="col-lg-12">
								  <div className="card">
									<div className="card-header border-0">
										<div className="card-tools">
										<span><small><i className="fa fa-search"/></small></span> &nbsp;
										<div className="btn-group">
										  <input type="search" style={{height: '10%'}} className="form-control" placeholder="Search by name or title" onChange={(e)=>this.searchSpace(e)}/>
											  {/*<span style={elementStyle} className="fa fa-times-circle-o" onClick={(e)=>this.clearSearch(e)}></span>*/}
										</div>
									    </div>
									</div>
								  <div className="card-body table-responsive p-0">
									<table className="table table-bordered table-valign-middle">
										<thead className="thead-light">
										  <tr>
										  <th>#</th>
										  <th>Product Title</th>
										  <th>Sub Title</th>
										  <th></th>
										  <th></th>
										  </tr>
										</thead>
										
										{loading ? this.renderLoading() : this.renderContent()}
										
										</table></div></div></div>
								
								</div></div>
                  </div>
                  {/* /.card-body */}
				  
                </div>
               
			   <Pagination items={this.state.data} onChangePage={this.onChangePage} />
						
						
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
	  
        <AdminFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
  jAdminAuthenticated: state.Auth.jAdminAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(ProductManager);
