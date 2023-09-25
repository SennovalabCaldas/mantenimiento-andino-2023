import "./WebCertifications.scss";
import { ENV } from "../../../utils/constants";
export const WebCertifications = ({ certifications }) => {

  console.log("certifications", certifications);
  const baseApi = ENV.BASE_PATH;
  return (
    <div className="content-section-certifications">
      <h2>Certificaciones</h2>
      <div className="content">
        {certifications.map((certification) => (
          <>
            <figure className="content__item">
              <h2 className="content__item-title oh">
                <span className="oh__inner">
                  {certifications.certificationName}
                </span>
              </h2>
              <div className="content__item-img-wrap">
                <img
                  className="content__item-img"
                  src={`${baseApi}/${certifications.avatar}`}
                  alt={certifications.certificationName}
                />
              </div>

              <figcaption className="content__item-caption">
                {certifications.joinDate}
              </figcaption>
            </figure>
            <div className="content__overlay"></div>
          </>
        ))}
      </div>
    </div>
  );
};
