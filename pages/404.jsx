
import { Fragment } from "react";

import Session from "../components/Session";
import CustomCode from "../components/Error/CustomCode";

export default function Custom404() {

    return (<Fragment>
      <Session.SessionPanel>
        <CustomCode code={404}/>
      </Session.SessionPanel>
    </Fragment>)
  }