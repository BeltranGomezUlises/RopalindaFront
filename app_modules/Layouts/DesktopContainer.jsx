import React, { Component } from 'react'
import {
  Modal, Button, Container, Header, Image,
  Menu, Icon, Link, Dropdown
} from 'semantic-ui-react'
import Login from '../Access/Login.jsx'
import * as utils from '../../utils.js'


export default class DesktopContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalLoginVisible: false,
      activeItem: 'home',
      categories: []
    }
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    fetch(localStorage.getItem('url') + 'categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((res) => res.json())
      .then((r) => {
        utils.evalResponse(r, () => {
          this.setState({ categories: r.data })
        })
      });
  }

  hideFixedMenu() {
    this.setState({ fixed: false })
  }

  showFixedMenu() {
    this.setState({ fixed: true })
  }

  handleClick(e, { name }) {
    let ruta = window.location.href.split('#');
    window.location.href = ruta[0] + '#/' + name;

    this.setState({ activeItem: name })
  }

  closeModal() {
    this.setState({ modalLoginVisible: false })
  }

  openModal() {
    this.setState({ modalLoginVisible: true })
  }

  renderCategoryList() {
    let imgStyle  = {
      maxWidth: '24px !important'   
    }
    return this.state.categories.map(i => {
      console.log(this.iconRoute + i.icon);
      return (
        <Dropdown
          key={i.id}
          name={i.name}
          item
          simple
          text={i.name}
          icon={
              <img src={ localStorage.getItem('url') + 'utilities/getFile/' + i.icon}
              width='24px'/>}>
          <Dropdown.Menu>
            {this.renderSubCategoryList(i.subcategoryCollection)}
          </Dropdown.Menu>
        </Dropdown>
      )
    })
  }

  renderSubCategoryList(subCategories) {
    return subCategories.map(sub => {
      console.log(this.iconRoute + sub.icon)
      return (
        <Dropdown.Item key={sub.id} name={'prendas/'+categoryName+'/'+sub.name} as={Link} onClick={this.handleClick}>
        <img src={localStorage.getItem('url') + 'utilities/getFile/' + sub.icon}/>
        {sub.name}
        </Dropdown.Item>
      )
    }
    )
  }

  render() {
    const { children } = this.props
    const { fixed, activeItem } = this.state
    
    return (
      
      <div>
        <Menu
          fixed={top}
          style={{ "max-height": "70px", "min-height": "70px" }}>
          <Container>
            <Image src='assets/logo.png' bordered size='small' style={{ padding: '10px' }} />
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleClick}>
              <Icon name='home' />
              Inicio
                </Menu.Item>
            {this.renderCategoryList()}
            <Menu.Item position='right'>
              <Modal
                trigger={
                  <Button onClick={this.openModal}>Iniciar sesión</Button>
                }
                onClose={this.closeModal}
                open={this.state.modalLoginVisible}>
                <Header content='Iniciar Sesión' textAlign='center' />
                <Modal.Content >
                  <Login close={this.closeModal} />
                </Modal.Content>
              </Modal>
            </Menu.Item>
          </Container>
        </Menu>
        <div style={{ "max-height": "70px", "min-height": "70px" }}></div>
        {children}
      </div>
    )
  }

}
