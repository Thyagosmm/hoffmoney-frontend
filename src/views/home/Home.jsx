<<<<<<< HEAD
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Home.css";
import images from "../../assets/images.js";
import { Edit, Monitor, BarChart, Globe, ArrowRight, Instagram } from "react-feather";
=======
import React, { useEffect, useState } from "react";
import AppMenu from "../components/appMenu/AppMenu.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import Landing from "../landing/Landing.jsx";
import "./Home.css";

const Home = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLogged(true);
    }
  }, []);
>>>>>>> e0e5e9a272d59e6643a7c262ba19d8fc4a4b9973

const Home1 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
<<<<<<< HEAD
      {/* Navigation */}
      <section className="smart-scroll">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-dark">
            <Link className="navbar-brand heading-black" to="/">
              HoffMoney
            </Link>
            <button
              className="navbar-toggler navbar-toggler-right border-0"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span data-feather="grid"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#features">
                    Recursos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#pricing">
                    Planos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#faq">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#blog">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link page-scroll d-flex flex-row align-items-center text-primary"
                    to="/login"
                  >
                    <em
                      data-feather="layout"
                      width="18"
                      height="18"
                      className="mr-2"
                    ></em>
                    Entrar
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>

      {/* Hero Header */}
      <section className="py-7 py-md-0 bg-hero" id="home">
        <div className="container">
          <div className="row vh-md-100">
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
      <section className="pt-6 pb-7" id="features">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2 className="heading-black">
                HoffMoney oferece tudo o que você precisa.
              </h2>
              <p className="text-muted lead">
                Organize suas finanças, acompanhe seus gastos e tome decisões
                financeiras inteligentes com facilidade.
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-10 mx-auto">
              <div className="row feature-boxes">
                <div className="col-md-6 box">
                  <div className="icon-box box-primary">
                    <div className="icon-box-inner">
                      {/* Usa o ícone Edit */}
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
                      {/* Usa o ícone Monitor */}
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
                      {/* Usa o ícone BarChart */}
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
                      {/* Usa o ícone Globe */}
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

      {/* Pricing Section */}
      <section
        className="py-7 bg-dark section-angle top-right bottom-right"
        id="pricing"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2 className="text-white heading-black">
                Escolha seu plano de assinatura.
              </h2>
              <p className="text-light lead">
                Planos simples - 7 dias de teste gratuito
              </p>
            </div>
          </div>
          {/* TABELAS DE PREÇOS */}
          <div className="row pt-5 pricing-table">
            <div className="col-12 mx-auto">
              <div className="card-deck pricing-table">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title pt-3">Básico</h3>
                    <h2 className="card-title text-primary mb-0 pt-4">R$19</h2>
                    <div className="text-muted font-weight-medium mt-2">
                      por mês
                    </div>
                    <ul className="list-unstyled pricing-list">
                      <li>1 usuário</li>
                      <li>Acesso básico aos recursos</li>
                      <li>Suporte por email</li>
                    </ul>
                    <Link to="/register" className="btn btn-primary">
                      INICIAR TESTE
                    </Link>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title pt-3">Profissional</h3>
                    <h2 className="card-title text-info mb-0 pt-4">R$59</h2>
                    <div className="text-muted font-weight-medium mt-2">
                      por mês
                    </div>
                    <ul className="list-unstyled pricing-list">
                      <li>Até 5 usuários</li>
                      <li>Relatórios avançados</li>
                      <li>Suporte prioritário</li>
                    </ul>
                    <Link to="/register" className="btn btn-info">
                      INICIAR TESTE
                    </Link>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title pt-3">Empresarial</h3>
                    <h2 className="card-title text-primary mb-0 pt-4">R$199</h2>
                    <div className="text-muted font-weight-medium mt-2">
                      por mês
                    </div>
                    <ul className="list-unstyled pricing-list">
                      <li>Usuários ilimitados</li>
                      <li>Relatórios personalizados</li>
                      <li>Suporte dedicado</li>
                    </ul>
                    <Link to="/register" className="btn btn-primary">
                      INICIAR TESTE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="py-7">
          <div className="container">
            {/* Informações sobre o serviço */}
            <div className="row mt-6">
              <div className="col-md-4 mr-auto">
                <h3>Cuidamos de Tudo.</h3>
                <p className="lead">
                  O Hoffmoney oferece tudo o que você precisa para gerenciar
                  suas finanças com confiança. Explore nosso conjunto abrangente
                  de ferramentas e recursos.
                </p>
              </div>
              <div className="col-md-7 offset-md-1">
                <ul className="features-list">
                  <li>Planejamento financeiro personalizado</li>
                  <li>Rastreamento de despesas e orçamento</li>
                  <li>Suporte ao cliente</li>
                  <li>Acompanhamento de progresso</li>
                </ul>
              </div>
            </div>

            {/* Chamada para ação */}
            <div className="row mt-5">
              <div className="col-md-8 col-12 divider top-divider mx-auto pt-5 text-center">
                <h3>HoffMoney gratuito por 7 dias!</h3>
                <p className="mb-4">
                  Experimente o HoffMoney gratuitamente e descubra como
                  transformar sua gestão financeira. Sem compromisso, sem risco.
                </p>
                <Link to="/register" className="btn btn-primary">
                  CADASTRE-SE
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* FAQ */}
      <section className="py-7" id="faq">
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
                  <h6>Posso cancelar a qualquer momento?</h6>
                  <p className="text-muted">
                    Sim, você pode cancelar sua assinatura a qualquer momento
                    sem penalidades.
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <h6>Existe uma versão de teste gratuita?</h6>
                  <p className="text-muted">
                    Sim, oferecemos um teste gratuito de 7 dias para que você
                    possa experimentar todos os recursos antes de se
                    comprometer.
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
                <div className="col-md-6 mb-5">
                  <h6>Qual é sua política de reembolso?</h6>
                  <p className="text-muted">
                    Oferecemos uma garantia de reembolso de 100% dentro de 30
                    dias após a compra, caso você não esteja satisfeito com
                    nossos serviços. Basta entrar em contato com nossa equipe de
                    suporte, e faremos o possível para resolver a situação ou
                    processar o reembolso.
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <h6>Quais métodos de pagamentos são aceitos?</h6>
                  <p className="text-muted">
                    Aceitamos os principais cartões de crédito e débito, como
                    Visa, MasterCard e American Express. Além disso, oferecemos
                    a opção de pagamento via PayPal para sua conveniência.
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
          <div className="row mt-6">
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
      <footer className="py-6">
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
                  <a href="https://www.instagram.com/hoffmoney_/">Privacidade</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">Termos</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">Política de Reembolso</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-2">
              <h5>Parcerias</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.instagram.com/hoffmoney_/">Indique um amigo</a>
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
=======
      <AppMenu />
      {isLogged ? <Dashboard /> : <Landing />}
>>>>>>> e0e5e9a272d59e6643a7c262ba19d8fc4a4b9973
    </>
  );
};

export default Home1;
