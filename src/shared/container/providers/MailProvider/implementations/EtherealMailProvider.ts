import nodemailer, { Transporter } from 'nodemailer'
import IMailProvider from '../models/IMailProvider'

class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'GoBarber <hello@gobarber.com>',
      to,
      subject: 'Reset Password',
      text: body
    })

    /* eslint-disable-next-line */
    console.log('Ethereal message:', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMailProvider