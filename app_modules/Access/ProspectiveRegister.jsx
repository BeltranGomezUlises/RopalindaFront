import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Segment, Divider, Header, Input, Form, Container}
  from 'semantic-ui-react';
import * as utils from '../../utils.js';

export default class ProspectiveRegister extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      element:{
        mail: '',
        pass: '',
        name: '',
        fatherLastName: '',
        motherLastName: '',
        phone: '',
        birthday: '2000-01-01'
      },
      confirm: '',
      message: '',
      loading:false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    let pass = this.state.element.pass;
    let confirm = this.state.confirm;
    if (pass !== confirm) {
      this.setState({message:'Contraseña y su confirmación deben ser iguales'})
      return;
    }

    console.log(this.state)
    if (this.state.message === '') {
      this.setState({loading:true, message:''});
      fetch(localStorage.getItem('url') + 'prospectiveCustomers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.element)
      }).then((res) => res.json())
      .then((response) => {
        this.setState({loading: false});
        utils.evalResponse(response, () => {
          console.log(response)
        }, response.meta.message);
      })
    }
  }

  renderMessage(){
    if (this.state.message !== '') {
      return (
        <Segment color='yellow'>
          {this.state.message}
        </Segment>
      )
    }
  }

  renderButton(){
    if (this.state.loading) {
      return(
          <Button loading primary>
            Crear cuenta
          </Button>
      );
    }else{
      return(
        <Button primary type='submit'>
            Crear cuenta
        </Button>
      );
    }
  }

  render(){
    return(
      <Container textAlign='center'>
          <h2>Solicitud de cuenta</h2>
          <Segment textAlign='left'>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} required label='Nombre:'
                    type = 'text' placeholder = 'Ingrese su nombre'
                    value = {this.state.element.name}
                    maxLength = '50'
                    onChange={ (evt) => {
                        let {element} = this.state;
                        element.name = evt.target.value;
                        this.setState({element});
                     }}
                    >
                  </Form.Field>
                  <Form.Field control={Input} required label='Apellido paterno:'
                    type = 'text' placeholder = 'Ingrese su apellido paterno'
                    value = {this.state.element.fatherLastName}
                    maxLength = '50'
                    onChange={ (evt) => {
                        let {element} = this.state;
                        element.fatherLastName = evt.target.value;
                        this.setState({element});
                     }}
                    >
                  </Form.Field>
                  <Form.Field control={Input} required label='Apellido materno:'
                    type = 'text' placeholder = 'Ingrese su apellido materno'
                    value = {this.state.element.motherLastName}
                    maxLength = '50'
                    onChange={ (e) => {
                        let {element} = this.state;
                        element.motherLastName = e.target.value;
                        this.setState({element});
                     }}
                    >
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} required label='Teléfono:'
                    type = 'number'
                    step='1'
                    max='9999999999'
                    placeholder = 'Ingrese su número telefónico a 10 digitos'
                    value = {this.state.element.phone}
                    onChange={ (e) => {
                        let {element} = this.state;
                        element.phone = e.target.value;
                        this.setState({element});
                     }}
                    >
                  </Form.Field>
                  <Form.Field required>
                    <label>Fecha de nacimiento:</label>
                    <input type = 'date'
                      value = {this.state.element.birthday}
                      onChange={ (evt) => {
                        let {element} = this.state;
                        element.birthday = evt.target.value;
                        this.setState({element});
                     }}
                   />
                  </Form.Field>
                </Form.Group>
                <Form.Field control={Input} required label='Correo:'
                  autoFocus type = 'email'
                  placeholder = 'Ingrese su correo electrónico'
                  value = {this.state.element.mail}
                  maxLength = '150'
                  onChange={ (evt) => {
                      let {element} = this.state;
                      element.mail = evt.target.value;
                      this.setState({element});
                   }}
                  >
                </Form.Field>
                <Form.Field control={Input} label='Contraseña:'
                  required type='password' autoComplete='off'
                  placeholder='Ingrese su contraseña'
                  onChange={(e)=>{
                    let {element} = this.state;
                    element.pass = e.target.value;
                    this.setState({element});
                  }}>
                </Form.Field>
                <Form.Field control={Input} label='Confirmación de contraseña:'
                  required type='password' autoComplete='off'
                  placeholder='Ingrese de nuevo su contraseña'
                  onChange={(e)=>{
                    this.setState({confirm: e.target.value})
                  }}>
                </Form.Field>
                {this.renderMessage()}
                {this.renderButton()}
              </Form>
          </Segment>
        </Container>
    )
  }
}
