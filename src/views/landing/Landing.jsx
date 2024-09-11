import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart,
  Edit,
  Globe,
  Instagram,
  Monitor,
} from "react-feather";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useInView } from "react-intersection-observer";
import images from "../../assets/images.js";

const Landing = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const sectionsRef = useRef([]);
  const currentSection = useRef(0);

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      // Scroll down
      if (currentSection.current < sectionsRef.current.length - 1) {
        currentSection.current += 1;
      }
    } else {
      // Scroll up
      if (currentSection.current > 0) {
        currentSection.current -= 1;
      }
    }
    sectionsRef.current[currentSection.current].scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <>
      {/* Hero Header */}
      <section
        className="py-7 py-md-0 bg-hero"
        id="home"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="container">
          <div className="row vh-md-100">
            <div className="col-md-4 col-sm-7 col-9 mx-auto my-auto text-center">
              <img
                src={images.logo}
                alt="Logo da HoffMoney"
                className="card-img-top img-raised"
              />
            </div>

            <div className="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
              <h1 className="heading-black text-capitalize">
                Gerencie suas finanças com HoffMoney
              </h1>
              <p className="lead py-3">
                O HoffMoney é uma plataforma que ajuda pessoas e empresas a
                organizar suas finanças de maneira eficiente. Cadastre-se agora
                gratuitamente.
              </p>
              <Link
                to="/register"
                className="btn btn-primary d-inline-flex flex-row align-items-center"
              >
                COMECE AGORA
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Recursos Section */}
      <section
        className="pt-6 pb-7"
        id="features"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto mt-4 text-center">
              <h2 className="heading-black">
                HoffMoney oferece tudo o que você precisa.
              </h2>
              <p className="text-muted lead">
                Organize suas finanças, acompanhe seus gastos e tome decisões
                financeiras inteligentes com facilidade.
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-10 mx-auto">
              <div className="row feature-boxes">
                <div className="col-md-6 box">
                  <div className="icon-box box-primary">
                    <div className="icon-box-inner">
                      <Edit width={35} height={35} />
                    </div>
                  </div>
                  <h5>Cadastre suas Despesas e Receitas</h5>
                  <p className="text-muted">
                    Registre todas as suas despesas e receitas em um único lugar
                    e tenha controle total sobre suas finanças.
                  </p>
                </div>
                <div className="col-md-6 box">
                  <div className="icon-box box-success">
                    <div className="icon-box-inner">
                      <Monitor width={35} height={35} />
                    </div>
                  </div>
                  <h5>Acompanhe seus Gastos</h5>
                  <p className="text-muted">
                    Monitore seus gastos de forma detalhada e veja para onde
                    está indo o seu dinheiro.
                  </p>
                </div>
                <div className="col-md-6 box">
                  <div className="icon-box box-danger">
                    <div className="icon-box-inner">
                      <BarChart width={35} height={35} />
                    </div>
                  </div>
                  <h5>Relatórios e Gráficos</h5>
                  <p className="text-muted">
                    Visualize relatórios e gráficos personalizados para entender
                    melhor suas finanças.
                  </p>
                </div>
                <div className="col-md-6 box">
                  <div className="icon-box box-info">
                    <div className="icon-box-inner">
                      <Globe width={35} height={35} />
                    </div>
                  </div>
                  <h5>Acesso em Qualquer Dispositivo</h5>
                  <p className="text-muted">
                    Acesse o HoffMoney em qualquer lugar e a qualquer momento,
                    em todos os seus dispositivos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Carrossel */}
      <section
        className="pt-6 pb-7"
        id="about"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="container">
          <div className="row mt-6">
            <div className="col-md-6 mr-auto">
              <h2>
                HoffMoney é mais do que um simples gerenciador financeiro.
              </h2>
              <p className="mb-5">
                É uma ferramenta completa para planejamento financeiro, que
                ajuda você a tomar decisões baseadas em dados precisos.
              </p>
              <Link to="/register" className="btn btn-light">
                EXPERIMENTE AGORA
              </Link>
            </div>
            <div className="col-md-5">
              <Slider {...settings} className="slick-about">
                <div>
                  <img
                    src={images.finance1}
                    className="img-fluid rounded d-block mx-auto"
                    alt="Work 1"
                  />
                </div>
                <div>
                  <img
                    src={images.finance2}
                    className="img-fluid rounded d-block mx-auto"
                    alt="Work 2"
                  />
                </div>
                <div>
                  <img
                    src={images.finance3}
                    className="img-fluid rounded d-block mx-auto"
                    alt="Work 3"
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section
        className="pt-6 pb-7 mt-5"
        id="faq"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2>Perguntas Frequentes</h2>
              <p className="text-muted lead">
                Aqui estão algumas perguntas comuns sobre nosso serviço.
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-10 mx-auto">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h6>Como faço para me inscrever?</h6>
                  <p className="text-muted">
                    Para se inscrever, basta clicar no botão "Entrar" na parte
                    superior da página e preencher o formulário de inscrição.
                  </p>
                </div>

                <div className="col-md-6 mb-5">
                  <h6>Com que frequência atualizações são lançadas?</h6>
                  <p className="text-muted">
                    Lançamos atualizações regularmente, pelo menos uma vez por
                    mês. Nosso objetivo é garantir que você sempre tenha acesso
                    às últimas funcionalidades e melhorias de segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 mx-auto text-center">
              <h5 className="mb-4">Tem alguma dúvida?</h5>
              <a
                href="https://www.instagram.com/hoffmoney_/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Nosso Contato
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Notícias*/}
      <section
        className="py-7 bg-dark section-angle top-left bottom-left"
        id="blog"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2 className="heading-black">Notícias do HoffMoney.</h2>
              <p className="text-muted lead">
                Aqui você encontra os melhores conselhos financeiros!
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card">
                <a
                  href="https://www.instagram.com/p/C9KnH08uiE1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="card-img-top img-raised"
                    src={images.finance2}
                    alt="Blog 1"
                  />
                </a>
                <div className="card-body">
                  <a
                    href="https://www.instagram.com/p/C9KnH08uiE1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-title mb-2"
                  >
                    <h5>Suas finanças estão em risco!</h5>
                  </a>
                  <p className="text-muted small-xl mb-2">Julho 8, 2024</p>
                  <p className="card-text">
                    Organize suas finanças de forma simples e eficiente. Defina
                    metas, acompanhe gastos e mantenha o controle total do seu
                    dinheiro [...]{" "}
                    <a
                      href="https://www.instagram.com/p/C9KnH08uiE1/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leia Mais...
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <a
                  href="https://www.instagram.com/p/C9JHrW8NZcq/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="card-img-top img-raised"
                    src={images.finance3}
                    alt="Blog 2"
                  />
                </a>
                <div className="card-body">
                  <a
                    href="https://www.instagram.com/p/C9JHrW8NZcq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-title mb-2"
                  >
                    <h5>Os melhores serviços financeiros</h5>
                  </a>
                  <p className="text-muted small-xl mb-2">Julho 7, 2024</p>
                  <p className="card-text">
                    Essas vantagens fazem da HoffMoney uma escolha atraente para
                    quem busca uma maneira prática e eficiente [...]{" "}
                    <a
                      href="https://www.instagram.com/p/C9JHrW8NZcq/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leia Mais...
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <a
                  href="https://www.instagram.com/p/C6XCt8KvgJp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="card-img-top img-raised"
                    src={images.finance1}
                    alt="Blog 3"
                  />
                </a>
                <div className="card-body">
                  <a
                    href="https://www.instagram.com/p/C6XCt8KvgJp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-title mb-2"
                  >
                    <h5>Vida financeira fora de controle?</h5>
                  </a>
                  <p className="text-muted small-xl mb-2">Abril 29, 2024</p>
                  <p className="card-text">
                    Você já parou para pensar como seria ter suas finanças sob
                    controle? Com a HoffMoney, isso se torna possível! Nosso
                    software [...]{" "}
                    <a
                      href="https://www.instagram.com/p/C6XCt8KvgJp/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leia Mais...
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 mx-auto text-center">
              <a
                href="https://www.instagram.com/hoffmoney_/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Ver todas as postagens
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-6" ref={(el) => (sectionsRef.current[5] = el)}>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 mr-auto">
              <h5>Sobre HoffMoney</h5>
              <p className="text-muted">
                HoffMoney é um gerenciador financeiro que permite você cadastrar
                suas despesas e receitas, visualizar relatórios e gráficos, e
                muito mais.
              </p>
              <ul className="list-inline social social-sm">
                <li className="list-inline-item">
                  <a
                    href="https://www.instagram.com/hoffmoney_/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h5>Jurídico</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">Termos</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">
                    Política de Reembolso
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h5>Parcerias</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">
                    Indique um amigo
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">Afiliados</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h5>Ajuda</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">Suporte</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">Entrar</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-muted text-center small-xl">
              &copy; 2024 HoffMoney - Todos os direitos reservados
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
