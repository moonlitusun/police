export interface LoggerOptions {
  url: string;
  batchInterval: number;
}

export class Logger {
  private url: string;

  private batchInterval: number;
  private batchTimer: any = null;
  private batchMessage = [];

  constructor(options: LoggerOptions) {
    this.url = options.url;
    this.batchInterval = options.batchInterval || 10000;
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
    return this.postData({ level: 'error', message })
  }

  info(message: any) {
    if (this.batchTimer) {

    }

    this.batchTimer = setTimeout(() => {
      this.postData({ level: 'info', message })
    });
  }

  infoImmediately(message: any) {
    return this.postData({ level: 'info', message })
  }
}
