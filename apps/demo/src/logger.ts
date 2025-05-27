import { Logger } from '@dz-web/police-browser';

export const logger = new Logger({
  url: 'http://172.16.11.89:6001',
  label: 'test',
  userInfo: () => 'mobile: 张三',
});
