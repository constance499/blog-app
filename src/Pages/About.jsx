import { Container, Row, Col, Button, Form, Image, Card } from "react-bootstrap";

const About = () =>{
  return (
    <Container className="about-page py-5">


      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4">About Me</h1>
          <p className="lead text-secondary">
            From Marketing Maven to World Explorer
          </p>
        </Col>
      </Row>

      <Row className="align-items-center mb-5">
        <Col md={6}>
          <p>
            Hi! I'm **Sophia Ellis**, a marketing strategist turned global wanderer.
            My story is built on bold dreams, creative strategy, and endless curiosity.
          </p>
          <p>
            I started in the fast-paced world of digital marketing, helping brands tell their stories.
            But outside work, my heart pulled me toward travel — exploring new places, cultures,
            and food. This blog is where my two passions meet.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <Image
            src="/images/sophia-profile.jpg"
            alt="Sophia Ellis"
            roundedCircle
            fluid
            style={{ maxWidth: "300px" }}
          />
        </Col>
      </Row>

      <Row className="text-center mb-5">
        {/** You can style these as cards or just plain numbers */}
        <Col md={3} sm={6} className="mb-4">
          <Card className="p-3 border-0">
            <h2 className="mb-0">15</h2>
            <p className="text-muted">Countries Explored</p>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="p-3 border-0">
            <h2 className="mb-0">10+</h2>
            <p className="text-muted">Years in Marketing</p>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="p-3 border-0">
            <h2 className="mb-0">200</h2>
            <p className="text-muted">Blog Posts Published</p>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="p-3 border-0">
            <h2 className="mb-0">5</h2>
            <p className="text-muted">Languages Spoken</p>
          </Card>
        </Col>
      </Row>

      
      <Row className="mb-5">
        <Col>
          <h3 className="mb-3">My Story</h3>
          <p>
            It all started working in a boutique marketing agency. I learned how to translate
            big ideas into campaigns — and enjoyed every second of it. But as I worked with
            brands, I realized something: my own story wasn’t just about marketing.
          </p>
          <p>
            On weekends, I planned trips. I traveled solo, documented my experiences, and shared them.
            These journeys taught me more than any campaign ever could — about humanity, creativity,
            and what it means to feel alive.
          </p>
        </Col>
      </Row>

      
      <Row className="bg-light p-4 rounded mb-5">
        <Col>
          <h3 className="mb-3">My Mission</h3>
          <p className="mb-0">
            Through this blog, I want to inspire you — whether you’re building your career, chasing your dreams,
            or planning your next trip. I believe in living with intention, creating meaning, and embracing every
            moment. Let’s grow together.
          </p>
        </Col>
      </Row>

      
      <Row className="mb-5">
        <Col md={6}>
          <h3 className="mb-3">Passion for Cooking</h3>
          <p>
            One of my greatest joys is cooking. When I travel, food is how I connect with a place.
            I try local dishes, learn family recipes, and recreate them in my own kitchen — then share
            them with you here on the blog.
          </p>
        </Col>
        <Col md={6}>
          <h3 className="mb-3">Wanderlust & Travel</h3>
          <p>
            From hidden alleyways to mountain trails, travel is my constant teacher.
            I write about the places that take my breath away, the lessons I pick up, and the people
            I meet. Every trip pushes me to grow, dream, and create.
          </p>
        </Col>
      </Row>

      
      <Row className="text-center mb-5">
        <Col>
          <h4>Find Me On</h4>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer">
              <i className="bi bi-instagram fs-3"></i>
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer">
              <i className="bi bi-twitter fs-3"></i>
            </a>
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noreferrer">
              <i className="bi bi-facebook fs-3"></i>
            </a>
            <a href="https://pinterest.com/yourprofile" target="_blank" rel="noreferrer">
              <i className="bi bi-pinterest fs-3"></i>
            </a>
          </div>
        </Col>
      </Row>

      {/* SUBSCRIBE SECTION */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h5 className="mb-3">Subscribe to My Newsletter</h5>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Button variant="dark" type="submit" className="mt-3 w-100">
                Subscribe
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}
export default About;