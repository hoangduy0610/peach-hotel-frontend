import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumbs from "../../layouts/Breadcrumbs/Breadcrumbs";
import Gallery from "../Home/partials/Gallery/Gallery";

const PhotoGallery = () => {
  useEffect(() => {
    document.title = " Gallery   ";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs title="Gallery" pagename="Gallery" />
      <section className="py-5" style={{ overflow: "hidden" }}>
        <Container>
          <Row>
            <Col>
              <Gallery />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PhotoGallery;