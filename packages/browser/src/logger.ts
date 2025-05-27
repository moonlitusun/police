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
    this.batchMessage = JSON.parse(
      localStorage.getItem("logger-batch-message") || "[]",
    );
    if (this.batchMessage.length) this.createBatch();

    // window.addEventListener("beforeunload", this.flushLogs.bind(this));
  }

  addBatchMessage(message: any) {
    this.batchMessage.push(message);
    localStorage.setItem(
      "logger-batch-message",
      JSON.stringify(this.batchMessage),
    );
  }

  clearBatchMessage() {
    this.batchMessage = [];
    localStorage.removeItem("logger-batch-message");
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
      .then((res) => res.json())
      .catch((err) => console.log(err, "Logger Error"));
  }

  sendBatchMessage() {
    const data = {
      level: "info",
      message: this.batchMessage,
      ...this.createMetaInfo(),
    };

    if (!navigator.sendBeacon) {
      return this.postData(data);
    }

    const res = navigator.sendBeacon(`${this.url}/log`, JSON.stringify(data));
    console.log(res, "res");

    if (res) {
      this.clearBatchMessage();
      this.batchTimer = null;
    }
  }

  private createBatch() {
    this.batchTimer = setTimeout(() => {
      this.sendBatchMessage();
      // this.postData({
      //   level: "info",
      //   message: this.batchMessage,
      //   ...this.createMetaInfo(),
      // })
      //   .then(() => {
      //     this.clearBatchMessage();
      //     this.batchTimer = null;
      //   })
      //   .catch((err) => {
      //     this.createBatch();
      //     this.error(`Police Browser Error: ${err.message}`);
      //   });
    }, this.batchInterval);
  }

  private createMetaInfo() {
    const userInfo =
      typeof this.userInfo === "function" ? this.userInfo() : this.userInfo;

    return {
      label: this.label,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userInfo,
    };
  }

  error(message: any) {
    if (!this.url) return;
    return this.postData({ level: "error", message, ...this.createMetaInfo() });
  }

  info(message: any) {
    if (!this.url) return;
    this.addBatchMessage({ ...message, timestamp: new Date().toISOString() });
    if (!this.batchTimer) this.createBatch();
  }

  infoImmediately(message: any) {
    if (!this.url) return;
    return this.postData({ level: "info", message, ...this.createMetaInfo() });
  }

  flushLogs() {
    // if (!this.url || this.batchMessage.length === 0) return;
    // if (this.batchTimer) {
    //   clearTimeout(this.batchTimer);
    //   this.batchTimer = null;
    // }
    // if (this.batchMessage.length > 0) {
    //   const data = {
    //     level: "info",
    //     message: this.batchMessage,
    //     ...this.createMetaInfo(),
    //   };
    //   const blob = new Blob([JSON.stringify(data)], {
    //     type: "application/json",
    //   });
    //   navigator.sendBeacon(`${this.url}/log`, blob);
    //   this.clearBatchMessage();
    // }
  }
}
