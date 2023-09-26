import "./WebCertifications.scss";
import { ENV } from "../../../utils/constants";

export const WebCertifications = ({ certifications }) => {
  console.log("certifications", certifications);
  const baseApi = ENV.BASE_PATH;
  console.log("baseApi", baseApi);

  const nationalCertifications = certifications.filter(
    (certification) => certification.national === true
  );
  const internationalCertifications = certifications.filter(
    (certification) => certification.national === false
  );

  return (
    <>
      <div className="content-section-certifications">
        <h2>Certificaciones Nacionales</h2>
        {nationalCertifications.map((certification) => (
          <div className="certification" key={certification.id}>
            <div className="certification__image">
              <img
                src={`${baseApi}/${certification.avatar}`}
                alt={certification.certificationName}
              />
            </div>
            <div className="certification__info">
              <h3>{certification.certificationName}</h3>
              <p>{certification.national}</p>
              <p>{certification.joinDate}</p>
            </div>
          </div>
        ))}
     
        <h2>Certificaciones Internacionales</h2>
        {internationalCertifications.map((certification) => (
          <div className="certification" key={certification.id}>
            <div className="certification__image">
              <img
                src={`${baseApi}/${certification.avatar}`}
                alt={certification.certificationName}
              />
            </div>
            <div className="certification__info">
              <h3>{certification.certificationName}</h3>
              <p>{certification.national}</p>
              <p>{certification.joinDate}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
