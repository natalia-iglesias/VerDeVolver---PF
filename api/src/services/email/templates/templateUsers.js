const { templateHeader } = require('./templateHeaders');

// TODO

const htmlUserRegisterEmailTemplate = (name) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <h2>Gracias por unirte a VerdeVolver!</h2>
              <p>Ingresa una nueva contraseña en el siguiente link...</p>              
              <p>Que tengas buen día!</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlChangePasswordEmailTemplate = (name) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Por favor ingresa tu nueva contraseña.</p>              
              <p>Que tengas buen día!</p>
              <p>Equipo de Verde Volver</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;
const htmlChangeCBUEmailTemplate = (name) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Por favor ingresa tu nuevo CBU.</p>              
              <p>Que tengas buen día!</p>
              <p>Equipo de Verde Volver</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlDeleteUserEmailTemplate = (name) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Confirmamos que tu cuenta ha sido dada de baja.</p>              
              <p>Que tengas buen día!</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

const htmlDonationOkEmailTemplate = (name, vdvEntityName) => `       
        ${templateHeader}
        <body>
          <div class="main_container">
            <div class="image_container">
              <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
            </div>
            <div class="text_container">
              <h1>Hola ${name}, </h1>
              <p>Hemos recibido la donación efectuada para ${vdvEntityName} de forma correcta.</p>              
              <p>Muchas gracias por tu aporte.</p>
              <p>Que tengas un gran día!</p>
              <p>Equipo de Verde Volver</p>
              <img alt="fondo-vdv" src="cid:vdv@Fondo" />
            </div>
          </div>
        </body>        
                `;

module.exports = {
  htmlUserRegisterEmailTemplate,
  htmlDeleteUserEmailTemplate,
  htmlChangePasswordEmailTemplate,
  htmlChangeCBUEmailTemplate,
  htmlDonationOkEmailTemplate,
};
