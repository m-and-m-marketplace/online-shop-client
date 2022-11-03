import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function HomePage({products}) {
    return(
        <div>
            <img className="mb-4" src="../images/hero-home.png" alt="hero-home" width="100%"/>
            <h1 style={{ paddingTop: '2%' }}>Highlights</h1>
            <Row xs={1} md={2} lg={4} className="g-4" style={{ paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: "3%"}} >
        {products &&
          products.map((product) => {
            return (
              <Col key={product._id}>
                <Card className="productCard">
                  <Card.Img variant="top" src={product.image_URL} alt={product.title}/>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>$ {product.price}.00</Card.Text>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><Button variant="primary" href="">Add to cart</Button></Card.Text>
                    <Card.Text><Card.Link href={`/products/${product._id}`}>More details</Card.Link></Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          );
          })}
      </Row>
        
        </div>
    )
}


export default HomePage;