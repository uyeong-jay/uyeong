import nodemailer from "nodemailer";

export function generateRandomNumber() {
  const min = 100000; // 6자리 숫자의 최소값
  const max = 999999; // 6자리 숫자의 최대값
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function sendEmail(toEmail: string, verificationCode: number) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.NODEMAILER_USER_EMAIL}`,
        pass: `${process.env.NODEMAILER_USER_PASSWORD}`,
      },
    });

    let mailOptions = await transporter.sendMail({
      from: `${process.env.NODEMAILER_USER_EMAIL}`,
      to: toEmail,
      subject: "Uyeong Blog - Email Verification Code",
      text: `"${verificationCode}" is your verification code.`,
    });

    // console.log("Message sent!,", `Verification code: ${verificationCode},`, "Msg id:", mailOptions.messageId);

    return mailOptions.messageId;
  } catch {
    return "";
  }
}
