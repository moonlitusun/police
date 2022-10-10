export interface LoggerOptions {
  url: string;
  batchInterval: number;
}

export class Logger {
  private url: string;

  private batchInterval: number;
  private batchTimer: any = null;
  private batchMessage: any[] = [];

  constructor(options: LoggerOptions) {
    this.url = options.url;
    this.batchInterval = options.batchInterval || 10000;
  }

  postData(data = {}) {
    return fetch(`${this.url}/log`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
    .then((res) => res.json());
  }

  private createBatch() {
    this.batchTimer = setTimeout(() => {
      this.postData({ level: 'info', message: this.batchMessage })
        .then(() => {
          this.batchMessage = [];
          this.batchTimer = null;
        })
        .catch((err) => {
          this.createBatch();
          this.error(`Police Browser Error: ${err.message}`);
        });
    }, this.batchInterval);
  }

  error(message: any) {
    return this.postData({ level: 'error', message })
  }

  info(message: any) {
    this.batchMessage.push(message);
    if (!this.batchTimer) this.createBatch();
  }

  infoImmediately(message: any) {
    return this.postData({ level: 'info', message })
  }
}
