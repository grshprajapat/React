import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
import Http from '../../Http';
import AdminHeaderNav from '../../pages/AdminHeaderNav';
import AdminFooter from '../../pages/AdminFooter';
import { Alert } from 'reactstrap';
import CKEditor from "react-ckeditor-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';

class AddProduct extends Component {
	
	
	
  constructor(props) {
    super(props);
		this.state = {isToggleOn: true};
	    this.state = {isChecked: false};	
	this.validator = new ReeValidate({
      title: 'required|min:3',
      sub_title: 'required|min:3',
    });
		
		this.handleElectronicSelect = this.handleElectronicSelect.bind(this);
		this.handleProFlatSelect = this.handleProFlatSelect.bind(this);
		
		this.handleChange = this.handleChange.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
		 
		
    this.state = {
      // name: '',
	  isLoading: false,
	bedroomFlat: 0 ,
	bedroomHouse: 0,
      title: '',
      sub_title: '',
      product_category: '',
	  description: '',
      vin: '',
      product_image: [],
	  name:[],
	  // file: null,
      product_condition: '',
      product_brand: '',
      product_year: '',
	  startDate: new Date(),
      engine: '',
      // transmission: '',
      warrenty: '',
      product_make: '',
      product_model: '',
      product_color: '',
      storage_capacity: '',
      camera_resolution: '',
      sim_card_slot: '',
      ram_memory_card: '',
      interior: '',
      exterior: '',
      video_file_link: '',
      youtube: '',
      sale_by: '',
      selling_duration: '',
      selling_price: '',
      selling_quantity: '',
      // paypal: '',
      // additional_payment: '',
      // payment_instruction: '',
      domestic_return: '',
      international_return: '',
	  seo_title: '',
	  meta_desc: '',
	  twitter_title: '',
	  twitter_image: '',
	  twitter_desc: '',
	  og_title: '',
	  og_image: '',
	  og_desc: '',
	  property_name: '',
	  property_condition: '',
	  addressOne: '',
	  addressTwo: '',
	  postalCode: '',
	  city: '',
	  state: '',
	  property_bb: '',
	  
	  holiday_home: '',
	  owner_img: null,
      // shhipping_rate: '',
      // free_shipping: '',
      // item_location: '',
	  parentCategory: [],
	  category: [],
	  subCategory: [],
	  categories:[],
	  error: false,
	   errorDesc: null,
	  errors: {},
	  visible: false,
	  data:[],
	  brands:[],
	  prdattrtransmission:[],
	  prdattrfuel:[],
	  pdctfuel:[],
	  pdcttransmission:[],
	  pdctelectronic:[],
	  prdattrelectronic:[],
	  pdctattrmotor:[],
	  
	  pdctmotor:[],
	  product_electronic_id:[],
	 
	  
	  product_motor_id:[],
	  propertytyp:[],
	  propertyatt:[],
	  propertyaatflattyp:[],
	  propertyflattyp:[],
	  
	  propertycellg:[],
	  propertyattcell:[],
	  property_service_id:[],
	  // property_bedroom_flat_id:[],
	  product_fuel_id:'',
	  property_celling_id:'',
	  property_type_id:'',
	  product_transmission_id:'',
	  
	  
	  
	  
    };
	
	this.api = window.appUrl+'api/v1/addAdminProduct';
    this.addNotification = this.addNotification.bind(this);
	this.categoryfetch = window.appUrl+'api/v1/categorieslist';
	this.subCategoryfetch = window.appUrl+'api/v1/categories';
	this.prdformdatalist = window.appUrl+'api/v1/prdformdatalist';
	
	
  }
	
	addNotification()
	{
		// alert(message);
		
	    this.setState({ visible: true }, () => {
		window.setTimeout(() => {
		this.setState({ visible: false });
		this.props.history.push(window.appUrl+'admin/products')
	}, 2000);
		});
	}
	
	componentDidMount()
	{
	
	    var access_token = localStorage.getItem('access_token');
	  
		fetch(this.prdformdatalist,
		{ 
		    method: 'get', 
	        headers: new Headers({
		    'Authorization': 'bearer '+ access_token
        })
		})
		// fetch(this.categoryfetch)
			.then(response => 
			{
			    if (!response.ok)
					{
			            throw Error(response.statusText);
			        }
			return response.json();
		  })
		 .then(response => 
		 { 
        
		    this.setState({ parentCategory: response.data.categories });
			this.setState({ pcat: response.data.categories });
			this.setState({ brands: response.data.brands });
			this.setState({ prdattrtransmission: response.data.prdattrtransmission});
			this.setState({ prdattrfuel: response.data.prdattrfuel});
			this.setState({ pdctfuel: response.data.pdctfuel });
			this.setState({ pdcttransmission: response.data.pdcttransmission });
			this.setState({ pdctelectronic: response.data.pdctelectronic });
			this.setState({ prdattrelectronic: response.data.prdattrelectronic });
			this.setState({ pdctmotor: response.data.pdctmotor });
			this.setState({ pdctattrmotor: response.data.pdctattrmotor });
			this.setState({ propertyatt: response.data.propertyatt });
			this.setState({ propertytyp: response.data.propertytyp });
			this.setState({ propertyaatflattyp: response.data.propertyaatflattyp });
			this.setState({ propertyflattyp: response.data.propertyflattyp });
		
			this.setState({ propertyattcell: response.data.propertyattcell });
			this.setState({ propertycellg: response.data.propertycellg });
			
			
				console.log(response.data);
			// alert(response.data);
			
		})
		.catch(() => {
        
		});
		
   
	}
	
		increment = (e) => {
			e.preventDefault();
		this.setState({
		bedroomFlat: this.state.bedroomFlat + 1
		});
		// alert("dsdsd");
		}
		
		decrement = (e) => {
			e.preventDefault();
		if(this.state.bedroomFlat <= 0){
        this.setState({
            bedroomFlat:0
        });
      }else {
        this.setState({
            bedroomFlat: this.state.bedroomFlat - 1
        });
      }
  }
	add = (e) => {
			e.preventDefault();
		this.setState({
		bedroomHouse: this.state.bedroomHouse + 1
		});
		// alert("dsdsd");
		}
		
		minus = (e) => {
			e.preventDefault();
		if(this.state.bedroomHouse <= 0){
        this.setState({
            bedroomHouse:0
        });
      }else {
        this.setState({
            bedroomHouse: this.state.bedroomHouse - 1
        });
      }
  }
   
  
	/** image uploading **/
        uploadMultipleFiles = (e) => 
		{
            let files = Array.from(e.target.files);
	  
		    files.forEach((file) => 
			{
			// alert(file);
			   let reader = new FileReader();
			   reader.onloadend = () => 
			{
			    this.setState(
				{    
					
			         product_image: [...this.state.product_image, reader.result],
					 file: [...this.state.product_image, reader.result]
				});
				
			}
			
		      reader.readAsDataURL(file);
		  });
        
      }
	
	    resetFile = id => 
		{
		    var array = [...this.state.product_image]; // make a separate copy of the array
	        var index = array.indexOf(id);
	 
			if (index !== -1)
				{
		            array.splice(index, 1);
		            this.setState({product_image: array});
	            }
        }
	
	/* owmer Image   */
	 onImageChange = (e) => {
		 // alert('d')
   e.preventDefault(); 
   let reader = new FileReader();
   let file = e.target.files[0];
// console.log(file)
   reader.onloadend = () => {
	   // alert(reader.result)
     this.setState({
		 owner_img: reader.result
     });
   } 
   // alert(reader.result);

  reader.readAsDataURL(file)
 }
 
 
 
	  
	handleDate(date)
	{
		this.setState(
		{
			startDate:date          
		})
	}
	  
   handleSubmit = (e) =>
   {
		// alert(this.state.property_celling_id);
		 e.preventDefault();
		 this.setState({ isLoading: true });
		 const { title, sub_title } = this.state;
		 const credentials =
		 {
			 title,
			 sub_title,
		 };
	
	 if(this.state.description == '')
	 {
		 this.setState({ errorDesc: 'Please enter the desciption.' });
		 this.setState({ isLoading: false });
		 return false;
	 }
	
	

	  this.validator.validateAll(credentials).then((success) => 
	  {
		  if (success)
			  {
	
		 // alert(this.state.product_fuel_id);
		 // alert(this.state.product_transmission_id);
				  let formData = new FormData();
				  formData.append("name", this.state.name);
				  formData.append("title", this.state.title);
				  formData.append("sub_title", this.state.sub_title);
				  formData.append("product_category", this.state.product_category);
				  formData.append("description", this.state.description);
				  formData.append("vin", this.state.vin);
				  this.state.product_image.forEach((image_file) => 
				   { 
		
					   formData.append('file[]', image_file);
				   });
				   
				   this.state.product_electronic_id.forEach((val) => 
				   { 
				   formData.append("product_electronic_id[]", val);
				   });
				   this.state.prdattrelectronic.forEach((att ) => 
				   { 
		
					   formData.append('pdctelectronic[]', att);
				   });
				    
					this.state.product_motor_id.forEach((val) => 
				   { 
				   formData.append("product_motor_id[]", val);
				   });
				   this.state.pdctattrmotor.forEach((att ) => 
				   { 
		
					   formData.append('pdctmotor[]', att);
				   });
				   
					
				  this.state.property_service_id.forEach((val) => 
				   { 
				   formData.append("property_service_id[]", val);
				   });
				   this.state.propertyaatflattyp.forEach((att ) => 
				   { 
		
					   formData.append('propertyflattyp[]', att);
				   });
				   
				  
				   
				  
				   
				  formData.append("product_condition", this.state.product_condition);
				  formData.append("product_brand", this.state.product_brand);
				  formData.append("product_fuel_id", this.state.product_fuel_id);
				  formData.append("property_celling_id", this.state.property_celling_id);
				  formData.append("bedroomFlat", this.state.bedroomFlat);
				  formData.append("bedroomHouse", this.state.bedroomHouse);
				  formData.append("property_type_id", this.state.property_type_id);
				  formData.append("product_transmission_id", this.state.product_transmission_id);
				  formData.append("product_year",Moment(this.state.startDate).format('YYYY'));
				  formData.append("engine", this.state.engine);
				  formData.append("warrenty", this.state.warrenty);
				  formData.append("product_make", this.state.product_make);
				  formData.append("product_model", this.state.product_model);
				  formData.append("interior", this.state.interior);
				  formData.append("exterior", this.state.exterior);
				  formData.append("video_file_link", this.state.video_file_link);
				  formData.append("youtube", this.state.youtube);
				  formData.append("sale_by", this.state.sale_by);
				  formData.append("selling_duration", this.state.selling_duration);
				  formData.append("selling_price", this.state.selling_price);
				  formData.append("selling_quantity", this.state.selling_quantity);
				  formData.append("property_name", this.state.property_name);
				  formData.append("property_condition", this.state.property_condition);
				  formData.append("addressOne", this.state.addressOne);
				  formData.append("addressTwo", this.state.addressTwo);
				  formData.append("postalCode", this.state.postalCode);
				  formData.append("city", this.state.city);
				  formData.append("state", this.state.state);
				  formData.append("holiday_home", this.state.holiday_home);
				  formData.append("owner_img", this.state.owner_img);
				  formData.append("property_bb", this.state.property_bb);
				  formData.append("domestic_return", this.state.domestic_return);
				  formData.append("international_return", this.state.international_return);
				  formData.append("seo_title", this.state.seo_title);
				  formData.append("meta_desc", this.state.meta_desc);
				  formData.append("twitter_title", this.state.twitter_title);
				  formData.append("twitter_image", this.state.twitter_image);
				  formData.append("twitter_desc", this.state.twitter_desc);
				  formData.append("og_title", this.state.og_title);
				  formData.append("og_image", this.state.og_image);
				  formData.append("og_desc", this.state.og_desc);
 
		
		
		
		
				axios(
				{
					method: "post",
					url: this.api,
					data: formData,
					config: { headers: { "Content-Type": "multipart/form-data" } }
				})
			   .then(response => 
			   {
					window.scrollTo(0, 0);
					this.loginForm.reset();
	  
				if (response.data.status)
				 {
				
					 this.addNotification();
				 }
			  })
			   .catch(err => 
			   {
					console.log("Error: ", err);
			   });
		
		  }
	});
		
		
		
		
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
	
	
	
	
	
	
	handleChange = (e) => {
		
		
		const { name, value } = e.target;
		// alert(value);
		// alert(name);
		this.setState({ [name]: value });
		
		
		// alert(value);
		 // If a field has a validation error, we'll clear it when corrected.
		const { errors } = this.state;
		if (name in errors) {
		  const validation = this.validator.errors;
		  this.validator.validate(name, value).then(() => {
			if (!validation.has(name)) {
			  delete errors[name];
			  this.setState({ errors });
			}
		  });
		}
	};
	
	handleBlur = (e) => {
		const { name, value } = e.target;
		// Avoid validation until input has a value.
		if (value === '') {
		  return;
		}

		const validation = this.validator.errors;
		this.validator.validate(name, value).then(() => {
		  if (validation.has(name)) {
			const { errors } = this.state;
			errors[name] = validation.first(name);
			this.setState({ errors });
		  }
		});

	};
	
	handleCatChange = (id) => {
	
		let formData = new FormData();
		
		formData.append("id", id);
		
		axios({
		  method: "post",
		  url: this.subCategoryfetch,
		  data: formData,
		  config: { headers: { "Content-Type": "multipart/form-data" } }
		 })
		 .then(response => {
			
			if (response.data) {
					// console.log(response.data.data)
					this.setState({ category:response.data.data });
					this.setState({ subCategory: [] });
			}
		  })
		  .catch(err => {
			console.log("Error: ", err);
		  });
		
		 
		
	}
	
	handleElectronicSelect(event)
	{		
		// alert(event.target.value);
		
				let electronic_list = this.state.product_electronic_id;
				// console.log(electronic_list);
				let check = event.target.checked;
				// alert(check);
				let checked_electronic = event.target.value;
				if(check)
					
					{
						
						this.setState(
					{
						product_electronic_id: [...this.state.product_electronic_id, checked_electronic]
					})
					}
							else
								{ 
									var index = electronic_list.indexOf(checked_electronic);
									 if (index > -1)
										{
											electronic_list.splice(index, 1);
											this.setState(
												{
														product_electronic_id: electronic_list
												})
										} 
									}	
				// alert(this.state.product_electronic_id);
	}
	 /* Checck Box of property services type */
	handleProFlatSelect(event)
	{	
		
		
		
				let propertyflat_list = this.state.property_service_id;
				// console.log(propertyflat_list);
				let check = event.target.checked;
				// alert(check);
				let checked_propertyflat = event.target.value;
				if(check)
					
					{
						
						this.setState(
					{
						property_service_id: [...this.state.property_service_id, checked_propertyflat]
					})
					}
							else
								{ 
									var index = propertyflat_list.indexOf(checked_propertyflat);
									 if (index > -1)
										{
											propertyflat_list.splice(index, 1);
											this.setState(
												{
														property_service_id: propertyflat_list
												})
										} 
									}	

	}
	// /*Bedroom checkbox  */
	// handleProBedrSelect(event)
	// {	
		
		
		
				// let propertybed_list = this.state.property_bedroom_flat_id;
				// console.log(propertyflat_list);
				// let check = event.target.checked;
				// alert(check);
				// let checked_propertybed = event.target.value;
				// if(check)
					
					// {
						
						// this.setState(
					// {
						// property_bedroom_flat_id: [...this.state.property_bedroom_flat_id, checked_propertybed]
					// })
					// }
							// else
								// { 
									// var index = propertybed_list.indexOf(checked_propertybed);
									 // if (index > -1)
										// {
											// propertybed_list.splice(index, 1);
											// this.setState(
												// {
														// property_bedroom_flat_id: propertybed_list
												// })
										// } 
									// }	

	// }
	
	
	handleMototSelect = (event) => 
	{		
		// alert(event.target.value);
		
				let motor_list = this.state.product_motor_id;
				
				let check = event.target.checked;
				// alert(check);
				let checked_motor = event.target.value;
				if(check)
					
					{
						
						this.setState(
					{
						product_motor_id: [...this.state.product_motor_id, checked_motor]
					})
					}
							else
								{ 
									var index = motor_list.indexOf(checked_motor);
									 if (index > -1)
										{
											motor_list.splice(index, 1);
											this.setState(
												{
														product_motor_id: motor_list
												})
										} 
									}	
				// alert(this.state.product_electronic_id);
	}
	
	handleSubCatChange = (id) => {
		// alert(id);
		let formData = new FormData();
		
		formData.append("id", id);
		
		axios({
		  method: "post",
		  url: this.subCategoryfetch,
		  data: formData,
		  config: { headers: { "Content-Type": "multipart/form-data" } }
		 })
		 .then(response => {
			
			if (response.data) {
					console.log(response.data.data)
					this.setState({ subCategory:response.data.data });
			}
		  })
		  .catch(err => {
			console.log("Error: ", err);
		  });
		
		 
		
	}
	

	
		
	buildOptions(key) 
	{
		
		if(key=='parentCategory')	{
		 let catarr = [];		
		catarr.push(<option key="0" value="0">Select The Category</option>)
		{this.state.parentCategory.map((name, index) => (
         catarr.push(<option key={name.id} value={name.id} onClick={() => {this.handleCatChange(name.id)}}>{name.name}</option>)
		))}
		  return catarr;
		}	
		if(key=='brands')
		{
		let brandarr = [];
		
		brandarr.push(<option key="0" value="0">Select The Brands</option>)
		{
			this.state.brands.map((name, index) => (
			brandarr.push(<option key={name.id} value={name.id}>{name.name}</option>)
		))}
      
           return brandarr;
		 }
		 
		 if(key=='prdattrfuel')
		 {
		     let profuel = [];
		      profuel.push(<option key="0" value="0">Select The Fuels</option>)
		     {
				 this.state.prdattrfuel.map((name, index) => (
                  profuel.push(<option key={name.id} value={name.id}>{name.name}</option>)
		 ))}
      
           return profuel;
		 }
		if(key=='prdattrtransmission')
		 {
		     let protrns = [];
		      protrns.push(<option key="0" value="0">Select The Transmission</option>)
		     {
				 this.state.prdattrtransmission.map((name, index) => (
                  protrns.push(<option key={name.id} value={name.id}>{name.name}</option>)
		 ))}
      
           return protrns;
		 }
		 if(key=='propertyatt')
		 {
		     let propert = [];
		      propert.push(<option key="0" value="0">Select The Property</option>)
		     {
				 this.state.propertyatt.map((name, index) => (
                  propert.push(<option key={name.id} value={name.id}>{name.name}</option>)
		 ))}
      
           return propert;
		 }
		 if(key=='propertyattcell')
		 {
		     let propertcllin = [];
		      propertcllin.push(<option key="0" value="0">Select The Celling Type </option>)
		     {
				 this.state.propertyattcell.map((name, index) => (
                  propertcllin.push(<option key={name.id} value={name.id}>{name.name}</option>)
		 ))}
      
           return propertcllin;
		 }
		
     
	}

		
  
  render() {
    const { loading, error, apiMore } = this.state;
    const { adminAuthenticated } = this.props;
    const { jAdminAuthenticated } = this.props;
	
	const category = Array.from(this.state.category); 
	const subcategory = Array.from(this.state.subCategory);
	const brands = Array.from(this.state.brands);
	const parentCategory = Array.from(this.state.parentCategory);
	const pdctelectronic = Array.from(this.state.pdctelectronic);
	const prdattrelectronic = Array.from(this.state.prdattrelectronic);
	const prdattrtransmission = Array.from(this.state.prdattrtransmission);
	const pdcttransmission = Array.from(this.state.pdcttransmission); 
	const prdattrfuel = Array.from(this.state.prdattrfuel);
	const pdctmotor = Array.from(this.state.pdctmotor);
	const pdctattrmotor = Array.from(this.state.pdctattrmotor);
	const pdctfuel = Array.from(this.state.pdctfuel);
	const propertyatt = Array.from(this.state.propertyatt);
	const propertytyp = Array.from(this.state.propertytyp);
	const propertyflattyp = Array.from(this.state.propertyflattyp);
	const propertyaatflattyp = Array.from(this.state.propertyaatflattyp);

	const propertyattcell = Array.from(this.state.propertyattcell);
	const propertycellg = Array.from(this.state.propertycellg);
	
	
	
	
	const productImages = Array.from(this.state.product_image);
	
	const {  errors } = this.state;
	
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
					<Link to='products'>
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
                  <li className="breadcrumb-item active">Add Product</li>
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
						<p>Product added <strong>successfully!</strong></p>
					</Alert>
					
                <div className="card card-primary card-outline">
				
					<div className="card-header">
					  <h3 className="card-title mb-0">
						Add Product&nbsp; 
						<i className="fa fa-file-text-o" />
					  </h3>
					</div>
					
                  {/* /.card-header */}
                 
				 <div className="container-fluid">
					<div className="row">
					  <div className="section-login col-lg-12 ml-auto mr-auto">

						<div className="card-login mb-3">
						  <div className="card-body">
							
							<ul className="nav nav-tabs" id="custom-content-below-tab" role="tablist">
						<li className="nav-item">
						  <a className="nav-link active" id="custom-content-below-home-tab" data-toggle="pill" href="#custom-content-below-home" role="tab" aria-controls="custom-content-below-home" aria-selected="true">Products</a>
						</li>
					<li className="nav-item">
						  <a className="nav-link" id="custom-content-below-profile-tab" data-toggle="pill" href="#custom-content-below-profile" role="tab" aria-controls="custom-content-below-profile" aria-selected="false">Seo</a>
						</li>
					  </ul>
							<form
							
							  className="form-horizontal "
							  method="POST"
							  onSubmit={this.handleSubmit}
							  ref={(el) => {
								this.loginForm = el;
							  }}
							>       
							 <div className="tab-content" id="custom-content-below-tabContent">
								
								<div className="tab-pane fade active show" id="custom-content-below-home" role="tabpanel" aria-labelledby="custom-content-below-home-tab">
								
								
								<div className="row">
								
									<div className="col-sm-12">
									  {/* text input */}
									  <div className="form-group">
										<label htmlFor="title">Product Title</label>
										 <input
											id="title"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'title' in errors,
											})}
											name="title"
											placeholder="Enter product title"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
										required
										  />
										  {'title' in errors && (
											<div className="invalid-feedback">
											  {errors.title}
											</div>
										  )}
									  </div>
									  </div>
									</div>
									<div className="row">
									<div className="col-sm-12">
									  <div className="form-group">
										<label htmlFor="sub_title">Sub Title</label>
										 <input
											id="sub_title"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'sub_title' in errors,
											})}
											name="sub_title"
											placeholder="Enter product subtitle"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
                                           required
										  />
										  {'sub_title' in errors && (
											<div className="invalid-feedback">
											  {errors.sub_title}
											</div>
										  )}
									  </div>
									</div>
									
							   </div>
								
								
								<fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								>
								<div className="form-group d-flex">
								
								  <div className="col-md-4 col-sm-4">
									<label htmlFor="product_category">Category</label>                 
	
									  <select name="product_category" size={7}
									 
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										className='form-control'
										
									  >
										{this.buildOptions('parentCategory')}
										
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
								
								 
								 	   	<br/>
								 
								  <label htmlFor='description'>Description: 
								                      


									{this.state.errorDesc && <small className="text-red">&nbsp;{this.state.errorDesc}</small>}
								  </label>
								   &nbsp;
								   &nbsp;
								   
								 
								  <CKEditor 
								  
                                      
									activeClass="p10" 
									content={this.state.description} 
									required
									events={{
									  "blur": this.onBlur,
									  "afterPaste": this.afterPaste,
									  "change": this.onChange
									  
									}}
									
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
										  />
										  
										  {'vin' in errors && (
											<div className="invalid-feedback">
											  {errors.vin}
											</div>
										  )}
										</div>
									</div>
									</div>
									
									
									{/*  product image upload start*/}
										{/*   <label htmlFor="product_image">Product Image</label>
									<fieldset 
									  style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
									>
									<div className="form-group">
									
										
										<div id="picture" style={{display: 'block'}} className='py-3 px-3'>
											<div className='d-flex'>
											<div className='row'>
											
												
											
											{this.state.product_image != null &&
											  productImages.slice((productImages.length - 1), productImages.length).map((options, key) => ( 
												<div style={{visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}>
													{/* <input 
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
												  
												  <div className="pr-3" style={{position: 'relative', float: 'left', marginTop: '-20%',width: '200px', marginLeft: '-2px', height: '175px' , margin: '0px', marginTop: '17px', marginRight: '-4px', marginBottom: '17px', marginLeft: '4px'}} >
												  <img className="w-100" src={options} style={{width: '200px !important', height: '175px', background: 'white', border: '2px dashed #ccc',visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}/>
												</div>
											  </div>
											))
											}
											 <div className="grid-container">
											<div 
											  style={{visibility: 'visible', 
												animationDuration: '1.8s', 
												animationName: 'fadeIn', 
												width: '123px', 
												height: '116px', 
												textAlign: 'center', 
												marginTop: '-11px',
												border: '0px dashed #ccc',
												color: '#ccc',
												fontSize: '13pt',
												float: 'left',
												marginRight: '14px',
												 marginBottom: '1px',}}>
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
									</div>
									</div>
									</fieldset>
											<br/> */}
									
									
									  <label htmlFor="product_image">Product Image</label>
									
									<fieldset 
									  style={{border: '1px solid #c0c0c0'}}
									>
									<div className="row m-0">
									  {this.state.product_image != '' &&
										<div className='col-md-4 col-sm-4 col-lg-4 border'>
										  
										  {productImages.slice((productImages.length - 1), productImages.length).map((options, key) => ( 
												<div style={{visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}>
												  <div className='text-right' style={{position: 'absolute'}}> 
												    <span onClick={() => this.resetFile(options)} ><i className="fa fa-times-circle-o" /></span>
												  </div>
												  
												  <div >
												  <img className=" mx-auto d-block w-100" src={options} />
												  </div>
											  </div>
											 ))
											 }
										  </div>  
										  
										}
										
										
										<div className='col-md-8 col-sm-8 col-lg-8 '>
										  <div className='row'>
										    <div className='col-md-2 col-sm-2 col-lg-2 border' style={{height: '8rem', maxHeight: '8rem'}}>
											  
											   <div className="box">
												<input 
												   type="file"
												   name="product_image" 
												   id="product_image" 
												   className="d-none" 
												   multiple='multiple' 
												   accept='image/*'
												   ref={this.fileInput} 
												   onChange={this.uploadMultipleFiles}
												/>
												<label htmlFor="product_image" className="text-center" style={{ background: '#fff', verticalAlign: 'top'}}>
												  <span className='text-muted'>
												    <i className="fa fa-plus picture_bx_file_add" /> 
													<p>Add Photos</p>
												  </span>
												</label>
											  </div>
										   
											</div>
											
											
											{this.state.product_image.length >= 2 &&
											  productImages.slice(0, (productImages.length - 1)).map((options, key) => ( 
											    <div className='col-md-2 col-sm-2 col-lg-2 border p-0' style={{height: '8rem', maxHeight: '8rem', visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}>
												  <div className='text-right' style={{zIndex: '100', position: 'absolute'}}> 
												    <span onClick={() => this.resetFile(options)} ><i className="fa fa-times-circle-o" /></span>
												  </div>
												  
												  <img className="h-100 w-100" src={options}/>
												 
											    </div>
											))
											}
											
										  </div>
										
										</div>
									</div>
									</fieldset>
									
								
								{/*  product image upload end*/}
								 <label 	>Choose Product  Condition </label><br/>
								<fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								>
								<br/>
								
									<div className="row">
									<div className="col-sm-4">
									  <div className="form-group">
										 
									 &nbsp;&nbsp; <select name="product_condition" id="product_condition" onChange={this.handleChange}>
										
								    <option>Select</option>&nbsp;&nbsp;
								    <option value="New">New</option>
								    <option value="OLd">OLd</option>
								   
										onBlur={this.handleBlur}
								 
								</select>
										</div>
									</div>
									
							   </div>
							   </fieldset>
							   	<br/>
							   
							   
							   <label htmlFor="product_brand">Brand</label> <br/>  
							   <fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								> <br/>
								
								<div className="form-group ">
								
								  <div className="col-md-4 col-sm-4">
								               
																																	   																							   
									  <select name="product_brand" 
									  onChange={this.handleChange}
										
									 >
									  
									  
										{this.buildOptions('brands')}
									
									  </select>
								   </div>
								   </div>
								   </fieldset>
							 
								<div className="form-group">
								  <label htmlFor="product_year">Product Yearr</label><br/>
								  
								 <DatePicker
								    className="form-control"
									selected={this.state.startDate}
									onChange={this.handleDate}
									showYearPicker
									yearDropdownItemNumber={15}
									dateFormat="yyyy"
								 />
								  
								 
								</div>

								
											
														
									
									
									
									{/*  Fuel type */}
									<label>Fuel Type</label> <br/>  
									
									<fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								><br/>
									
								  
								   
							  
							  
								<div className="form-group">
								  
								&nbsp;&nbsp;
									
									 <select name="product_fuel_id" 
										onChange={this.handleChange}
									  >
										{this.buildOptions('prdattrfuel')}
									
									  </select>
								 
								
								 </div>
								
							
								</fieldset>
														
								
							
							
							<fieldset 
							  style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
							>
							  <legend>Tick The Require One </legend>
							  
							  
								<div className="form-group">
								
								 
							
								    {this.state.prdattrelectronic.map((name, index) => (
								    <label className="checkbox-inline">
                                    <input type="checkbox" name='product_electronic_id[]' value={name.id} onChange={this.handleElectronicSelect}
									
										onBlur={this.handleBlur} /> &nbsp;&nbsp;
									
									{name.name}&nbsp;&nbsp;&nbsp;
									</label>
									
										
									 
									))}
									
									
								  </div>
								 
								  	</fieldset>

									{ /*motors checkbox  */}
								<label>Tick the require one Type</label> <br/>  
							<fieldset 
							  style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
							>
							  
							  
							  
								<div className="form-group">
								 
							
								    {this.state.pdctattrmotor.map((name, index) => (
								    <label className="checkbox-inline">
                                    <input type="checkbox" name='product_motor_id[]' value={name.id}onChange={this.handleMototSelect}
										onBlur={this.handleBlur}
									/> &nbsp;&nbsp;
									
									{name.name}&nbsp;&nbsp;&nbsp;
									
									</label>
									
										
									 
									))}
									
								  </div>
								  
							</fieldset>
									
								
								<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									>	
									<legend>Transmission Type </legend>
								<div className="row">
								<div className="col-sm-4">
								  <div className="form-group">
								 
								  
								
									
									 <select name="product_transmission_id" 
									  onChange={this.handleChange}
										onBlur={this.handleBlur}
										product_electronic_id>
										{this.buildOptions('prdattrtransmission')}
									
									  </select>
								 
								
								 </div>
							  </div>
								</div>
								
								</fieldset>
								
								
							 	<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									>	
									
								<div className="row">
								<div className="col-sm-4">
										
									<div className="form-group">
								  <label htmlFor="engine">Engine</label>
								  <input
									id="engine"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'engine' in errors,
									})}
									name="engine"
									placeholder="Enter Data"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'engine' in errors && (
									<div className="invalid-feedback">
									  {errors.engine}
									</div>
									 )}
									 </div>
									 </div>
									 
								  	
								
								   <div className="col-sm-4">
								   <div className="form-group">
								  <label htmlFor="warrenty">Warrenty</label>
								  <input
									id="warrenty"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'warrenty' in errors,
									})}
									name="warrenty"
									placeholder="Enter Warrenty"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'warrenty' in errors && (
									<div className="invalid-feedback">
									  {errors.warrenty}
									</div>
								  )}
								</div>
								</div>
								  </div>
										<div className="row">
									<div className="col-sm-4">
									<div className="form-group">
									<label htmlFor="product_make">Product Make</label>
									<input
									id="product_make"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_make' in errors,
									})}
									name="product_make"
									placeholder="Enter Product Make"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'product_make' in errors && (
									<div className="invalid-feedback">
									  {errors.product_make}
									</div>
								  )}
								</div>
								</div>
								</div>
								  
								 

							
							
								  <div className="row">
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="product_model">Product Model</label>
								  <input
									id="product_model"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_model' in errors,
									})}
									name="product_model"
									placeholder="Enter Model"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'product_model' in errors && (
									<div className="invalid-feedback">
									  {errors.product_model}
									</div>
								  )}
								</div>
								</div>
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="product_color">Product Color</label>
								  <input
									id="product_color"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_color' in errors,
									})}
									name="product_color"
									placeholder="Enter Product color"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'product_color' in errors && (
									<div className="invalid-feedback">
									  {errors.product_color}
									</div>
								  )}
								</div>
								</div>
								
									<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="storage_capacity">Product Storage Capacity</label>
								  <input
									id="storage_capacity"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'storage_capacity' in errors,
									})}
									name="storage_capacity"
									placeholder="Enter Product  Storage Capacity"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'storage_capacity' in errors && (
									<div className="invalid-feedback">
									  {errors.storage_capacity}
									</div>
								  )}
								</div>
								</div>
									
								</div>
							
								
								
								</fieldset>
							
								<fieldset 
							  style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
							>
								<div className="row">
								<div className="col-sm-4">
							<div className="form-group">
								  <label htmlFor="camera_resolution"> Camera Resoultion</label>
								  <input
									id="camera_resolution"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'camera_resolution' in errors,
									})}
									name="camera_resolution"
									placeholder="Enter  Camera Resoultion"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'camera_resolution' in errors && (
									<div className="invalid-feedback">
									  {errors.camera_resolution}
									</div>
								  )}
								</div>
								</div>
								
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="sim_card_slot"> Sim Card Slot </label>
								  <input
									id="sim_card_slot"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'sim_card_slot' in errors,
									})}
									name="sim_card_slot"
									placeholder="Sim Card Slot"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'sim_card_slot' in errors && (
									<div className="invalid-feedback">
									  {errors.sim_card_slot}
									</div>
								  )}
								</div>
							</div>
							
							
				
						
								</div>
								
								
								 <div className="row">
								<div className="col-sm-4">
								
								
								<div className="form-group">
								  <label htmlFor="ram_memory_card"> Ram / Memory Card </label>
								  <input
									id="ram_memory_card"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'ram_memory_card' in errors,
									})}
									name="ram_memory_card"
									placeholder="Enter Ram / Memory Card"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'ram_memory_card' in errors && (
									<div className="invalid-feedback">
									  {errors.ram_memory_card}
									</div>
								  )}
								</div>
								
								</div>
								<div className="col-sm-4">
								
								<div className="form-group">
								  <label htmlFor="interior">Interior</label>
								  <input
									id="interior"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'interior' in errors,
									})}
									name="interior"
									placeholder="Enter Interior"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'interior' in errors && (
									<div className="invalid-feedback">
									  {errors.interior}
									</div>
								  )}
								</div>
								</div>
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="exterior">Exterior</label>
								  <input
									id="exterior"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'exterior' in errors,
									})}
									name="exterior"
									placeholder="Enter exterior"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'exterior' in errors && (
									<div className="invalid-feedback">
									  {errors.exterior}
									</div>
								  )}
								</div>
								
								</div>
								</div>
								
								</fieldset>
								
								
									
								  
							
								
								
								

								
								
								<div className="form-group">
								  <label htmlFor="video_file_link">Video File Link</label>
								  <input
									id="video_file_link"
									type="url"
									className={classNames('form-control', {
									  'is-invalid': 'video_file_link' in errors,
									})}
									name="video_file_link"
									placeholder="Enter Video File Link"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'video_file_link' in errors && (
									<div className="invalid-feedback">
									  {errors.video_file_link}
									</div>
								  )}
								</div>	
								<div className="form-group">
								  <label htmlFor="youtube">Youtube Link</label>
								  <input
									id="youtube"
									type="url"
									className={classNames('form-control', {
									  'is-invalid': 'youtube' in errors,
									})}
									name="youtube"
									placeholder="Enter  YouTube Link"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'youtube' in errors && (
									<div className="invalid-feedback">
									  {errors.youtube}
									</div>
								  )}
								</div>
										<div className="form-group">
										  <label htmlFor="sale_by">Sale By</label>
										  <input
											id="sale_by"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'sale_by' in errors,
											})}
											name="sale_by"
											placeholder="Sale By"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
										  />
										  
										  {'sale_by' in errors && (
											<div className="invalid-feedback">
											  {errors.sale_by}
											</div>
										  )}
										</div>
										
									<div className="form-group">
								  <label htmlFor="selling_duration">Selling Duration</label>
								  <input
									id="selling_duration"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'selling_duration' in errors,
									})}
									name="selling_duration"
									placeholder="Enter Selling Duration"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'selling_duration' in errors && (
									<div className="invalid-feedback">
									  {errors.selling_duration}
									</div>
								  )}
								</div>
									<div className="form-group">
								  <label htmlFor="selling_price">Product Selling Price</label>
								  <input
									id="selling_price"
									type="number"
									step="0.01"
									className={classNames('form-control', {
									  'is-invalid': 'selling_price' in errors,
									})}
									name="selling_price"
									placeholder="Enter Selling Price"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'selling_price' in errors && (
									<div className="invalid-feedback">
									  {errors.selling_price}
									</div>
								  )}
								</div>
									
									<div className="form-group">
								  <label htmlFor="selling_quantity">Selling Quantity</label>
								  <input
									id="selling_quantity"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'selling_quantity' in errors,
									})}
									name="selling_quantity"
									placeholder="Enter Selling Quantity"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'selling_quantity' in errors && (
									<div className="invalid-feedback">
									  {errors.selling_quantity}
									</div>
								  )}
								</div>
	
								<style dangerouslySetInnerHTML={{__html: "\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input { \n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders *//* \n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n" }} /> 
									
									<div className="form-group">
									
									<label htmlFor="domestic_return">Domestic Return</label>
									<br/>
								
										<label className="switch">
										  <input 
											type="checkbox" 
											name='domestic_return' 
											defaultChecked={this.state.domestic_return} 
											onChange={this.handleChecked}
										 />
										 <span className="slider round" />
										</label>
								
									
								
								   
								   </div>
								   
										
							
								<div className="form-group">
								<label htmlFor="international_return">International Return</label>
									<br/>
									
									<label className="switch">
									  <input 
									    type="checkbox" 
										name='international_return' 
										defaultChecked={this.state.international_return} 
										onChange={this.handleChecked}
									 />
									 <span className="slider round" />
									</label>
							     </div>
							     </div>
								
									
								
								
								{/*  Property type */}
									<label>Property Type</label> <br/>  
									
									<fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								><br/>
									
								  
								   
							  
							  
								<div className="form-group">
								  
								&nbsp;&nbsp;
									
									 <select name="property_type_id" 
										onChange={this.handleChange}
									  >
										{this.buildOptions('propertyatt')}
									
									  </select>
								 
								
								 </div>
								
							
								</fieldset>
								
								 
								  <label >Property Name</label><br/>
								<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									>	<br/>
									
								<div className="row">
								
										
									<div className="form-group">
								
								  <input
									id="property_name"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'property_name' in errors,
									})}
									name="property_name"
									placeholder="Enter Propert Name"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'property_name' in errors && (
									<div className="invalid-feedback">
									  {errors.property_name}
									</div>
									 )}
									
									 </div>
									 </div>
									 </fieldset>
									 
									 {/*  property type*/}
									  <label >Choose property  Condition </label><br/>
								<fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								>
								<br/>
								
									<div className="row">
									<div className="col-sm-6">
									  <div className="form-group">
										 
									 &nbsp;&nbsp; <select name="property_condition" id="property_condition" onChange={this.handleChange}>
										
								    <option>Select</option>&nbsp;&nbsp;
								    <option value="New">New</option>
								    <option value="New">OLd</option>
								    
										
								 
								</select>
								
										</div>
									</div>
									
							   </div>
							   
							   </fieldset>
									 <label >Property Location</label><br/>
								<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									><br/>
									
								<div className="row">
								
										<div className="col-sm-6">
									<div className="form-group">
								<label >Address 1</label><br/>
								  <input
									id="addressOne"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'addressOne' in errors,
									})}
									name="addressOne"
									placeholder="Enter Address 1"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'addressone' in errors && (
									<div className="invalid-feedback">
									  {errors.addressOne}
									</div>
									 )}
									
									 </div>
									 </div>
									 
									 
									 <div className="col-sm-6">
									<div className="form-group">
								 <label >Address 2</label><br/>
								  <input
									id="addressTwo"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'addressTwo' in errors,
									})}
									name="addressTwo"
									placeholder="Enter Address 2"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'addresstwo' in errors && (
									<div className="invalid-feedback">
									  {errors.addressTwo}
									</div>
									 )}
									
									 </div>
									 </div>
									 </div>
									 <div className="row">
									  <div className="col-sm-6">
									<div className="form-group">
								 <label >postal Code</label><br/>
								  <input
									id="postal_code"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'postalCode' in errors,
									})}
									name="postalCode"
									placeholder="Enter Postal Code Of City"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'postal_code' in errors && (
									<div className="invalid-feedback">
									  {errors.postalCode}
									</div>
									 )}
									
									 </div>
									 </div>
									 
								<div className="col-sm-6">
								<div className="form-group">
								 <label >City</label><br/>
								  <input
									id="city"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'city' in errors,
									})}
									name="city"
									placeholder="Enter  City"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'city' in errors && (
									<div className="invalid-feedback">
									  {errors.city}
									</div>
									 )}
									
									 </div>
									 </div>
									 </div>
									 
									  <div className="row">
									  <div className="col-sm-6">
									<div className="form-group">
								 <label >State</label><br/>
								  <input
									id="state"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'state' in errors,
									})}
									name="state"
									placeholder="Enter State Name"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'state' in errors && (
									<div className="invalid-feedback">
									  {errors.state}
									</div>
									 )}
									
									 </div>
									 </div>
									 </div>
									 
									 </fieldset> 
									 
									 {/*  owner image uploads*/}
									 <label> Owner Image</label><br/>
									 								<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									>	<br/>
									 
									<div>
									
									<img src={this.state.owner_img}  className = " profile-user-img img-fluid img-circle" style={{border: 'none'}} /><br/>
									
									<br/><input
									type="file" 
									name="owner_img" 
									onChange={this.onImageChange} />
									
									
									
							

			
								
								</div>
								
								</fieldset> 
								
								<label >B&B</label><br/>
								<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									>	<br/>
								
								<div className="col-sm-6">
									<div className="form-group">
								
								  <input
									id="property_bb"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'property_bb' in errors,
									})}
									name="property_bb"
									placeholder="Enter BB data"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'property_bb' in errors && (
									<div className="invalid-feedback">
									  {errors.property_bb}
									</div>
									 )}
									
									 </div>
									 </div>
									 
									 
									 </fieldset>	
									 <label >Holiday Home <sub>(*  Enter Price Per day Of Home)</sub></label><br/>
								<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									>	<br/>
								<div className="col-sm-6">
									<div className="form-group">
								
								  <input
									id="holiday_home"
									type="number"
									className={classNames('form-control', {
									  'is-invalid': 'holiday_home' in errors,
									})}
									name="holiday_home"
									placeholder="Enter Price of Home "
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								 
								  
								  {'holiday_home' in errors && (
									<div className="invalid-feedback">
									  {errors.holiday_home}
									</div>
									 )}
									
									 </div>
									 
									 
									 </div>
									 </fieldset>
									 
									 {/*  select box for celing*/}
									 
									 <label>Celling Type</label> <br/>  
									
									<fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								><br/>
									
								  
								   
							  
							  
								<div className="form-group">
								  
								&nbsp;&nbsp;
									
									 <select name="property_celling_id" 
										onChange={this.handleChange}
									  >
										{this.buildOptions('propertyattcell')}
									
									  </select>
								 
								
								 </div><br/>
									
								
							
								</fieldset>
									 
									 {/*  Property Services Types Checkbox*/}
									 
									 <br/>  <label>Tick The Services </label>
								<fieldset 
								style={{border: '1px solid #c0c0c0',
								margin: '0 2px', 
								padding: '0.35em 0.625em 0.75em',
								display: 'block', 
								marginInlineStart: '2px', 
								marginInlineEnd: '2px',
								paddingBlockStart: '0.35em',
								paddingInlineStart: '0.75em',
								paddingInlineEnd: '23.75em', 
								paddingBlockEnd: '0.625em', 
								minInlineSize: 'min-content',
								marginBottom: '1em'}}
									>
									
									
							 
							  
							  
								<div className="form-group">
								
								
							
								    {this.state.propertyaatflattyp.map((name, index) => (
								    <label className="checkbox-inline">
                                    <input type="checkbox" name='property_service_id[]' value={name.id} onChange={this.handleProFlatSelect}
									
										onBlur={this.handleBlur} /> &nbsp;&nbsp;
									
									{name.name}&nbsp;&nbsp;&nbsp;
									</label>
									
										
									 
									))}
									
									
								  </div>
								 
								  	</fieldset>
										   <label>Add The Bedroom You Want </label>
								<fieldset 
								style={{border: '1px solid #c0c0c0',
								margin: '0 2px', 
								padding: '0.35em 0.625em 0.75em',
								display: 'block', 
								marginInlineStart: '2px', 
								marginInlineEnd: '2px',
								paddingBlockStart: '0.35em',
								paddingInlineStart: '0.75em',
								paddingInlineEnd: '23.75em', 
								paddingBlockEnd: '0.625em', 
								minInlineSize: 'min-content',
								marginBottom: '1em'}}
									><br/>
									<div className="form-group">
									<div className="number">
									<div
									id='bedroomFlat'>
									
									 </div>
									
									<span onClick = {this.decrement} style={{
									width:'26px',
									height:'25px',
									background:'#f2f2f2',
									borderRadius:'4px',
									padding:'-6px -2px -6px -2px',
									border:'1px solid #ddd',
									display: 'inline-block',
									verticalAlign: 'middle',
									textAlign: 'center'}}
							>-</span> 
							&nbsp;&nbsp;&nbsp;
            
									 <input type="text" value={this.state.bedroomFlat}  style={{
									height: '27px',
									width: '58px',
									textAlign: 'center',
									verticalAlign: 'middle'}}/> 
									&nbsp;&nbsp;&nbsp;									
									
									<span onClick = {this.increment} style={{width:'26px',
									height:'25px',
									background:'#f2f2f2',
									borderRadius:'4px',
									padding:'-6px -2px -6px -2px',
									border:'1px solid #ddd',
									display: 'inline-block',
									verticalAlign: 'middle',
									textAlign: 'center'}}
									>+</span> 
          
										{/* <button onClick = {this.increment}> Add 1 </button> 
									
										<button onClick = {this.decrement}> Minus 1 </button>  */}
						
									
											
										  
										  </div>
										  </div>
									
									
										</fieldset>
										
										{/*  Bedroom House */}
									   <label>Add The Bedroom House You Want </label>
								<fieldset 
								style={{border: '1px solid #c0c0c0',
								margin: '0 2px', 
								padding: '0.35em 0.625em 0.75em',
								display: 'block', 
								marginInlineStart: '2px', 
								marginInlineEnd: '2px',
								paddingBlockStart: '0.35em',
								paddingInlineStart: '0.75em',
								paddingInlineEnd: '23.75em', 
								paddingBlockEnd: '0.625em', 
								minInlineSize: 'min-content',
								marginBottom: '1em'}}
									><br/>
									<div className="form-group">
									<div className="number">
									<div
									id='bedroomFlat'>
									
									 </div>
									
									<span onClick = {this.minus} style={{
									width:'26px',
									height:'25px',
									background:'#f2f2f2',
									borderRadius:'4px',
									padding:'-6px -2px -6px -2px',
									border:'1px solid #ddd',
									display: 'inline-block',
									verticalAlign: 'middle',
									textAlign: 'center'}}
							>-</span> 
							&nbsp;&nbsp;&nbsp;
            
									 <input type="text" value={this.state.bedroomHouse}  style={{
									height: '27px',
									width: '58px',
									textAlign: 'center',
									verticalAlign: 'middle'}}/> 
									&nbsp;&nbsp;&nbsp;									
									
									<span onClick = {this.add} style={{width:'26px',
									height:'25px',
									background:'#f2f2f2',
									borderRadius:'4px',
									padding:'-6px -2px -6px -2px',
									border:'1px solid #ddd',
									display: 'inline-block',
									verticalAlign: 'middle',
									textAlign: 'center'}}
									>+</span> 
          
										{/* <button onClick = {this.increment}> Add 1 </button> 
									
										<button onClick = {this.decrement}> Minus 1 </button>  */}
						
									
											
										  
										  </div>
										  </div>
									
									
										</fieldset>
									 
									 
									 
								
								{/*  seo part*/}
								
						<div className="tab-pane fade" id="custom-content-below-profile" role="tabpanel" aria-labelledby="custom-content-below-profile-tab">
						  
						 <div className='card-body pad'> 
								  
								  <div className="form-group">
									<label htmlFor='seo_title'>Title:</label>
									<div className="input-group">
									  <div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-edit" /></span>
									  </div>
									  <input
										id="seo_title"
										type="text"
										name="seo_title"
										className={classNames('form-control', {
										  'is-invalid': 'seo_title' in errors,
										})}
										placeholder="Title"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.seo_title}
									  />
									  {'seo_title' in errors && (
										  <div className="invalid-feedback">{errors.seo_title}</div>
									  )}
									</div>
								  </div>
								  
								  
								  
								   <div className="form-group">
									<label htmlFor='meta_desc'>Meta Description:</label>
									<div className="input-group">
									  <div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-edit" /></span>
									  </div>
									  <input
										id="meta_desc"
										type="text"
										name="meta_desc"
										className={classNames('form-control', {
										  'is-invalid': 'meta_desc' in errors,
										})}
										placeholder="Meta Description"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.meta_desc}
									  />
									  
									  {'meta_desc' in errors && (
										  <div className="invalid-feedback">{errors.meta_desc}</div>
									  )}
										
									</div>
								   </div>
								   
								   <div className="form-group">
									<label htmlFor='twitter_title'>Twitter:</label>
									<div className="input-group">
									  <div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-edit" /></span>
									  </div>
									  <input
										id="twitter_title"
										type="text"
										name="twitter_title"
										className={classNames('form-control', {
										  'is-invalid': 'twitter_title' in errors,
										})}
										placeholder="Twitter Title"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.twitter_title}
									  />
									  
									  {'twitter_title' in errors && (
										  <div className="invalid-feedback">{errors.twitter_title}</div>
									  )}
										
									</div>
								   </div>
								   
								   
								   <div className="form-group">
									<div className="input-group">
									  <div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-edit" /></span>
									  </div>
									  <input
										id="twitter_image"
										type="text"
										name="twitter_image"
										className={classNames('form-control', {
										  'is-invalid': 'twitter_image' in errors,
										})}
										placeholder="Twitter Image"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.twitter_image}
									  />
									  
									  {'twitter_image' in errors && (
										  <div className="invalid-feedback">{errors.twitter_image}</div>
									  )}
										
									</div>
								   </div>
								   
								   <div className="form-group">
									<div className="input-group">
									  <div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-edit" /></span>
									  </div>
									  <input
										id="twitter_desc"
										type="text"
										name="twitter_desc"
										className={classNames('form-control', {
										  'is-invalid': 'twitter_desc' in errors,
										})}
										placeholder="Twitter Description"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.twitter_desc}
									  />
									  
									  {'twitter_desc' in errors && (
										  <div className="invalid-feedback">{errors.twitter_desc}</div>
									  )}
										
									</div>
								   </div>
								   
								   <div className="form-group">
									<label htmlFor='og_title'>Facebook:</label>
									<div className="input-group">
									  <div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-edit" /></span>
									  </div>
									  <input
										id="og_title"
										type="text"
										name="og_title"
										className={classNames('form-control', {
										  'is-invalid': 'og_title' in errors,
										})}
										placeholder="Facebook Title"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.og_title}
									  />
									  
									  {'og_title' in errors && (
										  <div className="invalid-feedback">{errors.og_title}</div>
									  )}
										
									</div>
								   </div>
								   
								   <div className="form-group">
									<div className="input-group">
									  <div className="input-group-prepend">
										<span className="input-group-text"><i className="fa fa-edit" /></span>
									  </div>
									  <input
										id="og_desc"
										type="text"
										name="og_desc"
										className={classNames('form-control', {
										  'is-invalid': 'og_desc' in errors,
										})}
										placeholder="Facebook Description"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.og_desc}
									  />
									  
									  {'og_desc' in errors && (
										  <div className="invalid-feedback">{errors.og_desc}</div>
									  )}
										
									</div>
								   </div>
								   
								   
								   <div className="form-group">
									<div className="form-group">
									
									  <input
										id="og_image"
										type="file"
										name="og_image"
										className={classNames('form-control', {
										  'is-invalid': 'og' in errors,
										})}
										placeholder="Facebook Image"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										value={this.state.og_image}
									  />
									  
									  {'og_image' in errors && (
										  <div className="invalid-feedback">{errors.og_image}</div>
									  )}
										
									</div>
								   </div>
								  
															   
									
								
						</div>
					  </div>
										
					  
								<div className="form-group text-center">                                    
								  <div className="input-group">
									<button
									  type="submit"
									  className='btn btn-primary'
									  disabled={this.state.isLoading}
									>
									{this.state.isLoading ? "Loading..." : "Submit"}
									 
									</button>
								  </div>
								  </div>
								  </div>
						<div className="tab-custom-content">
						<p className="lead mb-0">Create Your Products here</p>
					  </div>
								
							  </form>
						  
					
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

export default connect(mapStateToProps)(AddProduct);
