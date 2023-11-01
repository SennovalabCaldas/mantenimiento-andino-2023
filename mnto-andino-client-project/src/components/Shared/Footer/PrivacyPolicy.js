import React from "react";
import "./Footer.scss";
import { Tab, Tabs, Typography } from "@mui/material";
import { BackToMntoAndino } from "../../Client/BackToMntoAndino/BackToMntoAndino";
import { image } from "../../../assets";

export const PrivacyPolicy = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const tabContent = [
    <div key={0}>
      <Typography variant="body1">
        <div>
          <h2>
            POLÍTICA GENERAL DE TRATAMIENTO DE DATOS PERSONALES DE MANTENIMIENTO
            ANDINO S.A.S.
          </h2>
        </div>
        <div>
          CLIENTES, PROSPECTOS DE CLIENTES, FUNCIONARIOS MANTENIMIENTO ANDINO,
          PROVEEDORES Y VISITANTES
          <br />
          <br />
          ENTRADA EN VIGENCIA: OCTUBRE DE 2023
          <br />
          ÚLTIMA VERSIÓN: OCTUBRE DE 2023
        </div>
        <div>
          <br />
          <div>
            <h3>
              <strong>INTRODUCCIÓN</strong>
            </h3>

            <p>
              MANTENIMIENTO ANDINO S.A.S. (en adelante, MANTENIMIENTO ANDINO) es
              responsable de los Datos Personales e información que le
              suministran sus clientes, prospectos de clientes proveedores,
              contratistas, y visitantes (en adelante, los Titulares). <br />
              <br />
              En la presente Política de Tratamiento se establecen las
              finalidades, medidas y procedimientos de las Bases de Datos de
              MANTENIMIENTO ANDINO así como los mecanismos con que los Titulares
              cuentan para conocer, actualizar, rectificar, suprimir los datos
              suministrados o revocar la autorización que se otorga con la
              aceptación de la presente Política de Tratamiento. <br />
              <br />
              La aceptación de propuestas, la celebración de contratos, el
              diligenciamiento de formatos, el acceso a los Servicios de la
              página web www.mantenimientoandino.co (en adelante la Página Web)
              y/o la aceptación expresa o inequívoca de las presente políticas,
              implica la aceptación de los Titulares de la Política de
              Tratamiento y Protección de Datos Personales y su autorización
              para los usos y otros tratamientos que aquí se describen.
            </p>
          </div>
        </div>
      </Typography>
    </div>,
    <div key={1}>
      <Typography variant="body1">
        <div>
          <br />
          <div>
            {" "}
            <strong>DEFINICIONES</strong>
          </div>
          <div>
            Para los efectos de la presente Política de Privacidad, se entiende
            por:
            <br />
            <p>
              <strong> 1.1. Dato personal: </strong>Cualquier información
              vinculada o que pueda asociarse a una o varias personas naturales
              determinadas o determinables.
              <br />
              <strong> 1.2. Dato público:</strong> Dato personal que no es
              semiprivado, privado o sensible. Entre otros, son los datos
              relativos al estado civil de las personas, a su profesión u oficio
              y a su calidad de comerciante o de servidor público. Por su
              naturaleza, los datos públicos pueden estar contenidos, entre
              otros, en registros y documentos públicos.
              <br />
              <strong> 1.3. Dato Privado: </strong>Es el dato que por su
              naturaleza íntima o reservada sólo es relevante para el Titular.
              <br />
              <strong> 1.4. Dato personal sensible: </strong>Se entiende como
              datos sensibles aquellos que afecten la intimidad del titular o
              cuyo uso indebido pueda afectar la intimidad del Titular o la
              potencialidad de generar su discriminación.
              <br />
              <strong> 1.5. Dato personal semiprivado:</strong> son aquellos
              datos que no tienen una naturaleza íntima, reservada, ni pública y
              cuyo conocimiento o divulgación puede interesar no solo a su
              titular, sino a un grupo de personas o a la sociedad en general.
              En este caso, para su Tratamiento se requiere a autorización
              expresa del Titular de la información. Por ejemplo: datos de
              carácter financiero, datos relativos a las relaciones con las
              entidades de seguridad social (EPS, AFP, ARL, Cajas de
              Compensación).
              <br />
              <strong> 1.6. Base de Datos: </strong>Conjunto organizado de Datos
              Personales que sea objeto de Tratamiento. Para los efectos del
              presente documento se entiende como Base de Datos, aquella que
              contiene información de los Titulares.
              <br />
              <strong> 1.7. Titular:</strong> Persona natural cuyos Datos
              Personales sean objeto de Tratamiento. Para los efectos del
              presente documento se entiende como Titulares, a los proveedores,
              contratistas, colaboradores, clientes, usuarios y visitantes de
              MANTENIMIENTO ANDINO.
              <br />
              <strong> 1.8. Responsable del Tratamiento:</strong> Es la Persona
              natural o jurídica de naturaleza pública o privada, que, actuando
              por ella misma o con otros, decida sobre la Base de Datos y/o el
              Tratamiento de los datos. Para los efectos de la presente Política
              para el Tratamiento de Datos Personales se entiende como
              Responsable del Tratamiento a MANTENIMIENTO ANDINO.
              <br />
              <strong> 1.9. Encargado del Tratamiento: </strong>Persona natural
              o jurídica, pública o privada, que por sí misma o en asocio con
              otros, realice el Tratamiento de Datos Personales por cuenta del
              Responsable del Tratamiento (MANTENIMIENTO ANDINO).
              <br />
              <strong>1.10. Tratamiento:</strong> Cualquier operación o conjunto
              de operaciones sobre Datos Personales, tales como la recolección,
              almacenamiento, uso, circulación o supresión.
            </p>
          </div>
        </div>
      </Typography>
    </div>,
    <div key={2}>
      <Typography variant="body1">
        {" "}
        <div>
          <br />
          <div>
            <strong>I. RESPONSABLE Y ENCARGADO DEL TRATAMIENTO DE DATOS</strong>
          </div>
          <div>
            <p>
              El Responsable del Tratamiento de Datos Personales y otra
              información de los Titulares es MANTENIMIENTO ANDINO S.A.S..
              <br />
              NIT 900.703.240-3.
              <br />
              Domicilio y dirección en la Calle 76A # 21-85, Manizales,
              Colombia. <br />
              Teléfono: (+57) 310 383 3591. <br />
              Correo gerenciamantenimientoandino@gmail.com.
              <br />
            </p>
          </div>

          <div>
            <div>
              <strong>II. INFORMACIÓN Y DATOS DE MENORES DE EDAD</strong>
            </div>
            <p>
              Por regla general, MANTENIMIENTO ANDINO no usa, ni almacena, o
              realiza tratamiento alguno sobre datos personales de menores de
              edad, salvo que fuere estrictamente necesario. Sin embargo, en
              caso de que por algún motivo se llegare a recopilar datos de
              menores de edad, MANTENIMIENTO ANDINO tendrá en cuenta el respeto
              y prevalencia de los derechos de los menores, su interés superior
              y sus derechos fundamentales, de conformidad con lo establecido en
              las normas de protección de datos personales.
            </p>
          </div>
          <div>
            <strong>III. ALMACENAMIENTO DE DATOS PERSONALES</strong>
          </div>
          <p>
            El Titular autoriza de manera expresa a MANTENIMIENTO ANDINO para
            que almacene los Datos Personales de la forma que considere más
            segura y oportuna para la debida protección de los datos de los
            Titulares.
          </p>
        </div>
      </Typography>
    </div>,
    <div key={3}>
      <Typography variant="body1">
        <div>
          <br />
          <div>
            <strong>IV. FINALIDAD Y TRATAMIENTO</strong>
          </div>
          <div>
            <p>
              <strong>3.1. FINALIDADES</strong>

              <p>
                Las finalidades para las cuales MANTENIMIENTO ANDINO tratará los
                Datos Personales de los Titulares son:
                <br />
                <strong>
                  3.1.1. En relación con la base de datos de clientes:{" "}
                </strong>
                <ol type="a">
                  <li>
                    Cumplir los contratos de servicios celebrados con clientes.
                  </li>
                  <li>
                    Utilizar los Datos Personales para mercadeo y/o
                    comercialización de nuevos servicios o productos de
                    MANTENIMIENTO ANDINO.
                  </li>
                  <li>Medir niveles de satisfacción.</li>
                  <li>Realizar encuestas.</li>
                  <li>
                    Contactar a los titulares para realizar recordatorios sobre
                    mantenimientos y de vencimientos de garantías, así como para
                    informarles sobre los causales que podrían llevar a la
                    pérdida de cobertura.
                  </li>
                  <li>
                    Comunicar información relacionada con productos para la
                    financiación en la adquisición de bienes y servicios de
                    MANTENIMIENTO ANDINO.
                  </li>
                  <li>Ejecutar campañas de fidelización.</li>
                  <li>Enviar invitaciones a eventos.</li>
                  <li>
                    Ofrecer productos y servicios de MANTENIMIENTO ANDINO.
                  </li>
                </ol>
                <strong>
                  3.1.2. En relación con la base de datos de prospectos de
                  clientes
                </strong>{" "}
                <br />
                <ol type="a">
                  <li>
                    Contactar a los Titulares para ofrecerles bienes y servicios
                    de su interés, recibir ofertas de MANTENIMIENTO ANDINO,
                    invitar a la participación en programas, proyectos eventos,
                    socializar políticas, proyectos, programas, resultados y
                    cambios organizacionales.{" "}
                  </li>
                  <li>
                    Suministrar la información y datos personales de los
                    Titulares a las sociedades subsidiarias, filiales o
                    afiliadas a MANTENIMIENTO ANDINO, aliados comerciales o a
                    otras sociedades o personas que MANTENIMIENTO ANDINO
                    encargue para realizar el procesamiento de la información y
                    cumplir con las finalidades descritas en la presente
                    Política.{" "}
                  </li>
                  <li>
                    {" "}
                    Suministrar la información y datos personales de los
                    Titulares a aliados comerciales para que estos contacten a
                    los Titulares para ofrecerles bienes y servicios de su
                    interés, recibir ofertas de los titulares, invitar a la
                    participación en programas, proyectos eventos, socializar
                    políticas, proyectos, programas, resultados y cambios
                    organizacionales.{" "}
                  </li>
                </ol>
                <strong>
                  3.1.3. En relación con la base de datos de Funcionarios de la
                  Red de Concesionarios de MANTENIMIENTO ANDINO.
                </strong>{" "}
                <br />
                <ol type="a">
                  <li> Comunicar campañas comerciales y de posventa. </li>
                  <li> Invitar a eventos de MANTENIMIENTO ANDINO. </li>
                  <li>
                    Informar sobre actividades de formación y actualización para
                    el cumplimiento de los Estándares propuestos por la
                    MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    Comunicar noticias y novedades sobre los productos y
                    servicios de MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Enviar claves de ingreso a las plataformas virtuales
                    dispuestas para la Red MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Enviar información para recuperar contraseñas de acceso a
                    los sistemas dispuestos para la Red MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li> Realizar actualización de datos.</li>
                </ol>
                <strong>
                  3.1.4. En relación con la base de datos de proveedores
                </strong>{" "}
                <ol type="a">
                  <li>
                    {" "}
                    Realizar los respectivos pagos a proveedores y mantener
                    relaciones comerciales.{" "}
                  </li>
                  <li>
                    {" "}
                    Cumplir con los procesos internos de MANTENIMIENTO ANDINO en
                    materia de administración de proveedores y contratistas.{" "}
                  </li>
                </ol>
                <strong>
                  3.1.5. En relación con la base de datos de visitantes:
                </strong>{" "}
                <br />
                El control y la preservación de la seguridad de las personas,
                bienes e información de MANTENIMIENTO ANDINO.
                <br />
                <strong>
                  3.1.6. Finalidades comunes a todas las bases de datos:
                </strong>
                <br />
                <ol type="a">
                  <li>
                    {" "}
                    Gestionar toda la información necesaria para el cumplimiento
                    de las obligaciones tributarias y de registros comerciales,
                    corporativos y contables de MANTENIMIENTO ANDINO.
                  </li>{" "}
                  <li>
                    {" "}
                    La socialización de políticas, proyectos, programas y
                    cambios organizacionales.
                  </li>
                  <li>
                    El control y la preservación de la seguridad de las
                    personas, bienes e información de MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Realizar procesos al interior de MANTENIMIENTO ANDINO, con
                    fines de desarrollo u operativo y/o de administración de
                    sistemas.{" "}
                  </li>
                  <li>
                    {" "}
                    Sugerir productos o servicios (incluyendo los de terceros)
                    que MANTENIMIENTO ANDINO considera que pueden ser de interés
                    del Titular.{" "}
                  </li>
                  <li>
                    {" "}
                    Contactarlo como potencial cliente para mantenerlo informado
                    y ofrecerle nuestros servicios o mejorar los existentes.{" "}
                  </li>
                  <li>
                    Evaluar el nivel de satisfacción de nuestros servicios y los
                    de la Página Web, realizar estudios sobre hábitos de
                    consumo, preferencias y servicios de interés del Titular.{" "}
                  </li>
                  <li> Mantener comunicación con el Titular. </li>
                  <li>
                    {" "}
                    Dar respuesta a preguntas, quejas, reclamos, comentarios o
                    sugerencias respecto de los productos y/o servicios
                    ofrecidos por MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Realiza el proceso de archivo, de actualización de los
                    sistemas, de protección y custodia de información y bases de
                    datos de MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Las demás finalidades que determinen los Responsables en
                    procesos de obtención de Datos Personales para su
                    Tratamiento, con el fin de dar cumplimiento a las
                    obligaciones legales y regulatorias, así como de las
                    políticas de MANTENIMIENTO ANDINO.
                  </li>
                </ol>
                <br />
              </p>
              <strong>3.2. TRATAMIENTO DE LOS DATOS PERSONALES</strong>
              <p>
                MANTENIMIENTO ANDINO dará tratamiento a los Datos Personales de
                los Titulares para cumplir las finalidades descritas en esta
                Política. Dentro de dichos tratamientos, MANTENIMIENTO ANDINO
                podrá realizar los siguientes:
                <ol type="a">
                  <li>
                    La comunicación con los Titulares para efectos
                    contractuales, informativos o comerciales.
                  </li>
                  <li>
                    Establecer comunicación entre MANTENIMIENTO ANDINO y los
                    Titulares para cualquier propósito relacionado con las
                    finalidades que se establecen en la presente política, ya
                    sea mediante llamadas, mensajes de texto, correos
                    electrónicos y/o físicos.{" "}
                  </li>
                  <li>
                    Ofrecer o informar al Titular sobre productos y/o servicios
                    de MANTENIMIENTO ANDINO que puedan ser de su interés, así
                    como suministrar información general por medio de correos
                    electrónicos como parte de una novedad, comunicación,
                    noticia o Newsletter.{" "}
                  </li>
                  <li>
                    {" "}
                    De ser el caso, usar la información para dar trámite a los
                    reclamos, quejas, sugerencias respecto de los servicios
                    ofrecidos por MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Efectuar o implementar la adquisición u oferta de productos
                    o servicios por parte de MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Recabar información acerca del dispositivo que se está
                    utilizando para ver o utilizar la Pagina Web, como por
                    ejemplo dirección IP o el tipo de explorador de Internet o
                    sistema operativo utilizado y vincularla con información
                    personal para garantizar que la Pagina Web brinden la mejor
                    experiencia en línea.
                  </li>{" "}
                  <li>
                    {" "}
                    Evaluar el uso de la Pagina Web (de manera anónima e
                    integral), así como realizar estadísticas de las actividades
                    de los Titulares, como, por ejemplo, horas de visitas,
                    frecuencia con las que se visita y sitio web que transfirió
                    a la Pagina Web, de manera que se personalice la experiencia
                    de los Titulares en la Página Web.{" "}
                  </li>
                  <li>
                    Invitar y contactar a los Titulares para que participen en
                    conferencias, talleres, y cualquier otro evento desarrollado
                    por MANTENIMIENTO ANDINO.{" "}
                  </li>
                  <li>
                    {" "}
                    Auditar, estudiar y analizar la información de las Bases de
                    Datos para diseñar estrategias comerciales y aumentar y/o
                    mejorar los productos y servicios que ofrece MANTENIMIENTO
                    ANDINO.
                  </li>{" "}
                  <li>
                    {" "}
                    Combinar los Datos Personales con la información que se
                    obtenga de otros aliados o compañías o enviarla a los mismos
                    para implementar estrategias comerciales conjuntas.{" "}
                  </li>
                  <li>
                    {" "}
                    Suministrar la información y Datos Personales de los
                    Titulares a las sociedades subsidiarias, filiales o
                    afiliadas a MANTENIMIENTO ANDINO, aliados comerciales o a
                    otras sociedades o personas que MANTENIMIENTO ANDINO
                    encargue para realizar el procesamiento de la información y
                    cumplir con las finalidades descritas en la presente
                    Política.{" "}
                  </li>
                  <li>
                    {" "}
                    Cuando la información deba ser revelada para cumplir con
                    leyes, regulaciones o procesos legales, para asegurar el
                    cumplimiento de los términos y condiciones, para detener o
                    prevenir fraudes, ataques a la seguridad de MANTENIMIENTO
                    ANDINO o de otros, prevenir problemas técnicos o proteger
                    los derechos de otros como lo requieran los términos y
                    condiciones o la ley.{" "}
                  </li>
                  <li>
                    {" "}
                    Para los casos en que aplique, consultar, almacenar y usar
                    la información financiera obtenida de terceros
                    administradores de Bases de Datos, previa autorización
                    expresa del Titular para dicha consulta.
                  </li>
                  <li>
                    {" "}
                    Las demás descritos en la presente política o permitidos en
                    la Ley, así como aquellos necesarios para cumplir las
                    finalidades descritas en este documento.
                  </li>
                </ol>
              </p>
            </p>
          </div>
        </div>
      </Typography>
    </div>,
    <div key={4}>
      <Typography variant="body1">
        <div>
          <div>
            <strong>V. COOKIES</strong>

            <p>
              MANTENIMIENTO ANDINO utiliza cookies y otras herramientas que
              automáticamente recolectan información de las personas cuando usan
              la Pagina Web, entendiendo que el ingreso a la Página Web es una
              conducta inequívoca de autorización. <br />
              <br />
              El tipo de información que puede ser recolectada de esta manera
              incluye: <br />
              <ol type="A">
                <li>
                  Información sobre el Localizador de recursos uniforme (URL)
                </li>
                <li>
                  Información acerca del explorador que utiliza el Titular
                </li>
                <li>Detalles de las páginas visitadas por el Titular </li>
                <li>Dirección IP</li>
                <li>Clicks Hipervínculos</li>
                <li>Consultas</li>
              </ol>
              La mayoría de los exploradores de Internet están configurados para
              aceptar cookies. El usuario puede cambiar esta configuración para
              bloquearlas o que se le alerte cuando estén siendo enviadas a su
              equipo.
            </p>
          </div>
          <br />

          <div>
            <strong>
              {" "}
              VI. AUTORIZACIÓN PARA RECOLECCIÓN Y TRATAMIENTO DE DATOS
              PERSONALES Y OTRA INFORMACIÓN
            </strong>
          </div>
          <div>
            <p>
              Mediante el suministro voluntario de alguno de los Datos
              Personales en la forma señalada en la presente Política y/o la
              autorización expresa verbal o por escrito, el Titular autoriza
              expresa o inequívocamente a MANTENIMIENTO ANDINO para recolectar
              sus Datos Personales y cualquier otra información que llegare a
              suministrar, así como para realizar el Tratamiento sobre sus Datos
              Personales, de conformidad con esta Política de Privacidad y las
              normas legales aplicables.
            </p>
          </div>
        </div>
      </Typography>
    </div>,
    <div key={5}>
      <Typography variant="body1">
        <div>
          <div>
            <strong>
              VII. MEDIDAS DE SEGURIDAD PARA LA PROTECCIÓN DE LOS DATOS
              PERSONALES Y OTRA INFORMACIÓN
            </strong>
          </div>
          <div>
            <p>
              Las medidas de seguridad con las que cuenta MANTENIMIENTO ANDINO
              buscan proteger los datos de los Titulares con el fin de impedir
              su pérdida, adulteración, usos y accesos no autorizados. Para
              ello, MANTENIMIENTO ANDINO de forma diligente implementa las
              medidas humanas, técnicas y administrativas que razonablemente
              están a su alcance. El Titular acepta expresamente esta forma de
              protección y declara que la considera conveniente y suficiente
              para todos los propósitos.
            </p>
          </div>
          <div>
            <strong>VIII. LEGISLACIÓN VIGENTE</strong>
            <p>
              La legislación nacional vigente en materia de protección de Datos
              Personales está contenida en la Ley 1581 de 2012, el Decreto 1377
              de 2013 y la Ley 1266 de 2008 y las normas que las modifiquen o
              complementen.
            </p>
          </div>
          <div>
            <strong>
              IX. TRANSFERENCIA Y TRANSMISIÓN INTERNACIONAL Y NACIONAL DE BASES
              DE DATOS
            </strong>
            <p>
              <strong>TRANSFERENCIA</strong> <br />
              Es posible que MANTENIMIENTO ANDINO tenga que transferir
              información personal de los Titulares a otros Responsables en
              Colombia o a diferentes países, incluyendo a su matriz u otras
              compañías de su grupo empresarial. Al aceptar la presente Política
              para el Tratamiento de Datos Personales el Titular autoriza y da
              su consentimiento expreso para dicha Transferencia, a cualquier
              país o territorio.
              <br />
              <br />
              <strong>TRANSMISIONES</strong>
              <br /> Con la autorización otorgada por cualquiera de los medios
              previstos para tal fin, el Titular autoriza que MANTENIMIENTO
              ANDINO realice transmisiones nacionales e internacionales de Datos
              Personales a un Encargado, para permitir que el Encargado realice
              el Tratamiento por cuenta de MANTENIMIENTO ANDINO. Estas
              transmisiones no requerirán ser informadas al Titular ni contar
              con un consentimiento expreso adicional.
            </p>
          </div>
          <div>
            <strong>X. PERÍODO DE VIGENCIA DE LA BASE DE DATOS</strong>
            <p>
              Las Bases de Datos de MANTENIMIENTO ANDINO, así como los Datos
              Personales incorporados en ellas, estarán vigentes durante el
              plazo necesario para cumplir sus finalidades.
            </p>
          </div>
        </div>
      </Typography>
    </div>,
    <div key={6}>
      <Typography variant="body1">
        <strong>XI. DERECHOS DE LOS TITULARES</strong>
        <p>
          MANTENIMIENTO ANDINO informa a los Titulares que, conforme a la
          legislación vigente, estos tienen el derecho de conocer, actualizar,
          rectificar su información, y/o revocar la autorización para su
          tratamiento. En particular, son derechos de los titulares según se
          establece en el <strong>artículo 8 de la Ley 1581 de 2012</strong>:
          <ol type="a">
            <li>Conocer, actualizar y rectificar sus Datos Personales </li>
            <li> Solicitar prueba de la autorización otorgada </li>
            <li>
              Ser informado, previa solicitud, respecto del uso que le ha dado a
              sus Datos Personales;{" "}
            </li>
            <li>
              Presentar ante la Superintendencia de Industria y Comercio quejas
              por infracciones a lo dispuesto en la ley
            </li>{" "}
            <li>
              Revocar la autorización y/o solicitar la supresión del dato{" "}
            </li>
            <li>
              {" "}
              Acceder en forma gratuita a sus Datos Personales que hayan sido
              objeto de Tratamiento.
            </li>
          </ol>
          <strong>
            {" "}
            11.1. ÁREA ENCARGADA DE PETICIONES, CONSULTAS Y RECLAMOS
          </strong>{" "}
          <br />
          <p>
            El área encargada de atender las peticiones, consultas y reclamos de
            los Titulares para ejercer sus derechos a conocer, actualizar,
            rectificar y suprimir sus datos y revocar su autorización es la
            <strong>
              {" "}
              Dirección de Servicio al Cliente de MANTENIMIENTO ANDINO
            </strong>{" "}
            la cual podrá ser contactada en el siguiente correo electrónico
            <strong> servicioalcliente@mantenimientoandino.co</strong> y/o en el
            siguiente número de teléfono <strong>(+57) 310 383 3591</strong>.{" "}
            <br />
          </p>
          <br />
          <strong>11.2. PROCEDIMIENTO PARA EJERCER SUS DERECHOS</strong>
          <p>
            En caso de que desee ejercer sus derechos, el Titular deberá enviar
            un correo electrónico o físico a las direcciones de contacto
            establecidas en la presente Política de Privacidad. El procedimiento
            que se seguirá para dichas comunicaciones, serán los que se indican
            a continuación: <br />
            <br />
            <strong>a) Peticiones y Consultas Sobre Datos Personales. </strong>
            Cuando el Titular de los datos o sus causahabientes deseen consultar
            la información que reposa en las Bases de Datos, MANTENIMIENTO
            ANDINO responderá la solicitud en plazo de máximo diez (10) días
            hábiles. En cumplimiento a lo dispuesto en la{" "}
            <strong>Ley 1581 de 2012</strong>, cuando no fuere posible atender
            la consulta dentro de dicho término, se informará al Titular, se le
            expresará los motivos de la demora y se le señalará la fecha en que
            se atenderá su consulta, la cual no podrá superar los cinco (5) días
            hábiles siguientes al vencimiento del primer término. <br />
            <br />
            <strong>
              b) Revocación de autorización, retiro o supresión de la Base de
              Datos y reclamos sobre Datos Personales.
            </strong>{" "}
            Cuando el Titular de los datos o sus causahabientes consideren que
            la información contenida en las Bases de Datos debe ser objeto de
            corrección, actualización o supresión, o cuando adviertan el
            presunto incumplimiento de cualquiera de los deberes contenidos en
            <strong>la Ley 1581 de 2012</strong>, podrán presentar un reclamo
            ante MANTENIMIENTO ANDINO, el cual será tramitado bajo las
            siguientes reglas: <br />
            <ol>
              <li>
                {" "}
                El reclamo se formulará mediante solicitud dirigida a
                MANTENIMIENTO ANDINO con la identificación de los Titulares, la
                descripción de los hechos que dan lugar al reclamo, la
                dirección, y se anexarán los documentos que se quieran hacer
                valer.
              </li>
              <li>
                Si el reclamo resulta incompleto, MANTENIMIENTO ANDINO podrá
                requerir al interesado dentro de los cinco (5) días siguientes a
                la recepción del reclamo para que subsane las fallas.
              </li>
              <li>
                Transcurridos dos (2) meses desde la fecha del requerimiento,
                sin que el solicitante presente la información requerida, se
                entenderá que ha desistido del reclamo.
              </li>
              <li>
                En caso de que MANTENIMIENTO ANDINO no sea competente para
                resolver el reclamo, dará traslado a quien corresponda en un
                término máximo de dos (2) días hábiles e informará de la
                situación al Titular, con lo cual quedará relevada de cualquier
                reclamación o responsabilidad por el uso, rectificación o
                supresión de los datos.
              </li>
              <li>
                Una vez recibido el reclamo completo, cuando este no pueda ser
                resuelto de manera expedita y siempre y cuando sea técnicamente
                posible, se incluirá en la base de datos una leyenda que diga
                "reclamo en trámite" y el motivo del mismo, en un término no
                mayor a dos (2) días hábiles.{" "}
                <strong>
                  Dicha leyenda deberá mantenerse hasta que el reclamo sea
                  decidido.
                </strong>
              </li>
              <li>
                <strong>
                  El término máximo para atender el reclamo será de quince (15)
                  días hábiles contados a partir del día siguiente a la fecha de
                  su recibo.{" "}
                </strong>
                Cuando no fuere posible atender el reclamo dentro de dicho
                término, se informará al Titular los motivos de la demora y la
                fecha en que se atenderá su reclamo, la cual en ningún caso
                podrá superar los ocho (8) días hábiles siguientes al
                vencimiento del primer término.
              </li>
              <li>
                El retiro o supresión no procederá cuando exista un deber
                contractual de permanecer en la base de datos de MANTENIMIENTO
                ANDINO.
              </li>
            </ol>{" "}
            <br />
          </p>
        </p>
      </Typography>
    </div>,
  ];
  return (
    <>
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomnbg} // Ruta de la miniatura de la imagen
          fullSrc={image.logoSennovalabNoC} // Ruta de la imagen completa
        />
      </div>
      <div className="privacy-policy-container">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          className="tabs-privacypolicy"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab className="option-tab-pribacypolicy" label="Introducción" />
          <Tab className="option-tab-pribacypolicy" label="Definiciones" />
          <Tab className="option-tab-pribacypolicy" label="Responsable y Encargado" />
          <Tab className="option-tab-pribacypolicy" label="Finalidad y Tratamiento" />
          <Tab className="option-tab-pribacypolicy" label="Cookies y Autorización" />
          <Tab className="option-tab-pribacypolicy" label="Medidas de seguridad" />
          <Tab className="option-tab-pribacypolicy" label="Derechos de los titulares" />
        </Tabs>
        <div className="tab-content">{tabContent[tabIndex]}</div>
      </div>
    </>
  );
};
