import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuList } from "./data-menu/data-menu";
const Footer = () => {
  return (
    <footer className=" text-lg-start bg-dark  " style={{ color: "white" }}>
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom container">
        <div className="me-5 d-none d-lg-block">
          <span>Kết nối với chúng tôi qua:</span>
        </div>

        <div>
          <Link to="/" className="mx-2 text-reset">
            <i className="fab fa-facebook-f" />
          </Link>
          <Link to="/" className="mx-2 text-reset">
            <i className="fab fa-google" />
          </Link>
          <Link to="/" className="mx-2 text-reset">
            <i className="fab fa-instagram" />
          </Link>
          <Link to="//github.com/khoa259/Fmobilee" className="mx-2 text-reset">
            <i className="fab fa-github" />
          </Link>
        </div>
      </section>
      <section>
        <div className="container text-md-start my-4">
          <section>
            <form action>
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Dăng ký email để nhận thông tin mới nhất</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="form5Example21"
                      className="form-control"
                      placeholder="Email của bạn"
                    />
                  </div>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Đăng ký
                  </button>
                </div>
              </div>
            </form>
          </section>

          <div className="row ">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14899.758940560228!2d105.8068366623841!3d20.995052723565063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac927ce95957%3A0xe230355f8983adb9!2zVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1673078938175!5m2!1svi!2s"
                width={300}
                height={200}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                Products
              </h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div> */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                Sản Phẩm
              </h6>
              {MenuList.map((l, i) => (
                <p key={i}>
                  <Link to={l.path} className="text-reset">
                    {l.label}
                  </Link>
                </p>
              ))}
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                Liên Hệ
              </h6>
              <p>
                <i className="fas fa-home mx-2" /> Thanh Xuân, Hà Nội
              </p>
              <p>
                <i className="fas fa-envelope mx-2" />
                infotest@gmail.com
              </p>
              <p>
                <i className="fas fa-phone mx-2" /> 096418425
              </p>
              <p>
                <i className="fas fa-print mx-2" /> 096418425
              </p>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Container>
          <Row>
            <Col className="text-center py-3">
              Copyright 2022 &copy; Fmobile
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
