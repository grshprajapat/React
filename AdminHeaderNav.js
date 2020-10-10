import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import Http from '../Http';
import * as actions from '../store/actions';
import axios from 'axios';
// import '../../../public/dist/css/adminlte.min.css';

var base64 = require('base-64');

  // const [ darkMode, setDarkMode ] = React.useState(false)

class AdminHeaderNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {},
      leadsCount: '',
      apiMore: '',
      moreLoaded: false,
      error: false,
	  
	  showManagerList: false,
	  showProductMList: false,
	 
	  // showMenuList: false,
	  showSettingList: false,
	  
	  darkMode: false,
    };
	this.api = window.appUrl+'api/v1/userDetail';
	// this.themeApi = window.appUrl+'api/v1/themeMode';
	this.themeApi = window.appUrl+'api/v1/themeMode';
	this.countNewLeadsApi = window.appUrl+'api/v1/countNewLeads';
  }
  

  componentWillMount() {
		
		if(this.state.darkMode==false){
		 require('../../../public/dist/css/adminlte.min.css'); 
		}else {
		require('../../../public/dist/css/adminlteDark.min.css');	
			
		}
		
		// require('../../../public/home/assets/css/animate.min.css');	
  }
	
  handleThemeChange = (event) => {
	  
			
	const isVisible = event.target.checked;

	this.setState({
		darkMode: isVisible
		});
		// alert(isVisible);
		// alert(this.state.activeTheme);
	let formData = new FormData();
    formData.append("theme_mode", isVisible);
   
    axios({
      method: "post",
      url: this.themeApi,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
     })
       .then(response => {	
		
        if (response) {
			console.log(response.data.data);
			if(response.data.data == '0')
			{
				// this.userDetail();
				 
				 
				window.location.reload();
				require('../../../public/dist/css/adminlte.min.css');
				this.setState({ darkMode: false });
				// alert('11');
			}
			else
			{
				// alert('s');
				require('../../../public/dist/css/adminlteDark.min.css');
				this.setState({ darkMode: true });
				
			}
			
			
			
			
			// alert(this.state.darkMode);
          }
      })
      .catch(err => {
        console.log("Error: ", err);
      });	  
	}
  


  
  

  toggleHandler = () => {
	const isVisible = this.state.showManagerList;
	this.setState({
		showManagerList: !isVisible
		});
	}
	toggleProductMHandler = () => {
	const isVisible = this.state.showProductMList;
	this.setState({
		
		
		
		
		showProductMList: !isVisible
		});
	}
	
  toggleSettingHandler = () => {
	const isVisible = this.state.showSettingList;
	this.setState({
		showSettingList: !isVisible
		});
  }
  
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.authLogout());
	delete axios.defaults.headers.common["Authorization"];
	return <Redirect to={window.appUrl} />;
  };
  
  
  userDetail() {
	   var access_token = localStorage.getItem('access_token');
		fetch(this.api, { 
		   method: 'get', 
		   headers: new Headers({
			 'Authorization': 'bearer '+ access_token
		   })
		 })
		  .then(response => {
			if (!response.ok) {
			  throw Error(response.statusText);
			}
			return response.json();
		  })
		  .then(response => {
				//alert(response);
				if(response.status == 'Token is Expired')
				{
					localStorage.removeItem("access_token");
					window.location.reload();
				}
				if(response.data.theme_mode == '0')
				{
					require('../../../public/dist/css/adminlte.min.css');
					this.setState({ darkMode: false });
				}
				else
				{
					require('../../../public/dist/css/adminlteDark.min.css');
					this.setState({ darkMode: true });
				}
				this.setState({ data: response.data});
				// console.log(response.data.theme_mode);
		  })
		  .catch(() => {
			
		  });
    }
  
  /* getThemeMode() {
	  var access_token = localStorage.getItem('access_token');
		fetch(this.themeApi, { 
		   method: 'get', 
		   headers: new Headers({
			 'Authorization': 'bearer '+ access_token
		   })
		 })
		  .then(response => {
			if (!response.ok) {
			  throw Error(response.statusText);
			}
			return response.json();
		  })
		  .then(response => { //alert(response);
				  if(response.status == 'Token is Expired')
				  {
					localStorage.removeItem("access_token");
					window.location.reload();
				  }
				this.setState({ activeTheme: response.data});
				
				if(response.data == 'light')
				{
					// require('../../../public/dist/css/adminlte.min.css');
					require('../../../public/dist/css/adminlteDark.min.css');
				}
				else
				{
					require('../../../public/dist/css/adminlteDark.min.css');
				}
				// console.log(response.data);
		  })
		  .catch(() => {
			
		  });
  }
  */ 
  
  componentDidMount() {
	  // if(!this.state.darkMode)
	  // {
		  // require('../../../public/dist/css/adminlte.min.css');  
	  // }
	  
	  const url = window.location.pathname.split("/");
	  const gid = url.pop() || url.pop();
	  
	  if(gid == 'allRoleBased' || gid == 'allManufacturers' || gid == 'allDistributors')
	  {
			this.setState({
					showManagerList: true
				});
	  }
	   if(gid == 'brands' || gid == 'products' || gid == 'categories'|| gid == 'blogs'|| gid == 'addbrand')
	  {
			this.setState({
					showProductMList: true
				});
	  }
	  if(gid == 'addbrand' )
	  {
			this.setState({
					showProductList: true
				});
	  }
	  
	  if(gid == 'header-menu' || gid == 'footer-menu')
	  {
			this.setState({
					showMenuList: true
				});
	  }
	  
	  if(gid == 'general-settings' || gid == 'social-settings' || gid == 'menus' || gid == 'slider' || gid == 'update-profile' || gid == 'membership' || gid == 'email-templates' || gid == 'faqs')
	  {
			this.setState({
					showSettingList: true
				});
	  }
	  
	  this.userDetail();
	  // this.getThemeMode();
	  this.handleLead();
	  
	  
  }
  
  handleLead() {
	  var access_token = localStorage.getItem('access_token');
		fetch(this.countNewLeadsApi, { 
		   method: 'get', 
		   headers: new Headers({
			 'Authorization': 'bearer '+ access_token
		   })
		 })
		  .then(response => {
			if (!response.ok) {
			  throw Error(response.statusText);
			}
			return response.json();
		  })
		  .then(response => {
			  // alert(response.data)
				this.setState({ leadsCount: response.data});
		  })
		  .catch(() => {
			
		  });
  }
  
  render() {
	  // alert(window.appUrl);
    const url = window.location.pathname.split("/");
	const gid = url.pop() || url.pop();
		
    const { loading, error, apiMore } = this.state;
    const { adminAuthenticated } = this.props;
    const { jAdminAuthenticated } = this.props;
	
	const admin_type = localStorage.getItem('role');
	
	if (!adminAuthenticated) {
      // return <Redirect to={from} />;
	  return <Redirect to={window.appUrl} />;
    }
	
		
		if(this.state.darkMode==false){
		 require('../../../public/dist/css/adminlte.min.css'); 
		}else {
		require('../../../public/dist/css/adminlteDark.min.css');	
			
		}
	  
	
    return (
      <div>
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-dark navbar-lightblue">
          {/* Left navbar links */}
			  {/*<ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fa fa-bars" /></a>
            </li>
			  </ul>*/}
          
		   <ul className="navbar-nav ml-auto">
			
			<li className="nav-item">
			  <a className="nav-link" href="#" role="button">
				<div className="switch">
				  <input id="switch-1" type="checkbox" className="switch-input" onChange={this.handleThemeChange} checked={this.state.darkMode} />
				  <label htmlFor="switch-1" className="switch-label">Switch</label>
			    </div>
			  </a>
			</li>
			
		    <li className="nav-item dropdown">
				<a className="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
				  <i className="fa fa-gear" />
				</a>
				<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left: 'inherit', right: '0px'}}>
				  <span className="dropdown-item dropdown-header">Settings</span>
				  <div className="dropdown-divider" />
				  <Link to={window.appUrl+'admin/general-settings'} className="dropdown-item">
					<i className="fa fa-envelope mr-2" />General
				  </Link>
				  <div className="dropdown-divider" />
				  <Link to={window.appUrl+'admin/social-settings'} className="dropdown-item">
					<i className="fa fa-users mr-2" />Social
				  </Link>
				  <div className="dropdown-divider" />
				  <Link to={window.appUrl+'admin/menus'} className="dropdown-item">
					<i className=" fa fa-indent mr-2" />menu
				  </Link>
				  <div className="dropdown-divider" />
				  <Link to={window.appUrl+'admin/slider'} className="dropdown-item">
					<i className=" fa fa-sliders mr-2 " />Slider
				  </Link>
				  
				  <div className="dropdown-divider" />
				  <Link to={window.appUrl+'admin/update-profile'} className="dropdown-item">
					<i className=" fa fa-user-circle-o mr-2" />Update-Profile
				  </Link>
				  <div className="dropdown-divider" />
				  <Link to={window.appUrl+'admin/email-templates'} className="dropdown-item">
					<i className=" fa fa-file-text-o mr-2" />Email-Templates
				  </Link>
				  <div className="dropdown-divider" />
				  <Link to={window.appUrl+'admin/faqs'} className="dropdown-item">
					<i className=" fa fa-question-circle mr-2" />Faqs
				  </Link>
				  
				  <div className="dropdown-divider" />
				  <a href="#" className="dropdown-item">
					<i className="fa fa-file mr-2" /> 3 new reports
				  </a>
				  <div className="dropdown-divider" />
				  <a href='#' className="dropdown-item" onClick={this.handleLogout}>
				   <i className=" fa fa-sign-out mr-2 " />LogOut
				 </a>
				  
				  <div className="dropdown-divider" />
				  <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
				  
				  
				</div>
			</li>
		
				
				  
			
			
			
			<li className="nav-item">
			  <a className="nav-link" data-widget="pushmenu" href="#" role="button">
				<i className="fa fa-bars" />
			  </a>
			</li>
		   </ul>
        </nav>
        {/* /.navbar */}
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{height: '-webkit-fill-available'}}>
          {/* Brand Logo */}
          <a href="" className="brand-link">
            <img src={window.appUrl+"public/dist/img/AdminLTELogo.png"} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">Admin </span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar Menu */}
			
			<div className="user-panel mt-3 pb-3 mb-3 d-flex">
				<div className="image">
				  <img src={window.appUrl+"public/dist/img/user2-160x160.jpg"} className="img-circle elevation-2" alt="User Image" />
				</div>
				<div className="info">
				  <a href="#" className="d-block text-capitalize">{this.state.data.name}</a>
				</div>
			  </div>
			  
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
                
				{(jAdminAuthenticated == 'superadmin' || jAdminAuthenticated == 'admin') && 
				<li className="nav-item has-treeview menu-open">
                 
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to={window.appUrl+"admin/dashboard"} className={"nav-link " + (gid == 'dashboard' ? 'active' : '')}>
                        <i className="fa fa-tachometer nav-icon" />
                        <p className={(gid == 'dashboard' ? '' : 'text-white')}>Dashboard</p>
                      </Link>
                    </li>
                  </ul>
                </li>
				}
				
				{/* Products manager  */}
				<li className="nav-item has-treeview">
                  <a href='#' className="nav-link "  onClick={this.toggleProductMHandler}>
                    <i className="nav-icon fa fa-users" />
                    <p className="text-white"> 
					  Product Manager
					  <i className={"admin-nav-effect right fa " + (this.state.showProductMList ? 'fa-angle-down' : 'fa-angle-left')}></i>
					</p>
                  </a>
                </li>
				
				{this.state.showProductMList && (
				
				 <ul className='admin-nav-effect'>
				<li className="nav-item">
                  <Link to={window.appUrl+"admin/brands"} className={"nav-link " + (gid == 'brands' ? 'active' : '')}>
                  <Link to={window.appUrl+"admin/addbrands"} className={"nav-link " + (gid == 'addbrands' ? 'active' : '')}>
                  
                  
				  
                    <i className="nav-icon fa fa-bandcamp text-white  mr-2" />
                    <p className="text-white">
                      Brands
                    </p>
                  </Link>
                  </Link>
                 
                 
                </li>
				
                <li className="nav-item" >
                  <Link to={window.appUrl+"admin/products"} className={"nav-link " + (gid == 'products' ? 'active' : '')}>
                    <i className="nav-icon fa fa-th-list text-white  mr-2" />
                    <p className="text-white">
                    Products
                    </p>
                  </Link>
                </li>
				
				<li className="nav-item">
                  <Link to={window.appUrl+"admin/blogs"} className={"nav-link " + (gid == 'blogs' ? 'active' : '')}>
                    <i className="nav-icon fa fa-newspaper-o text-white  mr-2 " />
                    <p className="text-white"> Blogs </p>
                  </Link>
                </li>
				
				 <li className="nav-item">
                  <Link to={window.appUrl+"admin/categories"} className={"nav-link " + (gid == 'categories' ? 'active' : '')}>
                    <i className="nav-icon fa fa-database text-white mr-2  " />
                    <p className="text-white">
                      Categorie
                    </p>
                  </Link>
                </li>
				 </ul> 
			)}
				
				
				
				<li className="nav-item has-treeview">
                  <a href='#' className="nav-link" onClick={this.toggleHandler}>
                    <i className="nav-icon fa fa-users" />
                    <p className="text-white"> 
					  User Manager
					  <i className={"admin-nav-effect right fa " + (this.state.showManagerList ? 'fa-angle-down' : 'fa-angle-left')}></i>
					</p>
                  </a>
                </li>
				
				{this.state.showManagerList && (
				    <ul className='admin-nav-effect'>
					<li className="nav-item">
					  <Link to={window.appUrl+"admin/allRoleBased"} className={"nav-link " + (gid == 'allRoleBased' ? 'active' : '')}>
						<i className="nav-icon fa fa-user-secret text-white" />&nbsp;
						<p className="text-white"> Admin Users</p>
					  </Link>
					</li>
					<li className="nav-item">
					  <Link to={window.appUrl+"admin/sellers"} className={"nav-link " + (gid == 'sellers' ? 'active' : '')}>
						<i className="nav-icon fa fa-user text-white" />&nbsp;
						<p className="text-white"> Sellers </p>
					  </Link>
					</li>
					<li className="nav-item">
					  <Link to={window.appUrl+"admin/users"} className={"nav-link " + (gid == 'users' ? 'active' : '')}>
						<i className="nav-icon fa fa-user text-white" />&nbsp;
						<p className="text-white"> Users</p>
					  </Link>
					</li>
					</ul>
				)}
				
				<li className="nav-item">
                  <Link to={window.appUrl+"admin/pages"} className={"nav-link " + (gid == 'pages' ? 'active' : '')}>
                    <i className="nav-icon fa fa-book" />
                    <p className="text-white">
					  Pages
					</p>
                  </Link>
                </li>
				
				
				
				<li className="nav-item">
                  <Link to={window.appUrl+"admin/media"} className={"nav-link " + (gid == 'media' ? 'active' : '')}>
                    <i className="nav-icon fa fa-image" />
                    <p className="text-white"> Media </p>
                  </Link>
                </li>
				
				
				{/*<li className="nav-item">
                  <a href='#' className="nav-link" onClick={this.toggleMenuHandler}>
                    <i className="nav-icon fa fa-square" />
                    <p className="text-white"> 
					  Menu
					  <i className={"admin-nav-effect right fa " + (this.state.showMenuList ? 'fa-angle-down' : 'fa-angle-left')}></i>
					</p>
                  </a>
                </li>
				
				{this.state.showMenuList && (
				    <ul classname='admin-nav-effect'>
					<li className="nav-item">
					  <Link to={window.appUrl+"admin/header-menu"} className={"nav-link " + (gid == 'header-menu' ? 'active' : '')}>
						<i className="nav-icon fa fa-square text-white" />&nbsp;
						<p className="text-white">Header Menu</p>
					  </Link>
					</li>
					<li className="nav-item">
					  <Link to={window.appUrl+"admin/footer-menu"} className={"nav-link " + (gid == 'footer-menu' ? 'active' : '')}>
						<i className="nav-icon fa fa-square text-white" />&nbsp;
						<p className="text-white">Footer Menu</p>
					  </Link>
					</li>
					</ul>
				)}*/}
				
			
               </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
       
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

export default connect(mapStateToProps)(AdminHeaderNav);
