import React from 'react';
import { Loader, Message, Card, Icon, Image, Segment } from 'semantic-ui-react';
import {
    ImageContainer
} from '../../../styledcomponents/home';
import * as utils from '../../../utils.js';
import numeral from 'numeral';
export default class CompatibleGarments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collection: [],
            loading: false,            
        };
    }

    componentDidMount() {
        this.findAll(this.props.subCategoryId);
    }

    findAll(subCategoryId) {                
        this.setState({ loading: true });
        fetch(localStorage.getItem('url') + 'garments'
            + '?select=id,name,description,price,previewImage,active=true,subcategory.id=' + subCategoryId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((res) => res.json())
            .then((response) => {
                this.setState({ loading: false });
                utils.evalResponse(response, () => {
                    this.setState({ collection: response.data })
                });
            })
    }

    componentWillReceiveProps(nextProps) {        
        this.findAll(nextProps.subCategoryId);
    }

    

    renderCollection() {
        return this.state.collection.map((garment) => {
            return (
                <Card style={{ marginTop: '0', cursor: 'pointer', margin: '20px' }} key={garment.id}>
                    <ImageContainer>
                        <Image
                            className="image-card"
                            style={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'all 0.25s' }}
                            src={localStorage.getItem('url') + 'utilities/getFile/' + garment.previewImage} />
                    </ImageContainer>
                    <Card.Content>
                        <Card.Header>{garment.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{garment.subcategory_name}</span>
                        </Card.Meta>
                        <Card.Description>
                            {garment.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='dollar' />
                            {numeral(garment.price).format('0,0.00')}
                        </a>
                    </Card.Content>
                </Card>
            )
        })
    }

    render() {
        if (this.state.loading) {
            return (<Segment style={{'min-height':'400px'}}>
                <Loader active size='big'>Cargando...</Loader>
            </Segment>
            )
        } else {
            if (this.state.collection.length == 0) {
                return (<Message
                    warning
                    header='Sin elementos para mostrar!'
                    content='Esta categoría no cuenta con prendas'
                />)
            } else {
                return (
                    <Card.Group>
                        {this.renderCollection()}
                    </Card.Group>
                )
            }
        }
    }
}