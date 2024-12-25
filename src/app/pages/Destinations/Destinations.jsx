import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Destinations.scss';
import Breadcrumbs from '../../layouts/Breadcrumbs/Breadcrumbs';
import Cards from '../../layouts/Cards/Cards';
import { destinationsData } from '../../modules/data';

const Destinations = () => {
  useEffect(() => {
    document.title = "Destinations";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs title="Destinations" pagename="Destinations" />

      <section className="destinations py-5">
        <Container>
          <Row>
            {destinationsData.map((destination, inx) => {
              return (
                <Col md="3" sm="6" key={inx} className="pb-4">
                  <Cards destination={destination} key={inx} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Destinations;
