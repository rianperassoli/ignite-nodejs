import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJSDateProvider } from "./DateProvider/implementations/DayJSDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayJSDateProvider);

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);

// Caso nao funcionar o envio de email, utilizar a criação desta forma
// container.registerInstance<IMailProvider>(
//   "MailProvider",
//   new EtherealMailProvider()
// );
