interface LoggerOptions {
  url: string;
}

export class Logger {
  private url: string;

  constructor(options: LoggerOptions) {
    this.url = options.url;
  }

  async postData(data = {}) {
    const response = await fetch(`${this.url}/log`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    return response.json();
  }

  error(message: any) {
    this.postData({ level: 'error', message })
  }

  info(message: any) {
    this.postData({ level: 'info', message })
      .then((res) => {
        console.log(res, '<-- res');
      })
      .catch((err) => {
        console.log(err, '<-- error');
      })
  }
}
