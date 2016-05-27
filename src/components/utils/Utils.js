export default class Utils {
  static getCookie(cname) {
    const name = `${cname}'='`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  static setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `'expires='${d.toGMTString()}`;
    document.cookie = `${cname}'='${cvalue}';'${expires}`;
  }

  static isInCompatible() {
    const isAndroid = navigator.userAgent.match(/Android/i);
    const isBlackBerry = navigator.userAgent.match(/BlackBerry/i);
    const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    const isOpera = navigator.userAgent.match(/Opera Mini/i);
    const isSafari = (navigator.userAgent.match(/OS X.*Safari/)
                      && !navigator.userAgent.match(/Chrome/));
    const isWindows = navigator.userAgent.match(/IEMobile/i);
    return isAndroid || isBlackBerry || isIOS || isOpera || isSafari || isWindows;
  }
}
