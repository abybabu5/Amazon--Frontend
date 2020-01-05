import {ajax} from "rxjs/ajax";

export class Api {
    static URL = "https://amazon-be-aby.herokuapp.com";
    static fetch = (url, method = "GET", body) => {
        return ajax( {
            url: Api.URL + url,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).toPromise()
            .then((res) => res.response);
    }
    static request(endpoint, method = 'GET', body) {
        var request = new XMLHttpRequest();
        request.open(method, Api.URL + endpoint, true);
        // request.setRequestHeader("Authorization", "basic " + Api.AUTH);
        request.send(body);
    }
}
