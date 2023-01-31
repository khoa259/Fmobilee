import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-6 text-center my-4">
            <h2 className="heading-section">liên hệ với chúng tôi</h2>
          </div>
        </div>
        <div className="row justify-content-center bg-light shadow-sm  bg-body rounded">
          <div className="col-md-12">
            <div className="wrapper">
              <div className="row no-gutters py-3">
                <div className="col-md-7">
                  <div className="contact-wrap w-100 p-md-3 ">
                    <h3 className="mb-4">liên hệ</h3>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      name="contactForm"
                      className="contactForm">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="name">
                              Họ Tên
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Họ Tên"
                              {...register("name", { required: true })}
                            />
                            {errors.name?.type === "required" && (
                              <p className="text-validate">
                                Không bỏ trống trường họ tên
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="email">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              {...register("email", { required: true })}
                            />
                            {errors.email?.type === "required" && (
                              <p className="text-validate">
                                Không bỏ trống trường Email
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                            <input
                              type="number"
                              className="form-control"
                              id="phoneNumber"
                              placeholder="0123456789"
                              {...register("phoneNumber", {
                                required: true,
                                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})/,
                              })}
                            />
                            {errors.phoneNumber?.type === "required" && (
                              <p className=" text-validate">
                                Số điện thoại không được bỏ trống
                              </p>
                            )}
                            {errors.phoneNumber?.type === "pattern" && (
                              <p className=" text-validate">
                                Không đúng định dạng
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-floating">
                            <label className="label" htmlFor="#">
                              Ghi chú
                            </label>
                            <textarea
                              className="form-control"
                              id="message"
                              cols={30}
                              rows={5}
                              placeholder="Ghi chú ..."
                              {...register("note", { required: true })}
                            />
                            {errors.note?.type === "required" && (
                              <p className="text-validate">
                                không bỏ trống trường
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="submit"
                              defaultValue="Send Message"
                              className="btn btn-primary"
                            />
                            <div className="submitting" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 d-flex ">
                  <div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7448.639690229411!2d105.83586922120061!3d21.019884486524973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBIb8OgbiBLaeG6v20sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1675154805318!5m2!1svi!2s"
                      width={460}
                      height={500}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
