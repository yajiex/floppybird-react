export default class Utils {
    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    static isInCompatible() {
        var isAndroid =  navigator.userAgent.match(/Android/i);;
        var isBlackBerry = navigator.userAgent.match(/BlackBerry/i);
        var isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
        var isOpera = navigator.userAgent.match(/Opera Mini/i);
        var isSafari = (navigator.userAgent.match(/OS X.*Safari/) && ! navigator.userAgent.match(/Chrome/));
        var isWindows = navigator.userAgent.match(/IEMobile/i);
        return isAndroid || isBlackBerry || isIOS || isOpera || isSafari || isWindows;
    }
}