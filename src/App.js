import { Button, Col, Container, Row, Form, FormControl, Carousel } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FiTwitter, FiInstagram, FiGithub, FiLinkedin, FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import { useState, useEffect } from 'react';

import background from './assets/backgroundLayer.png';
import backgroundClean from './assets/backgroundSquares.png';
import logo from './assets/logo.png';
import title from './assets/titleFrame.png'
import skins from './assets/skins.jpg'
import vandalSublime from './assets/VandalSublime.png'
import phantomOni from './assets/PhantomOni.png'
import bulldogGlitchpop from './assets/BulldogGlitchpop.png'
import judgeGlitchpop from './assets/JudgeGlitchpop.png'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gunType, setGunType] = useState("all")

  const data = [
    {
      image: vandalSublime,
      category: ["all", "rifle"],
      name: "Vandal Sublime",
      price: "1500 Valorant Points"
    },
    {
      image: phantomOni,
      category: ["all", "rifle"],
      name: "Phantom Oni",
      price: "2150 Valorant Points"
    },
    {
      image: bulldogGlitchpop,
      category: ["all", "rifle"],
      name: "Bulldog Glitchpop",
      price: "3475 Valorant Points"
    },
    {
      image: judgeGlitchpop,
      category: ["all", "shotgun"],
      name: "Judge Glitchpop",
      price: "1720 Valorant Points"
    }
  ]

  function createUser() {
    
    let users = JSON.parse(localStorage.getItem('users') || "[]")

    if(name === "" || email === "") {
      alert("Você precisa inserir nome e email para se cadastrar!")
      return
    }

    if(users.find(user => user.email === email)){
      alert("Este email já foi cadastrado anteriormente.")
      return
    }
  
    localStorage.setItem('users', JSON.stringify([...users, {name, email, product: {}}]));
    alert("Parabéns, " + name + "! Agora você está cadastrado em nosso mercado de skins. ")

    setName("")
    setEmail("")
  }

  return (
    <div className="root-page">
    <div className="page-header align-items-center" style={{ backgroundImage: `url(${background})`, backgroundColor: '#0E1921'}}>
      <Container className="flex header-container justify-content-center pb-5">
        <Row className="d-flex py-5 pb-4 justify-content-between w-100 align-center">
          <img src={logo} className="logo align-center mx-5" />
          <a href='https://playvalorant.com/pt-br/' target="_blank"> 
            <Button className="play-button">
              JOGUE AGORA
            </Button>   
          </a>
        </Row>

        <Row className="d-flex py-5 align-content">
            <Col>
              <img src={title} className="w-100"/>
              <h3 className='w-100 text-center p3-4 xs-1' style={{color: '#FFFFFF'}}> 
                As melhores skins do Valorant estão aqui!
              </h3>      
            </Col>
        </Row>

        <div className="d-flex pt-5 pb-2 justify-content-center w-100">
          <a href='#store'>
            <Button className="down-button">
              <Row className="mx-2 my-1 justify-content-center align-items-center">
                <FiShoppingBag color="#ffffff" size={20} className="mr-4"/>
                <h5 className="pt-1"> 
                  Iniciar Compras
                </h5>
              </Row>
            </Button>
          </a>
        </div>
      </Container>
    </div>

    <div id="store" className="page-cart pt-2" style={{ backgroundImage: `url(${backgroundClean})`}}>
      <Container className="store-container py-2" style={{color: '#0E1921'}}>
        
        <Row className="align-items-center justify-content-between mt-3">
          <Col xs={12} sm={12} md={4}>
            <h1 className="px-4 w-100 title text-left">
              Escolha o seu arsenal!
            </h1>
          </Col>
          <Col className="justify-content-center" xs={12} sm={12} md={4}>
            <Form className='d-flex flex justify-content-center' style={{width:'100%'}}>            
              <Form.Control as="select" className="register-input" placeholder="Tipo de Arma" onChange={e => setGunType(e.target.value)}>
                <option value="all" selected={gunType === "all"}>Todas as armas</option>
                <option value="pistol" selected={gunType === "pistol"}>Pistolas</option>
                <option value="shotgun" selected={gunType === "shotgun"}>Escopetas</option>
                <option value="rifle" selected={gunType === "rifle"}>Fuzis</option>
              </Form.Control>
            </Form>
          </Col>  
        </Row>
        
        <Carousel interval={null} className="d-flex flex-col pt-2"> {
          data.filter(gun => gun.category.find(category => category === gunType)).map(skin => (
            <Carousel.Item className="justify-content-center">
              <img
                className="d-block w-100"
                src={skin.image}
                alt={skin.name}
              />
              <Carousel.Caption className="">
                <Col className="">
                  <h2 className="title">{skin.name}</h2>
                  <p>{"$" + skin.price}</p>
                  <Button className="down-button mb-3">
                    <Row className="mx-2 my-1 justify-content-center align-items-center">
                      <FiShoppingCart color="#ffffff" size={12} className="mr-4"/>
                      <p5 className="">Adicionar ao Carrinho</p5>
                    </Row>
                  </Button>
                </Col>
              </Carousel.Caption>
            </Carousel.Item>
          ))
          } 
        </Carousel>

        <Row className="justify-content-center pt-4">
          <a href='#cart'>
            <Button className="down-button">
              <Row className="justify-content-center align-items-center mx-2 my-1">
                <h5>Ver Carrinho</h5>
                <FiChevronDown color="#ffffff" size={20} className="ml-3 pb-1"/>
              </Row>
            </Button>
          </a>
        </Row>
        

      </Container>

      <div id="cart">
        <Row className="justify-content-center">      
          <Col className='d-flex justify-content-center align-items-center pb-3' xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form className='d-flex flex-column justify-content-center align-items-center pt-1 pb-5'>            
              <Form.Control type="name" placeholder="Nome" className="mt-4 register-input" value={name} onChange={e => setName(e.target.value)}/>
              <Form.Control type="email" placeholder="E-mail" className="mt-4 register-input" value={email} onChange={e => setEmail(e.target.value)}/>
              <Form.Control type="password" placeholder="Senha" className="mt-4 register-input" value={email} onChange={e => setEmail(e.target.value)}/>
              <Button className="mt-4 down-button" onClick={() => createUser()}>
                CADASTRAR
              </Button>
            </Form>
            
          </Col>
                  
        </Row>
      </div>
    </div>

    

    <div className="d-flex valorant-logo justify-content-center" style={{backgroundColor: '#FC4854'}}>
      <Row className='d-flex justify-content-center align-items-start py-5'>
        <Col className='d-flex justify-content-end'> 
          <img src={logo} className="logo align-center" />
        </Col>
        <Col className='d-flex justify-content-start'>
          <h1 className='pt-2 title'>
            Valorant
          </h1>
        </Col>
      </Row>
    </div>

    <div className='py-5' style={{backgroundColor: '#0E1921'}}>
      <Container>
        <Row className='d-flex justify-content-around align-items-center'>
          <Col id='info' className='pr-5 justify-content-around' xl={4} lg={4} md={6} sm={12} xs={12}>
            <Row className='align-items-center' xs='justify-content-center' sm='justify-content-center' md='justify-content-center' lg='justify-content-start'>
              <FiMapPin color="#FC4854" size={15} className="mr-4"/>
              <p className='text-white pt-3'> Av. Abecê - Centro, Recife - PE, Brasil</p>
            </Row>
            <Row className='align-items-center' xs='justify-content-center' sm='justify-content-center' md='justify-content-center' lg='justify-content-start'>
              <FiPhone color="#FC4854" size={15} className="mr-4"/>
              <p className='text-white pt-3'> (81) 9xxxx-xxxx</p>
            </Row>
            <Row className='align-items-center' xs='justify-content-center' sm='justify-content-center' md='justify-content-center' lg='justify-content-start'>
              <FiMail color="#FC4854" size={15} className="mr-4"/>
              <p className='text-white pt-3'> matheusxxxx@xxxx.com</p>
            </Row>           
          </Col>
          <Col id='social' className='justify-content-start' xl={4} lg={4} md={6} sm={12} xs={12}>
            <Row className='py-3 justify-content-center'>
              <a href='https://github.com/matheusvtna/' target="_blank"> 
                <FiGithub color="#FC4854" size={25} className="mr-4"/>
              </a>
              <a href='https://www.linkedin.com/in/matheusvtnandrade/' target="_blank"> 
                <FiLinkedin color="#FC4854" size={25}/>
              </a>
            </Row>
            <Row className='py-3 justify-content-center'>
              <a href='https://www.instagram.com/matheusvtna/' target="_blank"> 
                <FiInstagram color="#FC4854" size={25} className="mr-4"/>
              </a>
              <a href='https://twitter.com/matheusvtna' target="_blank"> 
                <FiTwitter color="#FC4854" size={25}/>
              </a>
            </Row>
          </Col>
          <Col id='back' className='d-flex align-items-center' xs='justify-content-center' sm='justify-content-center' md='justify-content-end' lg='justify-content-end'>
            <Button onClick={() => window.scrollTo(0, 0)} className="down-button ">
              <FiChevronUp color="#ffffff" size={36} className="mx-4" />
            </Button>
          </Col>
        </Row>

        <div>
          <p className='pt-5 text-center' style={{color: 'white'}}> 
          Esta aplicação foi desenvolvida por Matheus Andrade para o Desafio 2 do Programa Hiring Coders promovido pela VTEX em parceira com a Gama Academy. 
          O objetivo do desafio é construir um sistema e-commerce para inventário de produtos e dados de clientes.
          </p>
        </div>
      </Container>
    </div>

  </div>
  );
}

export default App;
