import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
// import ReeValidate from 'ree-validate';
import Http from '../../Http';
import AdminHeaderNav from '../../pages/AdminHeaderNav';
import AdminFooter from '../../pages/AdminFooter';
import { Alert } from 'reactstrap';
import CKEditor from "react-ckeditor-component";
class EditProduct extends Component {
  constructor(props) {
    super(props);
	this.state = {isToggleOn: true};
	 this.state = {isChecked: false};	
	
	/* this.validator = new ReeValidate({
      name: 'required|min:3',
      title: 'required|min:6',
    }); */
	
		// this.handleChecked = this.handleChecked.bind(this);
		// this.handleChange = this.handleChange.bind(this);
		// this.handleDate = this.handleDate.bind(this);
    this.state = {
      title: '',
      sub_title: '',
      description: '',
	   product_image: [],
      // product_category: '',
vin: '',
      product_condition: '',
      product_brand: '',	  
      fuel_type: '',	  
		
	  data: [],
	  parentCategory: [],
	  category: [],
	  subCategory: [],
	  error: false,
	  errors: {},
	  visible: false,
    };
	
	this.api = window.appUrl+'api/v1/editAdminProduct';
	this.apiUpdate = window.appUrl+'api/v1/updateProduct';
    this.addNotification = this.addNotification.bind(this);
	// this.categoryfetch = window.appUrl+'api/v1/categorieslist';
	// this.subCategoryfetch = window.appUrl+'api/v1/categories';
	// alert(gid);
  }
	
	addNotification() {
		// alert(message);
		this.setState({ visible: true }, () => {
		  window.setTimeout(() => {
			this.setState({ visible: false });
			this.props.history.push(window.appUrl+'admin/products')
		  }, 2000);
		});
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		const url = window.location.pathname.split("/");
        const gid = url.pop() || url.pop();
		
		const { name, title } = this.state;
		let formData = new FormData();
		// alert(this.state.name);
		formData.append("id", gid);
		
		formData.append("title", this.state.title);
		formData.append("sub_title", this.state.sub_title);
		formData.append("description", this.state.description);
		formData.append("product_images", this.state.product_images);
		formData.append("fuel_type", this.state.fuel_type);
		// formData.append("product_category", this.state.product_category);
	
		
 
		axios({
		  method: "post",
		  url: this.apiUpdate,
		  data: formData,
		  config: { headers: { "Content-Type": "multipart/form-data" } }
		 })
		 .then(response => {
			if (response.status) {
				this.addNotification();
			}
		  })
		  .catch(err => {
			console.log("Error: ", err);
		  });
		
	};
	
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		// alert(this.state.name);
		 // If a field has a validation error, we'll clear it when corrected.
		/* const { errors } = this.state;
		if (name in errors) {
		  const validation = this.validator.errors;
		  this.validator.validate(name, value).then(() => {
			if (!validation.has(name)) {
			  delete errors[name];
			  this.setState({ errors });
			}
		  });
		} */
	};
	
	handleBlur = (e) => {
		const { name, value } = e.target;
		
		// Avoid validation until input has a value.
		/* if (value === '') {
		  return;
		}

		const validation = this.validator.errors;
		this.validator.validate(name, value).then(() => {
		  if (validation.has(name)) {
			const { errors } = this.state;
			errors[name] = validation.first(name);
			this.setState({ errors });
		  }
		}); */
	};
  updateContent(newContent) {
        this.setState({
            description: newContent
        })
    } 

	onChange = (evt) => {
		
	  // console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        description: newContent
      })
	  this.setState({ errorDesc: null });

	  // alert(newContent);
	  
	 
		
    }
	
	/** image uploading **/
    uploadMultipleFiles = (e) => {
        let files = Array.from(e.target.files);
	  
		files.forEach((file) => {
			// alert(file);
			let reader = new FileReader();
			reader.onloadend = () => {
				this.setState({    
					 // files: [...this.state.files, file],
					 product_image: [...this.state.product_image, reader.result],
					 file: [...this.state.product_image, reader.result]
				});
				
			}
			
		reader.readAsDataURL(file);
		  });
        
    }
	
	resetFile = id => {
		var array = [...this.state.product_image]; // make a separate copy of the array
	    var index = array.indexOf(id);
	 
	    if (index !== -1) {
		  array.splice(index, 1);
		  this.setState({product_image: array});
	    }
    }  
	

// handleCatChange = (id) => {
	
		// let formData = new FormData();
		
		// formData.append("id", id);
		
		// axios({
		  // method: "post",
		  // url: this.subCategoryfetch,
		  // data: formData,
		  // config: { headers: { "Content-Type": "multipart/form-data" } }
		 // })
		 // .then(response => {
			
			// if (response.data) {
					// console.log(response.data.data)
					// this.setState({ category:response.data.data });
					// this.setState({ subCategory: [] });
			// }
		  // })
		  // .catch(err => {
			// console.log("Error: ", err);
		  // });
		
		 
		
	// }
	
	// handleSubCatChange = (id) => {
		
		// let formData = new FormData();
		
		// formData.append("id", id);
		
		// axios({
		  // method: "post",
		  // url: this.subCategoryfetch,
		  // data: formData,
		  // config: { headers: { "Content-Type": "multipart/form-data" } }
		 // })
		 // .then(response => {
			
			// if (response.data) {
					// console.log(response.data.data)
					// this.setState({ subCategory:response.data.data });
			// }
		  // })
		  // .catch(err => {
			// console.log("Error: ", err);
		  // });
		
		 
		
	// }
	
		
	// buildOptions() {
        // var arr = [];
					
		// arr.push(<option key="0" value="0">Select The Category</option>)
		// {this.state.parentCategory.map((name, index) => (
         // arr.push(<option key={name.id} value={name.id} selected={this.state.parent_id == name.id}  onclick={() => {this.handleCatChange(name.id)}}>{name.name}</option>)
		// ))}

        // return arr; 
    
		// }

  
    componentDidMount() {
	    const url = window.location.pathname.split("/");
        const gid = url.pop() || url.pop();
		
		let formData = new FormData();
		formData.append("id", gid);
 
		axios({
		  method: "post",
		  url: this.api,
		  data: formData,
		  config: { headers: { "Content-Type": "multipart/form-data" } }
		 })
		  .then(response => { //alert(response); 
		  // console.log(response.data);
			const { data } = response.data;
			this.setState({ data: response.data.data});
			this.setState({ 
					title: response.data.data.title,
					sub_title: response.data.data.sub_title,
					description: response.data.data.description,
					vin: response.data.data.vin,
					product_condition: response.data.data.product_condition,
					product_brand: response.data.data.product_brand,
					fuel_type: response.data.data.fuel_type,
					// product_category: response.data.data.product_category,
				});
			// console.log(response.data);
		
		  })
		  .catch(error => {
			console.log(
			  "There has been a problem with your fetch operation: " + error.message
			); 
		  });
    }


  
  render() {
    const { loading, error, errors, apiMore } = this.state;
    const { adminAuthenticated } = this.props;
	const { jAdminAuthenticated } = this.props;
		
	const category = Array.from(this.state.category); 
	const subcategory = Array.from(this.state.subCategory); 
		
	
	if (jAdminAuthenticated == 'read') {
      // return <Redirect to={from} />;
	  return <Redirect to={window.appUrl+'admin/products'} />;
    }
	
	if (!adminAuthenticated) {
      // return <Redirect to={from} />;
	  return <Redirect to={window.appUrl} />;
    }
	
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
                <h6>
					<Link to={window.appUrl+'admin/products'}>
						<button type="button" className="btn btn-sm btn-primary" ><i className="fa fa-arrow-circle-left"/>&nbsp; 
							Back
						</button>
					</Link>
				</h6>
              </div>
              <div className="col-sm-6">
			  <small>
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={window.appUrl+"admin/dashboard"}>Home</Link></li>
                  <li className="breadcrumb-item active">Edit Product</li>
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
			  
					<Alert color="success" isOpen={this.state.visible}>
						<p>Product updated <strong>successfully!</strong></p>
					</Alert>
                <div className="card">
                  {/* /.card-header */}
                 <div className="card card-primary card-outline">
				 <div className="card-header">
				 <div className="container">
					<div className="row">
					  <div className="section-login col-lg-8 ml-auto mr-auto">
						<h4>Edit Product</h4>

						<div className="card-login card mb-3">
						  <div className="card-body">
							<form
							  className="form-horizontal "
							  method="POST"
							  onSubmit={this.handleSubmit}
							>
							   <div className="form-group">
								  <label htmlFor="title">Product Title</label>
								  <input
									id="title"
									type="text"
									name="title"
									className='form-control'
									placeholder="Enter product title"
									defaultValue={this.state.title}
									onChange={this.handleChange}
									onBlur={this.handleBlur}
									required
								  />
								  
								</div>

								<div className="form-group">
								  <label htmlFor="sub_title">Title</label>
								  <input
									id="sub_title"
									type="text"
									className='form-control'
									name="sub_title"
									placeholder="Enter product title"
									defaultValue={this.state.sub_title}
									onChange={this.handleChange}
									onBlur={this.handleBlur}
									required
								  />
								  
								</div>
								  <label htmlFor=''>Description: &nbsp;
								                      


									{this.state.errorDesc && <small className="text-red">&nbsp;{this.state.errorDesc}</small>}
								  </label>
								 
								  <CKEditor 
								  
                                      
									activeClass="p10" 
									content={this.state.description} 
									required
									events={{
									  "blur": this.onBlur,
									  "afterPaste": this.afterPaste,
									  "change": this.onChange
									
									  
									}}
									  defaultValue={this.state.description}
								   />
								   <br/>
								   	<div className="row">
									<div className="col-sm-6">
									  <div className="form-group">
										  <label htmlFor="vin">Vin</label>
										  <input
											id="vin"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'vin' in errors,
											})}
											name="vin"
											placeholder="Enter Vin"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											 defaultValue={this.state.vin}
										  />
										  
										  {'vin' in errors && (
											<div className="invalid-feedback">
											  {errors.vin}
											</div>
										  )}
										</div>
									</div>
									{/*  product image upload start*/}
									<fieldset 
									  style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
									>
									<div className="form-group">
									  <label htmlFor="product_image">Product Image</label>
										
										<div id="picture" style={{display: 'block'}} className='py-3 px-3'>
											<div className='d-flex'>
											{this.state.product_image != null &&
											  productImages.slice((productImages.length - 1), productImages.length).map((options, key) => ( 
												<div style={{visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}>
												  <input 
												    id="imageUploads" 
													type="file" 
													name="product_image" 
													onChange={this.uploadMultipleFiles} 
													multiple="multiple"
													style={{zIndex: '10', marginTop: '-14px', opacity: '0', height: '150px', position: 'absolute', width: '150px'}}
												  />
												  <div style={{zIndex: '100', position: 'relative', textAlign: 'right', marginRight: '10%', top: '-31%'}}> 
												    <span onClick={() => this.resetFile(options)} ><i className="fa fa-times-circle-o" /></span>
												  </div>
												  
												  <div className="pr-3" style={{position: 'relative', float: 'left', marginTop: '-20%',width: '200px', marginLeft: '-2px', height: '175px'}} >
												  <img className="w-100" src={options} style={{width: '200px !important', height: '175px', background: 'white', border: '2px dashed #ccc',visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}/>
												</div>
											  </div>
											))
											}
											
											<div 
											  style={{visibility: 'visible', 
												animationDuration: '1.8s', 
												animationName: 'fadeIn', 
												width: '120px', 
												height: '120px', 
												textAlign: 'center', 
												marginTop: '10px',
												border: '2px dashed #ccc',
												color: '#ccc',
												fontSize: '13pt',
												float: 'left',
												marginRight: '9px',
												marginBottom: '5px',}}>
											  <input 
												id="imageUploads" 
												type="file" 
												name="product_image" 
												onChange={this.uploadMultipleFiles} 
												multiple="multiple"
												style={{zIndex: '10', marginTop: '-14px', opacity: '0', height: '120px', position: 'absolute', width: '120px'}}
											  />
											 <i className="fa fa-plus picture_bx_file_add mt-4" /> 
											 <p>Add Photos</p>
											  
										   </div>
										  
										   {this.state.product_image.length >= 2 &&
											  productImages.slice(0, (productImages.length - 1)).map((options, key) => ( 
												<div style={{visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}>
												  <input 
												    id="imageUploads" 
													type="file" 
													name="product_image" 
													onChange={this.uploadMultipleFiles} 
													multiple="multiple"
													style={{zIndex: '10', marginTop: '-14px', opacity: '0', height: '120px', position: 'absolute', width: '120px'}}
												  />
												  <div style={{zIndex: '100', position: 'relative', textAlign: 'right', marginRight: '10%', top: '-31%'}}> 
												    <span onClick={() => this.resetFile(options)} ><i className="fa fa-times-circle-o" /></span>
												  </div>
												  
												  <div className="pr-3" style={{position: 'relative', float: 'left', marginTop: '-38%',width: '120px', marginLeft: '-2px', height: '120px'}} >
												  <img className="w-100" src={options} style={{width: '120px !important', height: '120px', background: 'white', border: '2px dashed #ccc',visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}/>
												</div>
											  </div>
											))
											}
											
										  </div>
										</div>
										
										
										
                
										
									</div>
									</fieldset>
								
								{/*  product image upload end*/}
									
									
									
									<div className="col-sm-6">
									  <div className="form-group">
										  <label htmlFor="product_condition">Product  Condition</label>
										  <input
											id="product_condition"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'product_condition' in errors,
											})}
											name="product_condition"
											placeholder="Enter product Condition"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											 defaultValue={this.state.product_condition}
										  />
										  
										  {'product_condition' in errors && (
											<div className="invalid-feedback">
											  {errors.product_condition}
											</div>
										  )}
										</div>
									</div>
									
							   </div>
							   
								
							
								
								<div className="form-group">
								  <label htmlFor="product_brand">Product Brand</label>
								  <input
									id="product_brand"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_brand' in errors,
									})}
									name="product_brand"
									placeholder="Enter product Brand"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
									 defaultValue={this.state.product_brand}
								  />
								  
								  {'product_brand' in errors && (
									<div className="invalid-feedback">
									  {errors.product_brand}
									</div>
								  )}
								</div>
								<div className="form-group">
								  <label htmlFor="fuel_type">Fuel Type</label>
								  <input
									id="fuel_type"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'fuel_type' in errors,
									})}
									name="fuel_type"
									placeholder="Enter Fuel Type"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
									defaultValue={this.state.fuel_type}
								  />
								  
								  {'fuel_type' in errors && (
									<div className="invalid-feedback">
									  {errors.fuel_type}
									</div>
								  )}
								</div>
								
								
								
								
								{/*  
								  <fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								>
								<div className="form-group d-flex">
								
								  <div className="col-md-4 col-sm-6">
									<label htmlFor="product_category">Category</label>                 
																																	   																							   
									  <select name="product_category" size={7}
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										className='form-control'
										defaultValue={this.state.product_category}
									  >
										{this.buildOptions()}
										
									  </select>
								   </div>
								    
									   
								   {category.length > 0 &&
								   <div className="col-md-4 col-sm-6">
									<label htmlFor="product_category">&nbsp;</label>                 
																																	   																							   
									  <select name="product_category" size={7}
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										className='form-control'
									  >
										{category.map((val,key) => (
											<option key={key} value={val.id} onClick={ ()=> {this.handleSubCatChange(val.id)}}>{val.name}</option>
										))}
										
									  </select>
								   </div>
								    }
									{subcategory.length > 0 &&
								   <div className="col-md-4 col-sm-6">
									<label htmlFor="product_category">&nbsp;</label>                 
																																	   																							   
									  <select name="product_category" size={7}
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										className='form-control'
									  >
										{subcategory.map((val,key) => (
											<option key={key} value={val.id}>{val.name}</option>
										))}
										
									  </select>
								   </div>
									}
								   
									  
								 </div>
								 
								 
								</fieldset >
								
							*/}

							   
								<div className="form-group text-center">
								  <div className="col-md-3 col-lg-3 col-sm-6">
									<button
									  type="submit"
									  className='btn btn-primary'
									>
									  Submit
									</button>
								  </div>
								</div>
							  </form>
						  
						  </div>
						</div>
						</div>

						
					  </div>
					</div>
				  </div>
		  
                </div>
                </div>
               
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

export default connect(mapStateToProps)(EditProduct);
