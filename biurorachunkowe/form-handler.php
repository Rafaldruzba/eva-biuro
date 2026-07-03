<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer-master/src/Exception.php';
require 'PHPMailer/PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer/PHPMailer-master/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $description = $_POST['description'];
    $ip = $_SERVER['REMOTE_ADDR'];

    $mail = new PHPMailer(true);
    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'br-online@br-online.pl';
        $mail->Password   = 'Biurko$$as!8';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';

        //Recipients
        $mail->setFrom('br-online@br-online.pl', 'Ewa Reluga');
        $mail->addAddress('br-online@br-online.pl');

       // Content
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'NOWE ZLECENIE OD KLIENTA';
        $mail->Body = "
            <div style='background-color: #f4f7f9; padding: 40px 20px; font-family: sans-serif; line-height: 1.6;'>
                <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e1e8ed;'>
                    
                    <div style='background-color: #2c3e50; padding: 25px; text-align: center;'>
                        <h2 style='color: #ffffff; margin: 0; font-size: 22px; font-weight: 400;'>Nowe zlecenie od klienta</h2>
                    </div>

                    <div style='padding: 30px;'>
                        <p style='font-size: 14px; color: #7f8c8d; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;'>Dane kontaktowe</p>
                        
                        <table style='width: 100%; border-collapse: collapse;'>
                            <tr>
                                <td style='padding: 8px 0; color: #34495e;'><strong>Imię i Nazwisko:</strong></td>
                                <td style='padding: 8px 0; color: #2c3e50;'>$firstName</td>
                            </tr>
                            <tr>
                                <td style='padding: 8px 0; color: #34495e;'><strong>Email:</strong></td>
                                <td style='padding: 8px 0;'><a href='mailto:$email' style='color: #3498db; text-decoration: none;'>$email</a></td>
                            </tr>
                            <tr>
                                <td style='padding: 8px 0; color: #34495e;'><strong>Telefon:</strong></td>
                                <td style='padding: 8px 0; color: #2c3e50;'>$phone</td>
                            </tr>
                        </table>

                        <p style='font-size: 14px; color: #7f8c8d; text-transform: uppercase; letter-spacing: 1px; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;'>Opis projektu</p>
                        <div style='background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; color: #2c3e50; font-style: italic;'>
                            " . nl2br($description) . "
                        </div>
                    </div>

                    <div style='background-color: #f4f7f9; padding: 15px; text-align: center; font-size: 12px; color: #95a5a6;'>
                        Wysłano z formularza kontaktowego | IP klienta: <strong>$ip</strong>
                    </div>
                </div>
            </div>
            ";

        $mail->AltBody = "
            Imię i Nazwisko: $firstName\n
            Email: $email\n";

     $mail->send();

        $autoReply = new PHPMailer(true);
        $autoReply->isSMTP();
        $autoReply->Host       = 'smtp.hostinger.com'; // Użyj serwera SMTP dostarczonego przez Hostinger
        $autoReply->SMTPAuth   = true;
        $autoReply->Username   = 'br-online@br-online.pl'; // SMTP username
        $autoReply->Password   = 'Biurko$$as!8'; // SMTP password
        $autoReply->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $autoReply->Port       = 587; // Użyj odpowiedniego portu SMTP dostarczonego przez Hostinger
        $autoReply->CharSet    = 'UTF-8';

        $autoReply->setFrom('br-online@br-online.pl', 'Biuro Rachunkowe OnLine | Ewa Reluga');
        $autoReply->addAddress($email); // Odbiorca to adres e-mail, który został podany w formularzu

        $autoReply->isHTML(true);
        $autoReply->CharSet = 'UTF-8';
        $autoReply->Subject = 'Otrzymałam Twoją wiadomość - Ewa Reluga';

        $autoReply->Body = "
            <div style='background-color: #fdfdfd; padding: 40px 20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6;'>
                <div style='max-width: 500px; margin: 0 auto; background: #ffffff; border: 1px solid #eeeeee; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.02);'>
                    
                    <div style='height: 4px; background: linear-gradient(to right, #3498db, #2c3e50);'></div>

                    <div style='padding: 40px 30px;'>
                        <h2 style='color: #2c3e50; margin-top: 0; font-size: 20px;'>Dzień dobry, $firstName!</h2>
                        
                        <p style='color: #4f5f6f; font-size: 15px;'>
                            Dziękuję za przesłanie formularza i zainteresowanie moimi usługami. Potwierdzam, że Twoja wiadomość dotarła do mnie bezpiecznie.
                        </p>
                        
                        <p style='color: #4f5f6f; font-size: 15px;'>
                            Zapoznam się z Twoim opisem i postaram się odpowiedzieć tak szybko, jak to możliwe (zazwyczaj zajmuje mi to do 24 godzin).
                        </p>

                        <div style='margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f0;'>
                            <p style='margin: 0; color: #2c3e50; font-weight: bold;'>Pozdrawiam,</p>
                            <p style='margin: 5px 0 0 0; color: #3498db; font-size: 18px; font-family: Georgia, serif;'>Ewa Reluga</p>
                        </div>
                    </div>

                    <div style='background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 11px; color: #bdc3c7;'>
                        To jest automatyczne potwierdzenie otrzymania wiadomości.<br>
                        Nie musisz na nie odpowiadać.
                    </div>
                </div>
            </div>
            ";

        // AltBody (wersja tekstowa dla starych programów pocztowych)
        $autoReply->AltBody = "Dzień dobry $firstName,\n\nDziękuję za kontakt. Potwierdzam otrzymanie Twojego zgłoszenia. Zapoznam się z nim i wrócę do Ciebie z odpowiedzią tak szybko, jak to możliwe.\n\nPozdrawiam,\nEwa Reluga";

        $autoReply->send();
        
        echo 'Email sent successfully';
    } catch (Exception $e) {
        echo "Failed to send email. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
