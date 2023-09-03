import React, { useState, useEffect } from "react";
import { Checkbox, Message, Modal, Grid, Image } from "semantic-ui-react";
import "./TermsModal.scss";
import { image } from "../../../assets/";

export const TermsModal = (props) => {
  const { show, close, title, size, acceptanceState, setAcceptanceState } =
    props;
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleAcceptChange = (event, data) => {
    const { label } = data;
    const accepted = label === "Sí";
    setAcceptanceState(accepted);
    setSelectedCheckbox(label);
  };

  useEffect(() => {
    if (selectedCheckbox !== null) {
      handleModalClose(); // Cerrar el modal automáticamente cuando se selecciona un checkbox
    }
  }, [selectedCheckbox]);

  const handleModalClose = () => {
    if (selectedCheckbox === null) {
      setShowMessage(true);
      setMessageContent("Debes seleccionar una opción.");
      setMessageColor("red");
    } else {
      setSelectedCheckbox(null); // Reiniciar el valor del checkbox seleccionado cuando se cierra el modal
      close(); // Llamar a la función de cierre del modal del componente padre
    }
  };

  return (
    <>
      <Modal open={show} onClose={handleModalClose} size={size} closeIcon>
        {title && (
          <Modal.Header className="centeredHeaderTerms">
            {title}
            <img src={image.logoSennovalabC} alt="" className="logo" />
          </Modal.Header>
        )}
        <Modal.Content>
          <div className="messageContainer">
            {showMessage && (
              <Message
                positive={messageColor === "blue"}
                negative={messageColor === "red"}
              >
                {messageContent}
              </Message>
            )}
          </div>
          <div className="modalTermsBody">
            <Grid celled="internally">
              <Grid.Row>
                <Grid.Column width={16}>
                  <p>
                    {" "}
                    Por favor, lee detenidamente los siguientes términos y
                    condiciones antes de utilizar nuestro sitio web. Al acceder
                    y utilizar este sitio web, aceptas cumplir con estos
                    términos y condiciones. Si no estás de acuerdo con alguno de
                    los siguientes puntos, te recomendamos que no utilices
                    nuestro sitio web.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <p>
                <strong>1. Uso del Sitio Web</strong>
              </p>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>1.1.</strong>
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    El contenido de este sitio web es únicamente para
                    información general y puede estar sujeto a cambios sin
                    previo aviso. No garantizamos la exactitud, integridad o
                    actualidad de la información proporcionada en este sitio
                    web.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>1.2.</strong>
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    El uso de cualquier información o material en este sitio web
                    es bajo tu propio riesgo. Es tu responsabilidad asegurarte
                    de que cualquier producto, servicio o información disponible
                    a través de este sitio web cumpla con tus requisitos
                    específicos.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>1.3.</strong>{" "}
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    Este sitio web puede contener enlaces a otros sitios web que
                    no están bajo nuestro control. No tenemos control sobre la
                    naturaleza, el contenido y la disponibilidad de esos sitios.
                    La inclusión de cualquier enlace no implica necesariamente
                    una recomendación o respaldo de los puntos de vista
                    expresados en ellos.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <p>
                <strong>2. Propiedad Intelectual</strong>
              </p>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>2.1.</strong>{" "}
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    2.1. Todos los derechos de propiedad intelectual en relación
                    con este sitio web y su contenido (incluyendo, pero no
                    limitado a, texto, gráficos, logotipos, imágenes y software)
                    son propiedad de SENNOVALAB o de nuestros licenciantes.
                    Estos están protegidos por las leyes de propiedad
                    intelectual aplicables.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>2.2.</strong>{" "}
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    Está prohibida cualquier reproducción, distribución,
                    modificación o uso no autorizado del contenido de este sitio
                    web sin nuestro consentimiento previo por escrito.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <p>
                <strong>3. Privacidad y Protección de Datos</strong>
              </p>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>3.1.</strong>{" "}
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    La recopilación y el uso de tus datos personales en relación
                    con este sitio web están sujetos a nuestra Política de
                    Privacidad. Al utilizar nuestro sitio web, aceptas el
                    procesamiento de tus datos personales de acuerdo con nuestra
                    Política de Privacidad.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <p>
                <strong>4. Limitación de Responsabilidad </strong>
              </p>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>4.1.</strong>{" "}
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    4.1.En la medida permitida por la ley aplicable, excluimos
                    todas las garantías y condiciones relacionadas con nuestro
                    sitio web y su contenido. No seremos responsables de ningún
                    daño directo, indirecto, incidental, especial o consecuente
                    que surja del uso de este sitio web.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <p>
                <strong>5. Modificaciones de los Términos y Condiciones</strong>
              </p>
              <Grid.Row>
                <Grid.Column width={1}>
                  <p>
                    <strong>5.1.</strong>{" "}
                  </p>
                </Grid.Column>
                <Grid.Column width={14}>
                  <p>
                    5.1.Nos reservamos el derecho de modificar estos términos y
                    condiciones en cualquier momento. Los cambios serán
                    efectivos tan pronto como se publiquen en este sitio web. Te
                    recomendamos que revises regularmente estos términos y
                    condiciones para estar al tanto de cualquier cambio.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div className="acceptanceSection">
            <div className="questionContainer">
              <p>¿Acepta los términos y condiciones?</p>
              <div className="checkboxContainer">
                <Checkbox
                  label="Sí"
                  checked={selectedCheckbox === "Sí"}
                  onChange={handleAcceptChange}
                />
                <Checkbox
                  label="No"
                  checked={selectedCheckbox === "No"}
                  onChange={handleAcceptChange}
                />
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
/* import React, { useState } from "react";
import { Checkbox, Message, Modal } from "semantic-ui-react";
import "./TermsModal.scss";
import { image } from "../../../assets/";

export const TermsModal = (props) => {
  const { show, close, title, size, acceptanceState, setAcceptanceState } =
    props;
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleAcceptChange = (event, data) => {
    const { label } = data;
    const accepted = label === "Sí";
    setAcceptanceState(accepted);
    setSelectedCheckbox(label);

    if (accepted) {
      setShowMessage(true);
      setMessageContent("Has aceptado los términos y condiciones.");
      setMessageColor("blue");
    } else {
      setShowMessage(true);
      setMessageContent("No has aceptado los términos y condiciones.");
      setMessageColor("red");
    }
  };

  const handleModalClose = () => {
    if (selectedCheckbox === null) {
      setShowMessage(true);
      setMessageContent("Debes seleccionar una opción.");
      setMessageColor("red");
    } else {
      setSelectedCheckbox(null); // Reiniciar el valor del checkbox seleccionado cuando se cierra el modal
      close(); // Llamar a la función de cierre del modal del componente padre
    }
  };

  console.log("acceptanceState:", acceptanceState);
  console.log("selectedCheckbox:", selectedCheckbox);
  return (
    <>
      <Modal open={show} onClose={handleModalClose} size={size} closeIcon>
        {title && (
          <Modal.Header className="centeredHeaderTerms">
            {title}
            <img src={image.logoSennovalabC} alt="" className="logo" />
          </Modal.Header>
        )}
        <Modal.Content>
          <div className="messageContainer">
            {showMessage && (
              <Message
                positive={messageColor === "blue"}
                negative={messageColor === "red"}
              >
                {messageContent}
              </Message>
            )}
          </div>
          <div className="modalTermsBody">
            <p>
              <br />
              Por favor, lee detenidamente los siguientes términos y condiciones
              antes de utilizar nuestro sitio web. Al acceder y utilizar este
              sitio web, aceptas cumplir con estos términos y condiciones. Si no
              estás de acuerdo con alguno de los siguientes puntos, te
              recomendamos que no utilices nuestro sitio web.
              <br />
              <br />
              <strong>1. Uso del Sitio Web</strong>
              <br />
              1.1. El contenido de este sitio web es únicamente para información
              general y puede estar sujeto a cambios sin previo aviso. No
              garantizamos la exactitud, integridad o actualidad de la
              información proporcionada en este sitio web.
              <br />
              1.2. El uso de cualquier información o material en este sitio web
              es bajo tu propio riesgo. Es tu responsabilidad asegurarte de que
              cualquier producto, servicio o información disponible a través de
              este sitio web cumpla con tus requisitos específicos.
              <br />
              1.3. Este sitio web puede contener enlaces a otros sitios web que
              no están bajo nuestro control. No tenemos control sobre la
              naturaleza, el contenido y la disponibilidad de esos sitios. La
              inclusión de cualquier enlace no implica necesariamente una
              recomendación o respaldo de los puntos de vista expresados en
              ellos.
              <br />
              <br />
              <strong>Propiedad Intelectual </strong>
              <br />
              2.1. Todos los derechos de propiedad intelectual en relación con
              este sitio web y su contenido (incluyendo, pero no limitado a,
              texto, gráficos, logotipos, imágenes y software) son propiedad de
              SENNOVALAB o de nuestros licenciantes. Estos están protegidos por
              las leyes de propiedad intelectual aplicables.
              <br />
              2.2. Está prohibida cualquier reproducción, distribución,
              modificación o uso no autorizado del contenido de este sitio web
              sin nuestro consentimiento previo por escrito.
              <br />
              <br />
              <strong>Privacidad y Protección de Datos </strong>
              <br />
              3.1. La recopilación y el uso de tus datos personales en relación
              con este sitio web están sujetos a nuestra Política de Privacidad.
              Al utilizar nuestro sitio web, aceptas el procesamiento de tus
              datos personales de acuerdo con nuestra Política de Privacidad.
              <br />
              <br />
              <strong>Limitación de Responsabilidad </strong>
              <br />
              4.1.En la medida permitida por la ley aplicable, excluimos todas
              las garantías y condiciones relacionadas con nuestro sitio web y
              su contenido. No seremos responsables de ningún daño directo,
              indirecto, incidental, especial o consecuente que surja del uso de
              este sitio web.
              <br />
              <br />
              <strong>Modificaciones de los Términos y Condiciones</strong>
              <br />
              5.1.Nos reservamos el derecho de modificar estos términos y
              condiciones en cualquier momento. Los cambios serán efectivos tan
              pronto como se publiquen en este sitio web. Te recomendamos que
              revises regularmente estos términos y condiciones para estar al
              tanto de cualquier cambio.
            </p>
          </div>

          <div className="acceptanceSection">
            <div className="questionContainer">
              <p>¿Acepta los términos y condiciones?</p>
              <div className="checkboxContainer">
                <Checkbox
                  label="Sí"
                  checked={selectedCheckbox === "Sí"}
                  onChange={handleAcceptChange}
                />
                <Checkbox
                  label="No"
                  checked={selectedCheckbox === "No"}
                  onChange={handleAcceptChange}
                />
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
 */
