import { Box, Typography, Button, TextField, FormLabel, makeStyles, CircularProgress } from "@material-ui/core";
import { Fragment, useContext } from "react";

import { Context } from "../App";
import { StyledButton, StyledTextField } from "../StyledComponents";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingInline: theme.spacing(2),
        marginBlock: theme.spacing(10),
        alignItems: 'stretch',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            maxWidth: 600,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 800,
        },
    },
    title: {
        color: theme.palette.secondary.main,
        fontSize: 30,
        lineHeight: '60px',
        textAlign: 'center',

        [theme.breakpoints.up('sm')]: {

            fontSize: 35,
        }
    },
    notice: {
        background: 'white'
    },
    noticeC: {
        color: '#225D38'
    },
    noticeT: {
        fontWeight: 800
    },
    noticeP: {

        fontWeight: 500
    },
    noticeS: {
        width: "100%",
        height: "25px"
    }

}));

export default function Notice({ children }) {
    console.log('children', children)
    const classes = useStyles();
    const { dictionary } = useContext(Context);

    return (
        <Box className={classes.root}>
            <Typography variant="h1" component="h1" className={classes.title}>{dictionary.nav.notice}</Typography>
            <div>


                {
                    dictionary.nav.notice == 'Privacy Notice' ?
                        <div class="row text-justify" className={classes.notice}>
                            <div class="col-12 mt-3" className={classes.noticeP}>


                                The following Personal Data Protection Policy (hereinafter, "Privacy Policy") regulates
                                the processing of personal data of web users, per the applicable legislation on data
                                protection.
                            </div>
                            <div className={classes.noticeS}></div>
                            <div class="col-12 mt-3 " >

                                <b className={classes.noticeT}>

                                    WHO IS RESPONSIBLE FOR THE PROCESSING OF YOUR PERSONAL DATA?
                                </b>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                    RESPONSABLE DE TRATAMIENTO: JASU INDUSTRIES S.A. DE C.V

                                </div>
                                <div className={classes.noticeP}>

                                    Address: 2665 S. Bayshore Dr. Suite 220 Miami, FL 33133
                                </div>
                            
                                <div className={classes.noticeP}>

                                    Contact phone: <a href="tel:+13055641315" className={classes.noticeC}>+1 305-699-4113</a>
                                </div>
                                <div className={classes.noticeP}>

                                    Email: <a href="mailto:info@jasu.us" className={classes.noticeC}>info&#64;jasu.us</a>
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                You confirm and guarantee the truthfulness and accuracy of the data provided, and that they are adjusted to your current state. In this sense, you agree to communicate any modifications, per the procedure established in the section regarding exercising your rights
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                WHAT PURPOSES WILL WE PROCESS YOUR PERSONAL DATA FOR??
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                We inform you that all data processed by JASU INDUSTRIES S.A. DE C.V. are necessary for the purposes described in this Privacy Policy. Failure to provide them would imply the impossibility of properly managing the existing relationship with you. Below are the different purposes for which we process your personal data and the bases that legitimize the processing:

                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                WEB OR EMAIL CONTACTS
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What data do we collect through the Website?

                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>

                                We may process your IP, what operating system or browser you use, and even the duration of your visit, anonymously.
                                </div>

                                <div className={classes.noticeP}>
                                If you provide us with data in the contact form, such as Name, E-mail, or Phone Number you will be identified to contact you if necessary.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What purposes will we process your personal data for?
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                Answering your queries, requests, or petitions. Managing the requested service, responding to your request, or processing your petition. Information by electronic means, related to your request. Commercial or event information via electronic means, phone call, or text message (SMS) provided there is express authorization.
                                </div>

                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                SMS consent and phone numbers will never be shared with third parties or affiliates under any circumstances.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                Conducting analysis and improvements on the Website, our products, and services. Improving our commercial strategy.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What is the legitimacy of the processing of your data?
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                The acceptance and consent of the interested party: In those cases where it is necessary to complete a form and click on the "send" button to make a request, doing so necessarily implies that you have been informed and have expressly consented to the content of the clause attached to said form or acceptance of the privacy policy. All our forms have the symbol * in the mandatory data. If you do not provide those fields or do not check the acceptance checkbox of the privacy policy, the information will not be sent. Normally it has the following formula: "? I have read and accepted the Privacy Policy."
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                CLIENTS
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What purposes will we process your personal data for?
                                </div>

                                <div className={classes.noticeP}>
                                Preparation of the budget and follow-up through communications between both parties. Information by electronic means, related to your request. Commercial or event information via electronic means, phone call, or text message (SMS) provided there is express authorization. Manage administrative, communication, and logistics services performed by the Controller. Billing and declaration of the relevant taxes. Carry out the corresponding transactions. Control and recovery management.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What is the legitimacy of the processing of your data?
                                </div>

                                <div className={classes.noticeP}>
                                The legal basis is the acceptance of a contractual relationship, or your consent when contacting us or offering us your products by any means.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                SUPPLIERS
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What purposes will we process your personal data for?
                                </div>

                                <div className={classes.noticeP}>
                                Information by electronic means, related to your request. Commercial or event information via electronic means, phone call, or text message (SMS) provided there is express authorization. Manage administrative, communication, and logistics services performed by the Controller. Billing. Carry out the corresponding transactions. Billing and declaration of the relevant taxes. Control and recovery management.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What is the legitimacy of the processing of your data?
                                </div>

                                <div className={classes.noticeP}>
                                The legal basis is the acceptance of a contractual relationship, or your consent when contacting us or offering us your products by any means.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                JOB APPLICANTS
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                What purposes will we process your personal data for?
                                </div>

                                <div className={classes.noticeP}>
                                Organization of selection processes for the hiring of employees. Summoning you for job interviews and evaluating your candidacy. If you have given us your consent, we may transfer it to collaborating or related companies, solely to help you find employment.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                For how long will we keep personal data?
                                </div>

                                <div className={classes.noticeP}>
                               Likewise, we inform you that one year after receiving your resume, we will proceed to its secure destruction.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                Do we include the personal data of third parties?
                                </div>

                                <div className={classes.noticeP}>
                                No, as a general rule, we only process the data provided by the owners. If you provide us with data from third parties, you must, beforehand, inform and request their consent, or otherwise exempt us from any responsibility for non-compliance with this requirement.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                And data from minors?
                                </div>

                                <div className={classes.noticeP}>
                                We do not process data of minors under 14 years of age without the consent of the father, mother, or legal guardian. Therefore, refrain from providing them if you are under that age or, if applicable, from providing data from third parties who do not have said age. JASU INDUSTRIES S.A. DE C.V exempts itself from any responsibility for non-compliance with this provision.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                Will we carry out electronic communications?
                                </div>

                                <div className={classes.noticeP}>
                                They are only carried out to manage your request if it is one of the contact methods you have provided us.
                                If we carry out commercial communications, they will have been previously and expressly authorized by you.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                TO WHOM WILL WE COMMUNICATE YOUR DATA?
                                </div>

                                <div className={classes.noticeP}>
                                In the terms described in the section on the purposes of the processing, JASU INDUSTRIES S.A. DE C.V may communicate your personal data to the following entities: Public authorities, regulators, or governmental or jurisdictional bodies in those cases where it is necessary to do so by law, local regulations, or in compliance with regulatory obligations. Among others, to tax administrations.
                                If you request the portability of your data, your personal data will be transferred to the entity you designate.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                INTERNATIONAL DATA TRANSFERS
                                </div>

                                <div className={classes.noticeP}>
                                As a general rule, data transfers to third parties or servers outside the legislation area are not made. However, in those exceptional cases where such international transfers occur, the necessary measures will be taken to ensure that they are made to a country or organization that has offered adequate guarantees or they may be based on the legitimizing principles established by regulations.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                FOR HOW LONG WILL WE STORE YOUR DATA?
                                </div>

                                <div className={classes.noticeP}>
                                We will process your data as long as they are necessary for the purpose for which they were collected, and once the relationship that legitimizes the processing of your data has ended, they will be stored and blocked solely to formulate and defend claims and the timely transfer at the request of the authorities, only for the time established by law. Likewise, once the contractual relationship has ended, we will process your personal data for sending commercial communications, provided that we have express consent for it.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                AUTOMATED DECISIONS AND PROFILING
                                </div>

                                <div className={classes.noticeP}>
                                The entity will not create profiles or make automated decisions.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                WHAT ARE YOUR RIGHTS?
                                </div>

                                <div className={classes.noticeP}>
                                We inform you that, per current regulations, you have the right to revoke the consent given, as well as to exercise your rights of access, rectification, deletion, limitation, and opposition, as well as the right to data portability and not to be subject to automated decisions.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                HOW CAN YOU EXERCISE YOUR RIGHTS?
                                </div>

                                <div className={classes.noticeP}>
                                Under applicable legislation, we inform you that you can exercise your rights by contacting us at the following email address:info@jasu.us indicating the reason for your request and the right you wish to exercise.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                MODIFICATION OF THE PRIVACY POLICY
                                </div>

                                <div className={classes.noticeP}>
                                JASU INDUSTRIES S.A. DE C.V may totally or partially modify this Privacy Policy if required by applicable law. If you require us to delete your information, please contact us at info@jasu.us
                                </div>
                            </div>

                        </div>

                        :
                        <div class="row text-justify" className={classes.notice}>
                            <div class="col-12 mt-3" className={classes.noticeP}>


                                La presente Política de protección de datos personales (en adelante, “Política de
                                Privacidad”) regula el tratamiento de datos personales de los usuarios web, de acuerdo
                                con lo establecido en la legislación aplicable en materia de protección de datos.
                            </div>
                            <div className={classes.noticeS}></div>
                            <div class="col-12 mt-3 " >

                                <b className={classes.noticeT}>

                                    ¿QUIÉN ES EL RESPONSABLE DEL TRATAMIENTO DE SUS DATOS PERSONALES?
                                </b>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                    RESPONSABLE DE TRATAMIENTO: JASU INDUSTRIES S.A. DE C.V

                                </div>
                                <div className={classes.noticeP}>

                                    Teléfono de contacto: +52 55 8526-6118
                                </div>
                                <div className={classes.noticeP}>

                                     Teléfono de contacto: <a href="tel:+525585266118" className={classes.noticeC}>+52 55 8526-6118</a>
                                </div>
                                <div className={classes.noticeP}>

                                    Email: <a href="mailto:info@jasu.us" className={classes.noticeC}>info&#64;jasu.us</a>
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                    Usted confirma y garantiza la veracidad y exactitud de los datos aportados, y que éstos
                                    se ajustan a su estado actual. En este sentido, se compromete a comunicar cualquier
                                    modificación que se produjera en los mismos, de acuerdo con el procedimiento
                                    establecido en el apartado relativo al ejercicio de sus derechos.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿CON QUÉ FINALIDADES VAMOS A TRATAR SUS DATOS PERSONALES?
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                    Le informamos de que todos los datos tratados por JASU INDUSTRIES S.A. DE C.V son
                                    necesarios para las finalidades descritas en la presente Política de Privacidad y el hecho
                                    de no facilitarse supondría la imposibilidad de poder gestionar adecuadamente la
                                    relación existente con usted.
                                    A continuación, se describen las diferentes finalidades con las que se tratan sus datos
                                    personales y las bases que legitiman el tratamiento:

                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    CONTACTOS DE LA WEB O DEL CORREO ELECTRÓNICO
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Qué datos recopilamos a través de la Web?

                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>

                                    Podemos tratar su IP, qué sistema operativo o navegador usa, e incluso la duración de su visita, de forma anónima.
                                </div>

                                <div className={classes.noticeP}>
                                    Si nos facilita sus datos en el formulario de contacto, como Nombre, Teléfono y/o Correo Electrónico, se identificarán para poder contactar con usted en caso de que sea necesario.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Con qué finalidades vamos a tratar sus datos personales?
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                    Contestar a sus consultas, solicitudes o peticiones. Gestionar el servicio solicitado, contestar su solicitud, o tramitar su petición. Información por medios electrónicos, que versen sobre su solicitud. Información comercial o de eventos por medios electrónicos, llamada telefónica o mensaje de texto (SMS), siempre que exista autorización expresa.
                                </div>

                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    El consentimiento de SMS y los números de teléfono nunca se compartirán con terceros o afiliados bajo ninguna circunstancia
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                    Realizar análisis y mejoras en la Web, sobre nuestros productos y servicios. Mejorar nuestra estrategia comercial.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Cuál es la legitimación para el tratamiento de sus datos?
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeP}>
                                    La aceptación y consentimiento del interesado: En aquellos casos donde para realizar una solicitud sea necesario cumplimentar un formulario y hacer un “click” en el botón de enviar, la realización del mismo implica necesariamente que ha sido informado y ha otorgado expresamente su consentimiento al contenido de la cláusula anexada a dicho formulario o aceptación de la política de privacidad. Todos nuestros formularios cuentan con el símbolo * en los datos obligatorios. Si no facilita esos campos, o no marca el checkbox de aceptación de la política de privacidad, no se permitirá el envío de la información. Normalmente tiene la siguiente fórmula: “? He leído y acepto la Política de privacidad.”
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    CLIENTES
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Con qué finalidades vamos a tratar sus datos personales?
                                </div>

                                <div className={classes.noticeP}>
                                    Elaboración del presupuesto y seguimiento del mismo mediante comunicaciones entre ambas partes. Información por medios electrónicos, que versen sobre su solicitud. Información comercial o de eventos por medios electrónicos, llamada telefónica o mensaje de texto (SMS), siempre que exista autorización expresa. Gestionar los servicios administrativos, de comunicaciones y de logística realizados por el Responsable. Facturación y declaración de los impuestos oportunos. Realizar las transacciones que correspondan. Gestiones de control y recobro.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Cuál es la legitimación para el tratamiento de sus datos?
                                </div>

                                <div className={classes.noticeP}>
                                    La base legal es la aceptación de una relación contractual, o en su defecto su consentimiento al contactar con nosotros u ofrecernos sus productos por alguna vía.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    PROVEEDORES
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Con qué finalidades vamos a tratar sus datos personales?
                                </div>

                                <div className={classes.noticeP}>
                                    Información por medios electrónicos, que versen sobre su solicitud. Información comercial o de eventos por medios electrónicos, llamada telefónica o mensaje de texto (SMS), siempre que exista autorización expresa. Gestionar los servicios administrativos, de comunicaciones y de logística realizados por el Responsable. Facturación. Realizar las transacciones que correspondan. Facturación y declaración de los impuestos oportunos. Gestiones de control y recobro.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Cuál es la legitimación para el tratamiento de sus datos?
                                </div>

                                <div className={classes.noticeP}>
                                    La base legal es la aceptación de una relación contractual, o en su defecto su consentimiento al contactar con nosotros u ofrecernos sus productos por alguna vía.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    DEMANDANTES DE EMPLEO
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Con qué finalidades vamos a tratar sus datos personales?
                                </div>

                                <div className={classes.noticeP}>
                                    Organización de procesos de selección para la contratación de empleados. Citarle para entrevistas de trabajo y evaluar su candidatura. Si nos has dado su consentimiento, se lo podremos ceder a empresas colaboradoras o afines, con el único objetivo de ayudarle a encontrar empleo. ¿Durante cuánto tiempo vamos a mantener los datos personales? Asimismo, le comunicamos que transcurrido un año desde la recepción de su currículum vitae, procederemos a su destrucción segura.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Cuál es la legitimación para el tratamiento de sus datos?
                                </div>

                                <div className={classes.noticeP}>
                                    La base legal es su consentimiento inequívoco, al enviarnos su CV.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Incluimos datos personales de terceras personas?
                                </div>

                                <div className={classes.noticeP}>
                                    No, como norma general sólo tratamos los datos que nos facilitan los titulares. Si nos aporta datos de terceros deberá, con carácter previo, informar y solicitar su consentimiento a dichas personas, o de lo contrario nos exime de cualquier responsabilidad por el incumplimiento de este requisito.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Y datos de menores?
                                </div>

                                <div className={classes.noticeP}>
                                    No tratamos datos de menores de 14 años sin consentimiento del padre, madre o tutor legal. Por tanto, absténgase de facilitarlos si no tiene esa edad o, en su caso, de facilitar datos de terceros que no tengan la citada edad. JASU INDUSTRIES S.A. DE C.V se exime de cualquier responsabilidad por el incumplimiento de esta previsión.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿Realizaremos comunicaciones por medios electrónicos?
                                </div>

                                <div className={classes.noticeP}>
                                    Solo se realizan para gestionar su solicitud, si es uno de los medios de contacto que nos ha facilitado. Si realizamos comunicaciones comerciales, habrán sido previa y expresamente autorizadas por usted.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿A QUIÉNES LE COMUNICAREMOS SUS DATOS?
                                </div>

                                <div className={classes.noticeP}>
                                    En los términos descritos en el apartado sobre las finalidades del tratamiento, JASU INDUSTRIES S.A. DE C.V podrá comunicar sus datos personales a las siguientes entidades: Autoridades públicas, reguladores u órganos gubernamentales o jurisdiccionales en aquellos supuestos en que es necesario hacerlo por ley, normativa local o en el cumplimiento de obligaciones regulatorias. Entre otros, a las administraciones tributarias. En el caso de que usted solicite la portabilidad de sus datos, sus datos personales serán cedidos a la entidad que usted designe.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    TRANSFERENCIAS INTERNACIONALES DE DATOS
                                </div>

                                <div className={classes.noticeP}>
                                    Como norma general, no se efectúan transferencias de datos a terceros localizados o cuyos servidores se ubiquen fuera del país. No obstante, en aquellos supuestos excepcionales en los que dichas transferencias internacionales se produzcan, se adoptarán las medidas necesarias para que éstas se hagan a un país u organización que haya ofrecido garantías adecuadas o las mismas puedan fundamentarse en los principios legitimadores establecidos normativamente. ¿DURANTE QUÉ PLAZO ALMACENAREMOS SUS DATOS? Trataremos sus datos, siempre y cuando sean necesarios para la finalidad para los que fueron recogidos y, una vez finalizada la relación que legitima el tratamiento de sus datos, éstos se almacenarán bloqueados con el único objetivo de realizar la formulación y defensa de reclamaciones y la oportuna cesión a requerimiento de las autoridades, únicamente durante el tiempo establecido legalmente. Asimismo, una vez finalizada la relación contractual, trataremos sus datos personales para el envío de comunicaciones comerciales, siempre que dispongamos del consentimiento expreso para ello.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    DECISIONES AUTOMATIZADAS Y ELABORACIÓN DE PERFILES
                                </div>

                                <div className={classes.noticeP}>
                                    La entidad no elaborará perfiles ni realizará decisiones automatizadas.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿CUÁLES SON SUS DERECHOS?
                                </div>

                                <div className={classes.noticeP}>
                                    Le informamos que, de acuerdo con la normativa vigente, usted tiene derecho a revocar el consentimiento otorgado, así como a ejercer sus derechos de acceso, rectificación, supresión, limitación, oposición, así como el derecho a la portabilidad de tus datos y a no ser objeto de decisiones automatizadas.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    ¿CÓMO PUEDE EJERCER SUS DERECHOS?
                                </div>

                                <div className={classes.noticeP}>
                                    De acuerdo con la legislación aplicable, le informamos que podrá ejercitar los derechos, poniéndose en contacto en la siguiente dirección de correo: info@jasu.us indicándonos el motivo de su solicitud y el derecho que quiere ejercitar.
                                </div>
                                <div className={classes.noticeS}></div>
                                <div className={classes.noticeT}>
                                    MODIFICACIÓN DE LA POLÍTICA DE PRIVACIDAD
                                </div>

                                <div className={classes.noticeP}>
                                JASU INDUSTRIES S.A. DE C.V puede modificar total o parcialmente esta Política de Privacidad si así lo requiere la legislación aplicable. Si requiere que borrar syu información contacta con nosotros al correo electrónico info@jasu.us
                                </div>
                            </div>

                        </div>




                }


            </div>


        </Box>
    );
};