import LocalizedStrings from 'react-localization';

const dictionary = new LocalizedStrings({
    es: {
        404: {
            title: "Página no encontrada",
            description: "Está página no existe o ha sido removida.",
        },
        date: {
            shortMonth: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
            month: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
        general: {
            showProducts: "¡Da un vistazo a nuestros servicios y productos!",
            contactUs: "Contáctanos",
            moreInformation: "Más información",
            showMore: "Ver más",
            goBack: "Regresar",
            signUp: "Regístrate",
        },
        session: {
            name: "Nombre Completo",
            firstName: "Nombre",
            lastName: "Apellido",
            email: "Correo Electrónico",
            password: "Contraseña",
            confirmPassword: "Confirmar Contraseña",
            phone: "Teléfono",
            companyName: "Compañía",
            message: "Mensaje",
            loginTitle: "¡Inicia sesión!",
            required: "Todos los campos son obligatorios*",
            forgotPassword: "¿Olvidaste tu contraseña?",
            noMember: "¿No tienes cuenta?",
            loginError: "Correo o contraseña incorrectos",
            recoverTitle: "Recuperar Contraseña",
            recoverSubtitle: "¿Perdiste tu contraseña? Por favor, introduce tu nombre de usuario o correo electrónico.",
            recoverMessage: "Tu contraseña ha sido enviada a tu correo electrónico con éxito",
            recoverError: "No se pudo generar la recuperación de contraseña",
            resetPassword: "Restablecer Contraseña",
            emptyCaptcha: "Favor de completar el captcha",
            signUpTitle: "¡Regístrate!",
            alredySigned: "Ya te has registrado?",
            signUpError: "Error en registro de sesión",
            mailUnavailable: "El correo ya se encuentra registrado",
            captchaError: "Error en la validación de captcha",
            passMismatch: "Las contraseñas deben de coincidir",
            signUpMessage: "Te notificaremos cuando tu cuenta haya sido activada",
            newPasswordTitle: "Crear nueva contraseña",
            newPasswordSubtitle: "Su nueva contraseña debe ser diferente de la contraseña utilizada anteriormente.",
            newPasswordError: "No se pudo cambiar la contraseña",
            invalidToken: "El token de recuperación es inválido, favor de verificarlo.",
            expiredToken: "El token de recuperación ya expiró, favor de solicitar uno nuevo.",
            newPasswordMessage: "Su contraseña ha sido guardada exitosamente",
            contactTitle: "¡Escríbenos!",
            sendMessage: "Enviar mensaje",
            contactError: "Error en envió de mensaje",
            contactMessage: "Tu mensaje ha sido enviado",
            confirmError: "Error en validación de usuario",
            confirmLoading: "Validando...",
            userNotFound: "No se encontró el usuario deseado",
            userAlreadyConfirmed: "El usuario con el correo: {0} ya se encuentra validado",
            confirmMessage: "El usuario con el correo: {0} ha sido validado",
            acceptTxt: "Al marcar esta casilla, doy mi consentimiento expreso para recibir mensajes de texto de acuerdo con nuestra Política de privacidad de JASU.",
            acceptForm: "Entiendo que, al enviar este formulario, puedo optar por no recibir más mensajes de texto en cualquier momento respondiendo STOP.",
        },
        nav: {
            home: "Inicio",
            products: "Catálogo",
            contact: "Contacto",
            login: "Iniciar sesión",
            logout: "Cerrar sesión",
            logoutMessage: "¿Deseas cerrar sesión?",
            logoutError: "No se pudo cerrar sesión",
            search: "Buscar",
            serverError: "No se pudo conectar con servidor",
            localesError: "No se encontraron idiomas disponibles",
            notice: "Aviso de privacidad",
        },
        footer: {
            USOffice: "Oficina corporativa EUA",
            EUROffice: "Oficina en Europa",
            MXOffice: "Oficina en México",
            emailUs: "Escríbenos: info@jasu.us",
            copyright: "Copyright 2022 Jasu, Todos los derechos reservados",
        },
        home: {
            citrus: "Citricos",
            bannerTitle: "Bienvenido a Jasu",
            bannerDescription: "Somos proveedor líder en frutas y sus derivados especializados en aceites cítricos, D'limonene, Terpene, jugos y purés de frutas para las industrias de alimentos, bebidas, fragancias y químicas.",
            productsTitle: "Nuestros productos",
            howItWorksTitle: "¿Cómo funciona Jasu?",
            howItWorksDescription: "Nuestros años de experiencia en el mercado nos han permitido crear una extensa red de proveedores de cítricos y sus derivados en todo el mundo, desde productores hasta procesadores.\n\nAdicionalmente tenemos los contactos y la red de transporte para trasladar lo que necesitas del fabricante a las puertas de tu empresa.",
            howItWorksVideo: "/video/video.mp4",
            serviceTitle: "Conoce nuestros servicios",
            customerTitle: "Servicio al Cliente",
            customerDescription: "Nuestro equipo está dedicado a dar un seguimiento puntual, resolviendo y solucionando las preguntas y dudas de nuestros clientes.",
            shippingTitle: "Transporte",
            shippingDescription: "Somos un proveedor con alcance global. Nuestros agentes coordinan servicio logístico de punta a punta.",
            financialTitle: "Servicios Financieros",
            financialDescription: "Aseguramos la transacción cubriendo a ambas partes:\nProveedores: Financiamiento de órdenes de compra y protección de crédito.\nClientes: Financiamiento de la cadena de suministro.",
        },
        search: {
            products: "Por Fruto",
            productsError: "No se encontraron productos",
            presentation: "Por Proceso",
            showResults: "Mostrando {0}-{1} resultados",
            fruits: "cítricos y frutos",
            presentations: "procesos",
            showResultsList: "Conoce los {0} que manejamos:",
            showResultsFruits: "Conoce los principales {0} que manejamos",
            show: "Mostrar",
            az: "Ordenar de A-Z",
            za: "Ordenar de Z-A",
        },
        productInfo: {
            loading: "Cargando...",
            description: "Descripción",
            info: "Información",
            contactLabel: "¿No encuentras lo que buscas?",
            otherFruits: "Otras frutas con el mismo proceso",
            map: "Esta es la procedencia de los productos que manejamos:",
            harvest: "Planifica tu pedido de acuerdo a la temporada de cosecha:",
            all: "Todo",
            presentations: "Estos son los productos que tenemos disponibles para envío actualmente:",
            requestPrice: "Ver precio",
            contactBarGuestTitle: "¿Tienes preguntas? ¡Contáctanos!",
            contactBarGuestDescription: "Escribe tu correo aquí",
            contactBarGuestButton: "Suscríbete",
            contactBarUserTitle: "¡Hola! Soy {0}",
            contactBarUserDescription: "Para dudas, aclaraciones o para recibir más información, escríbenos",
            contactBarUserButton: "Contactar",
            prices: "Tendencias de precios",
            signUpPrices: "¡Conoce nuestra tendencia de precios en Jasu!",
            signUpPricesButton: "Conocer",
            dateLabel: "Fecha",
            priceLabel: "Precio (USD)",
            otherPresentations: "Otros procesos de la misma fruta",
            contactTitle: "¡Hola! En qué podemos ayudarte",
            contactDescription: "Déjanos tus datos y un miembro de nuestro equipo se pondrá en contacto contigo.",
            contactSubject: "Asunto",
            contactMessage: "Mensaje",
            acceptTerms: "Acepto los términos y condiciones y Políticas de privacidad",
            contactSend: "Enviar Mensaje",
            productError: "No se encontró el producto deseado",
            fruitError: "No se encontraron {0} relacionadas",
            harvestError: "No se encontró la información de cosechas",
            priceError: "No se encontró la lista de precios",
        },
    },
    en: {
        404: {
            title: "Page not found",
            description: "This page doesn't exist or has been removed",
        },
        date: {
            shortMonth: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            month: ['January', 'February', 'March', 'April', 'May', 'August', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        general: {
            showProducts: "We invite you to have a look at our products and services!",
            contactUs: "Contact Us",
            moreInformation: "More information",
            showMore: "Show more",
            goBack: "Go back",
            signUp: "Sign up",
        },
        session: {
            name: "Full name",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            phone: "Phone",
            companyName: "Company Name",
            message: "Message",
            loginTitle: "Log in!",
            required: "All fields are required*",
            forgotPassword: "Forgot your password?",
            noMember: "Don't have an account?",
            loginError: "Email or password incorrect",
            recoverTitle: "Recover Password",
            recoverSubtitle: "Password lost? Please enter your email",
            recoverMessage: "We have send you and email with your password recovery token",
            recoverError: "Cannot generate password recover token",
            resetPassword: "Reset Password",
            emptyCaptcha: "Please fill tha captcha",
            signUpTitle: "Sign up!",
            alredySigned: "Already sign up?",
            signUpError: "Sign up error",
            mailUnavailable: "Email already registered",
            captchaError: "Invalid captcha",
            passMismatch: "Passwords must match",
            signUpMessage: "We will notify you when your account is accepted",
            newPasswordTitle: "Set new password",
            newPasswordSubtitle: "Your password cannot be tha same from before.",
            newPasswordError: "Cannot change password",
            invalidToken: "Token invalid, please verify",
            expiredToken: "Expired token",
            newPasswordMessage: "New password saved",
            contactTitle: "Contact Us!",
            sendMessage: "Send message",
            contactError: "Message sending error",
            contactMessage: "Message sended",
            confirmError: "Cannot verify user",
            confirmLoading: "Verifying...",
            userNotFound: "User not found",
            userAlreadyConfirmed: "User {0} is already verified",
            confirmMessage: "User {0} has been verified",
            acceptTxt: "By Checking, this checkbox , I hereby provide my express consent to receive text messages in accordance with our Privacy Policy from JASU.",
            acceptForm: "I understand that upon submission of this form, I may opt out of receiving further text messages at any time by replying STOP.",
        },
        nav: {
            home: "Home",
            products: "Catalogue",
            contact: "Contact",
            login: "Log In",
            logout: "Log Out",
            logoutMessage: "Log out?",
            logoutError: "Log out failed",
            search: "Search",
            serverError: "Failed connection to server",
            localesError: "Failed to retrieve available languages",
            notice: "Privacy Notice",
        },
        footer: {
            USOffice: "Corporative Office USA",
            EUROffice: "Europe Office",
            MXOffice: "Mexico's office",
            emailUs: "Contact us: info@jasu.us",
            copyright: "Copyright 2022 Jasu, All rights reserved",
        },
        home: {
            citrus: "Citrus",
            bannerTitle: "Welcome to Jasu",
            bannerDescription: "We are a leading provider of fruits and their derivatives, we are specialized in citrus oils, D'limonene, Terpene, juices, and fruit purees for the food, drinks, fragrances, and chemistry industries.",
            productsTitle: "Our products",
            howItWorksTitle: "How Jasu works?",
            howItWorksDescription: "Our years of experience in the market have allowed us to create a wide network of citrics producers and their derivatives all around the world, from producers to manufacturers.\n\nIn addition we have the contacts and the transportation network to freight forward from the producer to your company’s facilities.",
            howItWorksVideo: "/video/video.mp4",
            serviceTitle: "Learn about our services",
            customerTitle: "Customer Service",
            customerDescription: "Our team is dedicated to providing timely follow-up, providing solutions and resolving the questions and doubts of our clients.",
            shippingTitle: "Freight forwarding",
            shippingDescription: "We are suppliers with global reach. Our agents coordinate the logistics’ service from end to end.",
            financialTitle: "Financial Services",
            financialDescription: "We secure the transaction by covering both parties:\nSuppliers: Purchase order financing and credit protection.\nCustomers: Supply chain financing.",
        },
        search: {
            products: "By Fruit",
            productsError: "Products not found",
            presentation: "By Proccess",
            showResults: "Showing {0}-{1} results",
            fruits: "citrics and fruits",
            presentations: "processes",
            showResultsList: "Learn about the {0} we offer:",
            showResultsFruits: "Discover the main {0} we handle",
            show: "Show",
            az: "Sort by A-Z",
            za: "Sort by Z-A",
        },
        productInfo: {
            loading: "Loading...",
            description: "Description",
            info: "Info",
            contactLabel: "Don't found what you are looking for?",
            otherFruits: "Other fruits with same process",
            map: "This is the origin of the products we handle:",
            harvest: "Plan your order according to the harvest season:",
            all: "All",
            presentations: "These are the products currently available for shipment:",
            requestPrice: "Show price",
            contactBarGuestTitle: "Do you have any questions? Contact us!",
            contactBarGuestDescription: "Share your email here",
            contactBarGuestButton: "Suscribe",
            contactBarUserTitle: "Hi! I'm {0}",
            contactBarUserDescription: "For more information, contact us",
            contactBarUserButton: "Contact us",
            prices: "Price tendencies",
            signUpPrices: "See the Jasu price tendencies!",
            signUpPricesButton: "Show",
            dateLabel: "Date",
            priceLabel: "Price (USD)",
            otherPresentations: "Other processes with the same fruit",
            contactTitle: "Hi! How can I help you",
            contactDescription: "Leave us your info and a member of our team will contact you",
            acceptTerms: "I agree to the terms and conditions and privacy policy",
            contactSubject: "Subject",
            contactMessage: "Message",
            contactSend: "Send Message",
            productError: "Product not found",
            fruitError: "Related {0} not found",
            harvestError: "Harvest season not found",
            priceError: "Price list not found",
        },
    }
});

export { dictionary };