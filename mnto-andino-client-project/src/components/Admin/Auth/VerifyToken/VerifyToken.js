import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Auth } from "../../../../api";

export const VerifyToken = () => {
  const { token } = useParams();
  const authController = new Auth();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyToken = async () => {
      const response = await authController.verifyAuth(token);
      if (response) {
        setVerificationStatus("Cuenta verificada exitosamente");
      } else {
        setVerificationStatus("Error al verificar la cuenta");
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="verification-status">
      <h2>Verificación de Cuenta</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};
