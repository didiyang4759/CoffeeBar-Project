import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './LandingPage.css'

const LandingPage = ({ user }) => {

    return (
        <Container className="main-container">
            <Row>
                <Card className='textCard'>
                    <Card.Header className="headerStyle">
                        MORE THAN JUST A PRETTY FACE
                    </Card.Header>
                    <Card.Title className='titleStyle1'>
                        We have a brew
                    </Card.Title>
                    <Card.Title className='titleStyle2'>
                        for every time of day.
                    </Card.Title>
                    <Card.Text className='titleStyle4'>
                        Coffeebar serves more than just a great cup of coffee. We are
                        a radically-inclusive italian cafe experience, serving everything from your
                        morning expresso to your evening glass of wine. Inspired by the cafe culture in italy.
                        We are dedicated to local producers and artisans, and driven by our staff, customers, and community.
                    </Card.Text>    
                    <Card.Img
                        className="figure1"
                        src={"https://media.istockphoto.com/photos/cup-of-espresso-with-coffee-beans-picture-id1177900338?k=20&m=1177900338&s=612x612&w=0&h=rwLAoPzPiKdSbcdBFs4-TTt5O1Qpe0EFVY5KRqRPKmI="}
                    />
                </Card>
                <Col>
                    <Card className='cardStyle'>
                    <Card.Body>
                        <Card.Title className='titleStyle3'>
                            Coffeebar Voted Best Local coffee
                        </Card.Title>
                        <Card.Img
                            className='figure2'
                            src={"https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?auto=compress&cs=tinysrgb&h=566.525&fit=crop&w=633.175&dpr=1"}
                        />
                        <Card.Text>
                        This is the popular coffee selected this week, so if it's your first time to shop for coffee, you can try it!
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
         
    )
}

export default LandingPage;