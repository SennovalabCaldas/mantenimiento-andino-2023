import React, { useState } from "react";
import "./WebServices.scss";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import StarIcon from "@mui/icons-material/Star";
import { ENV } from "../../../utils/constants";
import { Box } from "@mui/material";
import { Services } from "./Services";
const basePath = ENV.BASE_PATH;

export const WebServices = ({ categoryServices, services }) => {
  const [selectedServiceRating, setSelectedServiceRating] = useState({});
  const [serviceRatings, setServiceRatings] = useState({});
  const [shareUrl, setShareUrl] = useState(
    "https://www.mantenimientoandino.co"
  );
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [hover, setHover] = useState(-1);
  console.log("services", services);
  console.log("categoryServices", categoryServices);

  const loading = services.length === 0;
  const [mostrarServiciosAdicionales, setMostrarServiciosAdicionales] =
    useState(false);
  const [serviciosRelacionados, setServiciosRelacionados] = useState({});

  const categoryMap = categoryServices.reduce((map, category) => {
    map[category._id] = category.nameCategoryService;
    return map;
  }, {});

  const toggleMostrarServicios = (categoryId) => {
    const serviciosFiltrados = services.filter(
      (servicio) => servicio.categoryService === categoryId
    );
    setServiciosRelacionados(serviciosFiltrados);
    setMostrarServiciosAdicionales(true);
  };

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleLinkedInShare = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(linkedInShareUrl, "_blank");
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(serviceId) {
    const rating = selectedServiceRating[serviceId] || 0;
    return `${rating} Star${rating !== 1 ? "s" : ""}, ${labels[rating]}`;
  }

  const handleRatingChange = (serviceId, newValue) => {
    // Actualiza el rating solo para el servicio en el que se hizo clic
    setServiceRatings((prevRatings) => ({
      ...prevRatings,
      [serviceId]: newValue,
    }));
  };

  return (
    // <div className="content-section-services">
    //   {categoryServices.map((categoryService) => (
    //     <Card sx={{ maxWidth: 345, m: 2 }}>
    //       <CardHeader
    //         avatar={
    //           loading ? (
    //             <Skeleton
    //               animation="wave"
    //               variant="circular"
    //               width={40}
    //               height={40}
    //             />
    //           ) : (
    //             <Avatar
    //               alt="Ted talk"
    //               src={`${basePath}/${categoryService.avatar}`}
    //             />
    //           )
    //         }
    //         action={
    //           loading ? null : (
    //             <>
    //               <IconButton
    //                 aria-label="settings"
    //                 onClick={() => setShowShareOptions(!showShareOptions)}
    //               >
    //                 <MoreVertIcon />
    //               </IconButton>
    //               {showShareOptions && (
    //                 <div>
    //                   <FontAwesomeIcon
    //                     icon={faFacebook}
    //                     aria-label="Compartir en Facebook"
    //                     style={{ cursor: "pointer" }}
    //                     onClick={handleFacebookShare}
    //                   />
    //                   <FontAwesomeIcon
    //                     icon={faTwitter}
    //                     aria-label="Compartir en Twitter"
    //                     style={{ cursor: "pointer" }}
    //                     onClick={handleTwitterShare}
    //                   />

    //                   <FontAwesomeIcon
    //                     icon={faLinkedin}
    //                     aria-label="Compartir en LinkedIn"
    //                     style={{ cursor: "pointer" }}
    //                     onClick={handleLinkedInShare}
    //                   />
    //                 </div>
    //               )}
    //             </>
    //           )
    //         }
    //         title={
    //           loading ? (
    //             <Skeleton
    //               animation="wave"
    //               height={10}
    //               width="80%"
    //               style={{ marginBottom: 6 }}
    //             />
    //           ) : (
    //             categoryService.nameCategoryService
    //           )
    //         }
    //         subheader={
    //           loading ? (
    //             <Skeleton animation="wave" height={10} width="40%" />
    //           ) : (
    //             "5 hours ago"
    //           )
    //         }
    //       />
    //       {loading ? (
    //         <Skeleton
    //           sx={{ height: 190 }}
    //           animation="wave"
    //           variant="rectangular"
    //         />
    //       ) : (
    //         <CardMedia
    //           component="img"
    //           height="140"
    //           image={`${basePath}/${categoryService.avatar}`}
    //           alt={categoryService.nameCategoryService}
    //         />
    //       )}

    //       <CardContent>
    //         {loading ? (
    //           <React.Fragment>
    //             <Skeleton
    //               animation="wave"
    //               height={10}
    //               style={{ marginBottom: 6 }}
    //             />
    //             <Skeleton animation="wave" height={10} width="80%" />
    //           </React.Fragment>
    //         ) : (
    //           <>
    //             <Typography
    //               variant="body2"
    //               color="text.secondary"
    //               component="p"
    //             >
    //               Categoría: {categoryService.nameCategoryService}
    //             </Typography>
    //             <Rating
    //               name="hover-feedback"
    //               value={serviceRatings[categoryService._id] || 0}
    //               onChange={(event, newValue) => {
    //                 handleRatingChange(categoryService._id, newValue);
    //               }}
    //               precision={0.5}
    //               getLabelText={() => getLabelText(categoryService._id)} // Pasa el ID del servicio
    //               onChangeActive={(event, newHover) => {
    //                 setHover(newHover);
    //               }}
    //               emptyIcon={
    //                 <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
    //               }
    //             />
    //             {serviceRatings[categoryService._id] !== null && (
    //               <Box sx={{ ml: 2 }}>
    //                 {
    //                   labels[
    //                     hover !== -1
    //                       ? hover
    //                       : serviceRatings[categoryService._id] || 0
    //                   ]
    //                 }
    //               </Box>
    //             )}
    //           </>
    //         )}
    //       </CardContent>
    //     </Card>
    //   ))}
    // </div>
    <Services categoryServices={categoryServices} services={services} />
   
  );
};
