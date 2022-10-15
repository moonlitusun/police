export interface LoggerOptions {
  url: string;
  label: string;
  batchInterval?: number;
  userInfo: () => void | string;
}

export class Logger {
  public url: string;
  private label: string;

  private batchInterval: number;
  private batchTimer: any = null;
  private batchMessage: any[] = [];
  private userInfo;

  constructor(options: LoggerOptions) {
    this.url = options.url;
    this.label = options.label;
    this.userInfo = options.userInfo;
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
      this.postData({ level: 'info', message: this.batchMessage, ...this.createMetaInfo() })
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

  private createMetaInfo() {
    const userInfo = typeof this.userInfo === 'function' ? this.userInfo() : this.userInfo;

    return { label: this.label, userAgent: navigator.userAgent, userInfo };
  }

  error(message: any) {
    if (!this.url) return;
    return this.postData({ level: 'error', message, ...this.createMetaInfo() })
  }

  info(message: any) {
    if (!this.url) return;
    this.batchMessage.push(message);
    if (!this.batchTimer) this.createBatch();
  }

  infoImmediately(message: any) {
    if (!this.url) return;
    return this.postData({ level: 'info', message, ...this.createMetaInfo() })
  }
}
