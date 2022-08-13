export interface AppUpdate {
  current: string;
  enabled: boolean;
  msg?: Msg;
  majorMsg?: MajorMsg;
  minorMsg?: MinorMsg;
}

interface Msg {
    title: string;
    msg: string;
    btn: string;
}

interface MajorMsg {
    title: string;
    msg: string;
    btn: string;
}

interface MinorMsg {
    title: string;
    msg: string;
    btn: string;
}
