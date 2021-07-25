import { Button, Col, Container, Row, Form, FormControl, Carousel, Modal } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FiTwitter, FiInstagram, FiGithub, FiLinkedin, FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import background from './assets/backgroundLayer.png';
import backgroundClean from './assets/backgroundSquares.png';
import logo from './assets/logo.png';
import title from './assets/titleFrame.png'
import vandalSublime from './assets/VandalSublime.png'
import vandalColmeia from './assets/VandalColmeia.png'
import bulldogGlitchpop from './assets/BulldogGlitchpop.png'
import judgeGlitchpop from './assets/JudgeGlitchpop.png'
import ghostSilence from './assets/GhostSilence.png'
import frenzyClitchpop from './assets/FrenzyGlitchpop.png'
import sheriffJett from './assets/SheriffJett.png'
import buckyDiversao from './assets/BuckyDiversao.png'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const data = [
    {
      image: frenzyClitchpop,
      category: "pistol",
      name: "Frenzy Glitchpop",
      price: "1000"
    },
    {
      image: ghostSilence,
      category: "pistol",
      name: "Ghost Silencialmas",
      price: "995"
    },
    {
      image: sheriffJett,
      category: "pistol",
      name: "Sheriff Jett",
      price: "300"
    },
    {
      image: bulldogGlitchpop,
      category: "rifle",
      name: "Bulldog Glitchpop",
      price: "3475"
    },
    {
      image: vandalColmeia,
      category: "rifle",
      name: "Vandal Colmeia",
      price: "1500"
    },
    {
      image: vandalSublime,
      category: "rifle",
      name: "Vandal Sublime",
      price: "2150"
    },
    {
      image: buckyDiversao,
      category: "shotgun",
      name: "Bucky Divertida",
      price: "775"
    },
    {
      image: judgeGlitchpop,
      category: "shotgun",
      name: "Judge Glitchpop",
      price: "1720"
    }
  ]

  // Personal info
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentEmail, setEmailLogged] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [logged, setLogged] = useState("")

  // Products and Cart
  const [cart, setCart] = useState([])
  const [product, setProduct] = useState("")
  const [guns, setGuns] = useState(data)
  
  // Modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Notifications
  const notifyOk = (msg) => toast(msg, {
    duration: 4000,
    position: 'top-center',
    // Styling
    style: {},
    className: '',
    // Custom Icon
    icon: '👏',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

  const notifyError = (msg) => toast(msg, {
    duration: 4000,
    position: 'top-center',
    // Styling
    style: {},
    className: '',
    // Custom Icon
    icon: '❌',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

  function createUser() {
    
    let users = JSON.parse(localStorage.getItem('users') || "[]")

    if([name, email, password, country, state, city, street].includes("")) {
      console.log("campo vazio")
      notifyError("Você precisa inserir todos os dados para se cadastrar!")
      return
    }

    if(users.find(user => user.email === email)){
      notifyError("Este email já está sendo utilizado.")
      return
    }
  
    localStorage.setItem('users', JSON.stringify([...users, {name, email, password, country, state, city, street, cart: []}]));
    notifyOk("Parabéns, " + name + "! Você foi cadastrado com sucesso.")
    setShowRegister(false)

    login()

    setName("")
    setEmail("")
    setPassword("")
    setEmailLogged("")
    setCountry("")
    setState("")
    setCity("")
    setStreet("")
  }

  function login() {
    let users = JSON.parse(localStorage.getItem('users') || "[]")
    let index = users.findIndex(user => user.email === email)

    if(index != -1){
      let user = users[index]
      if(user.password === password) {
        notifyOk("Parabéns, " + user.name + '! Login realizado com sucesso.')
        setShowLogin(false)
        setLogged(user.name)
        setEmailLogged(user.email)
        setCart(user.cart)
        return
      }
    }

    notifyError("As credenciais estão erradas.")

    setName("")
    setEmail("")
    setPassword("")
    setEmailLogged("")
    setCountry("")
    setState("")
    setCity("")
    setStreet("")

  }

  function updateGuns(gunType) {
    let newGuns = gunType === "all" ? data : data.filter(gun => gun.category === gunType)
    setGuns(newGuns)
  }


  function insertProduct(skin) {
    // Nome do usuário é vazio
    if(logged === ""){
      notifyError("Você precisar estar logado para adicionar itens no carrinho!")
      return
    }

    let users = JSON.parse(localStorage.getItem('users') || "[]")
    let index = users.findIndex(user => user.email === email)
    let user = users[index]

    let products = user.cart || []

    if(products.find(product => product.name === skin.name)) {
      notifyError("Você já adicionou essa skin no seu carrinho...")
      return
    }

    let newCart = [...products, skin]
    users[index].cart = newCart
    localStorage.setItem('users', JSON.stringify(users));
    
    setCart(newCart)
    notifyOk("Parabéns!" + 'A skin ' + skin.name +  " foi inserida no carrinho.")
    setProduct("")
    
  }

  function loginClicked() {
    if(logged !== "") {
      return
    }
    setShowLogin(true)
  }

  function registerOrLogoutClicked() {
    if(logged !== "") {
      setLogged("")
      setEmailLogged("")
      setName("")
      setEmail("")
      setPassword("")
      setCountry("")
      setState("")
      setCity("")
      setStreet("")
      setCart([])
      return
    } 

    setShowRegister(true)
  }

  return (
    <div className="root-page">

    <Modal show={showLogin} centered onHide={() => setShowLogin(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Faça o seu login!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Form className='d-flex flex-column justify-content-center align-items-center pt-1 pb-3' style={{width: "75%"}}>
          <div>Faça o login para comprar novas skins no nosso mercado.</div>
            
          <Form.Control type="email" placeholder="E-mail" className="mt-3 register-input" value={email} onChange={e => setEmail(e.target.value)}/>
          <Form.Control type="password" placeholder="Senha" className="mt-3 register-input" value={password} onChange={e => setPassword(e.target.value)}/>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowLogin(false)}>
          Fechar
        </Button>
        <Button variant="primary" className="login-button" onClick={() => login()}>
          Entrar
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showRegister} centered onHide={() => setShowRegister(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Faça o seu cadastro!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Form className='d-flex flex-column justify-content-center align-items-center pt-1 pb-3' style={{width: "75%"}}>
          <div>Insira os seus dados pessoais para entrar no nosso mercado.</div>
            
          <Form.Control type="name" placeholder="Nome" className="mt-3 register-input" value={name} onChange={e => setName(e.target.value)}/>
          <Form.Control type="email" placeholder="E-mail" className="mt-3 register-input" value={email} onChange={e => setEmail(e.target.value)}/>
          <Form.Control type="password" placeholder="Senha" className="mt-3 register-input" value={password} onChange={e => setPassword(e.target.value)}/>
          <Form.Control type="country" placeholder="País" className="mt-3 register-input" value={country} onChange={e => setCountry(e.target.value)}/>
          <Form.Control type="state" placeholder="Estado" className="mt-3 register-input" value={state} onChange={e => setState(e.target.value)}/>
          <Form.Control type="city" placeholder="Cidade" className="mt-3 register-input" value={city} onChange={e => setCity(e.target.value)}/>
          <Form.Control type="street" placeholder="Rua, com Número" className="mt-3 register-input" value={street} onChange={e => setStreet(e.target.value)}/>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowRegister(false)}>
          Fechar
        </Button>
        <Button variant="primary" className="login-button" onClick={() => createUser()}>
          Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>

    <div className="page-header align-items-center" style={{ backgroundImage: `url(${background})`, backgroundColor: '#0E1921'}}>
      <Container className="flex header-container justify-content-center pb-5">
        <Row className="d-flex py-5 pb-4 justify-content-between w-100 align-center" key={logged}>
          <a href='https://playvalorant.com/pt-br/' target="_blank"> 
            <img src={logo} className="logo align-center mx-5" />
          </a>
          <Col className="d-flex justify-content-end align-items-center">
            <Button className="register-button mr-2" onClick={() => registerOrLogoutClicked()}>
              {logged !== "" ? "SAIR" : "CADASTRAR"}
            </Button>
            <Button className="login-button" onClick={() => loginClicked()}>
              {logged !== "" ? "Olá, " +  logged : "ENTRAR"}
            </Button>
          </Col>
             
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
              <Form.Control as="select" className="register-input" placeholder="Tipo de Arma" onChange={e => updateGuns(e.target.value)}>
                <option value="all" >Todas as armas</option>
                <option value="pistol" >Armas Leves</option>
                <option value="shotgun">Escopetas</option>
                <option value="rifle">Fuzis</option>
              </Form.Control>
            </Form>
          </Col>  
        </Row>
        
        <Carousel interval={null} key={JSON.stringify(guns)} className="d-flex flex-col pt-2" fade={false}> {
          guns.map(skin => (
            <Carousel.Item className="justify-content-center">
              <img
                className="d-block w-100"
                src={skin.image}
                alt={skin.name}
              />
              <Carousel.Caption className="">
                <Col className="">
                  <h2 className="title">{skin.name}</h2>
                  <div className="flex-row"> 
                    <img 
                      src={logo}
                      style={{width: "16px"}}
                    />
                    <p>{skin.price + " Valorant Points"}</p>
                  </div>
                  <Button className="down-button mb-3" onClick={() => insertProduct(skin)}>
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
                <h5 className="ml-2">Ver Carrinho</h5>
                <FiChevronDown color="#ffffff" size={20} className="ml-2 pb-1"/>
              </Row>
            </Button>
          </a>
        </Row>
        

      </Container>

      <Container className="cart-container py-5" style={{color: '#0E1921'}}>
        <div id="cart" className="pt-5">
            <h1 className="w-100 title text-left d-none d-lg-block">
              Carrinho de Skins
            </h1>
            <h1 className="w-100 title text-center d-lg-none" >
              Carrinho de Skins
            </h1>
            
            <Row className="mt-5"> {
              cart.map( skin => (
                <Col xs={6} sm={6} md={3}>
                  <div className='date-box mb-5'>
                    <img
                      className="d-block w-100"
                      src={skin.image}
                      alt={skin.name}
                    />
                    <h5 className="title text-center">
                      {skin.name}
                    </h5>
            
                    <div className="d-flex flex-row justify-content-center text-center align-items-center">                       
                      <p className="mx-2 mb-0" style={{color:"white"}}>{skin.price}</p>
                      <img 
                        src={logo}
                        style={{width: "16px", height: "16px"}}
                      />
                    </div>

                  </div> 
                </Col>
              ))}
            </Row>
        </div>
      </Container>
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
    
    <Toaster />

  </div>
  );
}

export default App;
