import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Image, Button, Menu, Segment, Icon } from 'semantic-ui-react';
import './Home.css';
import logo from "../../assets/logo.png";
import banner from "../../assets/banner.png";

const Home = () => {
    return (
        <>
            {/* Header */}
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item as={Link} to="/" header>
                        <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
                        Hoffmoney
                    </Menu.Item>
                    <Menu.Item as={Link} to="/#services">Serviços</Menu.Item>
                    <Menu.Item as={Link} to="/#testimonials">Depoimentos</Menu.Item>
                    <Menu.Item as={Link} to="/#about">Sobre</Menu.Item>
                    <Menu.Item as={Link} to="/#contact">Contato</Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Icon name="search" />
                        </Menu.Item>
                        <Menu.Item as={Link} to="/login">Login</Menu.Item>
                        <Menu.Item as={Link} to="/register">Registrar-se</Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>

            <Image src={banner} fluid />
            <Segment inverted textAlign='center' className='banner'>
                <Container>
                    <Header as='h1' inverted>
                        Bem-vindo à Hoffmoney
                    </Header>
                    <p>Gerenciando seu futuro financeiro com confiança</p>
                    <Button primary size='huge' as={Link} to="/#about">
                        Saiba Mais
                    </Button>
                </Container>
            </Segment>

            {/* Sobre Nós */}
            <Segment id="about">
                <Container text>
                    <Header as='h2'>Sobre Nós</Header>
                    <p>Nossa missão é ajudar você a gerenciar seu futuro financeiro com confiança e segurança.</p>
                </Container>
            </Segment>

            {/* Serviços */}
            <Segment id="services">
                <Container>
                    <Header as='h2' textAlign='center'>Serviços</Header>
                    <div className="ui three column stackable grid">
                        <div className="column">
                            <Segment>
                                <Header as='h3'>Consultoria Financeira</Header>
                                <p>Ajudamos você a tomar as melhores decisões financeiras.</p>
                            </Segment>
                        </div>
                        <div className="column">
                            <Segment>
                                <Header as='h3'>Planejamento de Investimentos</Header>
                                <p>Estratégias de investimento personalizadas para você.</p>
                            </Segment>
                        </div>
                        <div className="column">
                            <Segment>
                                <Header as='h3'>Gestão de Riscos</Header>
                                <p>Proteja seu patrimônio com nossas soluções de gestão de riscos.</p>
                            </Segment>
                        </div>
                    </div>
                </Container>
            </Segment>

            {/* Depoimentos */}
            <Segment id="testimonials">
                <Container text>
                    <Header as='h2' textAlign='center'>Depoimentos</Header>
                    <div className="ui two column stackable grid">
                        <div className="column">
                            <Segment>
                                <p>"A Hoffmoney transformou a maneira como gerencio minhas finanças. Recomendo!" - Cliente Satisfeito</p>
                            </Segment>
                        </div>
                        <div className="column">
                            <Segment>
                                <p>"Profissionais altamente qualificados e serviços excepcionais." - Cliente Satisfeito</p>
                            </Segment>
                        </div>
                    </div>
                </Container>
            </Segment>

            {/* Rodapé */}
            <Segment inverted vertical id="contact">
                <Container textAlign='center'>
                    <p>© 2024 Hoffmoney. Todos os direitos reservados.</p>
                    <div className="social-links">
                        <Button circular color='instagram' icon='instagram' as='a' href="https://www.instagram.com" />
                        <Button circular color='mail' icon='mail' as='a' href="mailto:contato@hoffmoney.com" />
                        <Button circular color='info' icon='info' as={Link} to="/sobre" />
                    </div>
                </Container>
            </Segment>
        </>
    );
};

export default Home;
