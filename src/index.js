import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/of";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/from";
import "rxjs/add/observable/fromEvent";

const input = document.getElementById("search");

Observable.fromEvent(input, "keyup")
  .debounceTime(500)
  .mergeMap(event =>
    Observable.ajax({
      url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f188cbce9e935de505e47517e491f0bf&text=hello&format=json&nojsoncallback=1&auth_token=72157661326245188-dd65d256be432cb9&api_sig=596dac512c6fbc6e436a25ddc59fe932`,
      responseType: "json"
    }).catch(err => (err.xhr ? Observable.of(err) : Observable.of(".___.")))
  )
  .subscribe(console.log);
