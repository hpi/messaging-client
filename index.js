const fetch = require(`node-fetch`)

const BASE_MESSAGING_URL = `https://messaging.vercel.app`

class Messaging {
  constructor(jwt) {
    this.jwt = jwt
  }

  async sendSMS({ to, from, body, mediaUrl }) {
    const sendResponse = await fetch(`${BASE_MESSAGING_URL}/api/outgoing/sms`, {
      body: JSON.stringify({
        to,
        from,
        body,
        mediaUrl,
      }),
      headers: {
        [`Authorization`]: `Bearer ${this.jwt}`,
        [`Content-Type`]: `application/json`,
      }
    })

    if (sendResponse.status >= 400) {
      throw new Error(`failed to send SMS`)
    }

    return sendResponse.json()
  }

  pullSMS({ to, from, date }) {
    const pullResponse = await fetch(`${BASE_MESSAGING_URL}/api/history/sms`, {
      body: JSON.stringify({
        to,
        from,
        date,
      }),
      headers: {
        [`Authorization`]: `Bearer ${this.jwt}`,
        [`Content-Type`]: `application/json`,
      }
    })

    if (pullResponse.status >= 400) {
      throw new Error(`failed to get SMS`)
    }

    return pullResponse.json()
  }

  makeCall() {
    throw new Error(`not implemented`)
  }
}

module.exports = Messaging
