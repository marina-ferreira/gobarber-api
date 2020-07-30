import nodemailer, { Transporter } from 'nodemailer'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

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

  public async sendMail({ to, from, subject }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'hello@gobarber.com'
      },
      to: { name: to.name, address: to.email },
      subject,
      text: 'Email test'
    })

    /* eslint-disable-next-line */
    console.log('Ethereal message:', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMailProvider
