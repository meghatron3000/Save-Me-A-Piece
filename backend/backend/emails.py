import smtplib, ssl

password = "masterpass"
sender_email = "savemeapiece1@gmail.com"
# receiver_email = "hrsupz@gmail.com"
# receiver_email = "hrimaw2@illinois.edu"
receiver_email = "hanagzr1@gmail.com"
port = 465  # For SSL
smtp_server = "smtp.gmail.com"
message = """\
Subject: Hi there

This message is sent from Python."""

context = ssl.create_default_context()
with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message)