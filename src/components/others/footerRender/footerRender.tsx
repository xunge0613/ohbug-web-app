import React from 'react';
import { Avatar, Divider, Button, Popover } from 'antd';

import styles from './footerRender.less';

function footerRender(props: any) {
  const { collapsed, isMobile, logo, title } = props;
  if (collapsed || isMobile) return null;
  return (
    <footer className={styles.root}>
      <Divider />

      <div className={styles.container}>
        <Button className={styles.logo} type="link" href="https://ohbug.net" target="_blank">
          <Avatar src={logo} />
          <span className={styles.title}>{title}</span>
        </Button>

        <div className={styles.right}>
          <Button className={styles.link} type="link" href="https://ohbug.net/docs" target="_blank">
            Docs
          </Button>
          <Button
            className={styles.link}
            type="link"
            href="https://github.com/ohbug-org/ohbug"
            target="_blank"
          >
            Github
          </Button>

          <Popover
            placement="topRight"
            arrowPointAtCenter
            content={
              <div>
                <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 500 }}>
                  关注公众号反馈您的问题
                </div>
                <img
                  style={{ width: 200, height: 200 }}
                  src={require('./images/wechatQrcode.jpg')}
                  alt="wechat qrcode"
                />
              </div>
            }
          >
            <Button className={styles.link} type="link" href="javascript:void(0);">
              Feedback
            </Button>
          </Popover>
        </div>
      </div>
    </footer>
  );
}

export default footerRender;
