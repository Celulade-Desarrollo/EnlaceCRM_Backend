import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOTP = async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: `+57${phone}`, channel: "sms" });

    res
      .status(200)
      .json({ message: "OTP enviado", sid: verification.sid, tipo: req.tipo });
  } catch (err) {
    res.status(500).json({ message: "Error enviando OTP", error: err.message });
  }
};

const verifyOTP = async (req, res) => {
  const { phone, code } = req.body;

  try {
    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: `+57${phone}`,
        code,
      });

    if (verification_check.status === "approved") {
      res.status(200).json({ message: "OTP válido", phone, tipo: req.tipo });
    } else {
      res.status(401).json({ message: "Código inválido" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error verificando OTP", error: err.message });
  }
};

export { sendOTP, verifyOTP };
