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
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    return response.json();
  }

  log(info) {
    this.postData(info)
      .then((res) => {
        console.log(res, '<-- res');
      })
      .catch((err) => {
        console.log(err, '<-- error');
      })
  }
}
