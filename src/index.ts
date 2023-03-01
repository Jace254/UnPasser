import {
  QMainWindow,
  QWidget,
  QLabel,
  QIcon,
  QGridLayout,
  NativeElement,
} from "@nodegui/nodegui";
import logo from "../assets/logox200.png";
import { getPasswords } from "./getPasswords";

const main = async () => {
  const win = new QMainWindow();
  win.setWindowTitle("UnPasser-Made By @JoashCodes");
  win.setFixedSize(500, 500);
  win.setWindowIcon(new QIcon(logo));
  const centralWidget = new QWidget();
  centralWidget.setObjectName("myroot");

  const label = new QLabel();
  label.setObjectName("mylabel");
  label.setText("WIFI PASSWORDS");

  const passwordLayout = new QGridLayout();
  passwordLayout.setObjectName("mytable");
  passwordLayout.setSpacing(0);

  const ssidLabel = new QLabel();
  ssidLabel.setObjectName("mylabel");
  ssidLabel.setText("SSID");
  const passLabel = new QLabel();
  passLabel.setObjectName("mylabel");
  passLabel.setText("PASSWORD");

  passwordLayout.addWidget(ssidLabel, 0, 0);
  passwordLayout.addWidget(passLabel, 0, 1);

  await getPasswords().then((passwords) => {
    for (var i = 0; i < passwords.length; i++) {
      const SSID = passwords[i].ssid;
      const password = passwords[i].password;
      const ssidLabel = new QLabel();
      ssidLabel.setObjectName("mydataS");
      ssidLabel.setText(SSID);
      const passLabel = new QLabel();
      passLabel.setObjectName("mydataP");
      passLabel.setText(password);

      passwordLayout.addWidget(ssidLabel, i + 1, 0);
      passwordLayout.addWidget(passLabel, i + 1, 1);
    }
  });

  centralWidget.setLayout(passwordLayout);
  win.setCentralWidget(centralWidget);
  win.setStyleSheet(
    `
    #myroot {
      background-color: #000000;
      height: '100%';
      width: '1000px';
      align-items: 'center';
    }
    #mylabel {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      text-align: 'center';
      align-items: 'center';
      margin: auto;
    }
    #mydataS {
      font-size: 15px;
      font-weight: bold;
      color: 'yellow';
      text-align: 'center';
      border: 1px solid #2C3E50;
      margin: 0;
      padding: 2;
    }
    #mydataP {
      font-size: 15px;
      font-weight: bold;
      color: 'red';
      text-align: 'center';
      border: 1px solid #2C3E50;
      margin: 0;
      padding: 2;
    }
    #mydataP::hover {
      background-color: #2C3E50;
    }
  `
  );
  win.show();

  (global as any).win = win;
};

main();
