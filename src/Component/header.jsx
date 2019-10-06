import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

    class header extends Component {
        DeleteStorage = () => {
            localStorage.removeItem("userData")
          }
        
            constructor(props) {
                super(props);
            
                this.toggle = this.toggle.bind(this);
                this.state = {
                  isOpen: false
                };
              }
              toggle() {
                this.setState({
                  isOpen: !this.state.isOpen
                });
              }
              
               render() {    
          return (
            <div>
              <Navbar color="light" light expand="md">
                <Link className="navbar-brand" to="/">Follow</Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                   <NavItem>
                        <NavLink to='/register'>
                            <Button className='mx-3' color="primary">Register</Button>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/login'>
                            <Button color="success">Login</Button>
                        </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
        }
    }

export default header