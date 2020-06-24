window.fetch=null;
(function(){
  !function(e) {
    "use strict";

    function t(e) {
      if("string" !== typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
      return e.toLowerCase()
    }

    function r(e) {
      return "string" !== typeof e && (e = String(e)), e
    }

    function n(e) {
      var t = {
        next: function() {
          var t = e.shift();
          return {
            done: void 0 === t,
            value: t
          }
        }
      };
      return y.iterable && (t[Symbol.iterator] = function() {
        return t
      }), t
    }

    function i(e) {
      this.map = {},
      e instanceof i ? e.forEach(function(e, t) {
        this.append(t, e)
      }, this) : Array.isArray(e) ? e.forEach(function(e) {
        this.append(e[0], e[1])
      }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
        this.append(t, e[t])
      }, this)
    }

    function o(e) {
      if(e.bodyUsed) return Promise.reject(new TypeError("Already read"));
      e.bodyUsed = !0
    }

    function a(e) {
      return new Promise(function(t, r) {
        e.onload = function() {
          t(e.result)
        }, e.onerror = function() {
          r(e.error)
        }
      })
    }

    function s(e) {
      var t = new FileReader,
        r = a(t);
      return t.readAsArrayBuffer(e), r
    }

    function f(e) {
      var t = new FileReader,
        r = a(t);
      return t.readAsText(e), r
    }

    function u(e) {
      for(var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
      return r.join("")
    }

    function c(e) {
      if(e.slice) return e.slice(0);
      var t = new Uint8Array(e.byteLength);
      return t.set(new Uint8Array(e)), t.buffer
    }

    function l() {
      return this.bodyUsed = !1, this._initBody = function(e) {
        if(this._bodyInit = e, e)
          if("string" === typeof e) this._bodyText = e;
          else if(y.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
        else if(y.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
        else if(y.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
        else if(y.arrayBuffer && y.blob && g(e)) this._bodyArrayBuffer = c(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
        else {
          if(!y.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !_(e)) throw new Error("unsupported BodyInit type");
          this._bodyArrayBuffer = c(e)
        } else this._bodyText = "";
        this.headers.get("content-type") || ("string" === typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : y.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
      }, y.blob && (this.blob = function() {
        var e = o(this);
        if(e) return e;
        if(this._bodyBlob) return Promise.resolve(this._bodyBlob);
        if(this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        if(this._bodyFormData) throw new Error("could not read FormData body as blob");
        return Promise.resolve(new Blob([this._bodyText]))
      }, this.arrayBuffer = function() {
        return this._bodyArrayBuffer ? o(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
      }), this.text = function() {
        var e = o(this);
        if(e) return e;
        if(this._bodyBlob) return f(this._bodyBlob);
        if(this._bodyArrayBuffer) return Promise.resolve(u(this._bodyArrayBuffer));
        if(this._bodyFormData) throw new Error("could not read FormData body as text");
        return Promise.resolve(this._bodyText)
      }, y.formData && (this.formData = function() {
        return this.text().then(p)
      }), this.json = function() {
        return this.text().then(JSON.parse)
      }, this
    }

    function d(e) {
      var t = e.toUpperCase();
      return w.indexOf(t) > -1 ? t : e
    }

    function h(e, t) {
      t = t || {};
      var r = t.body;
      if(e instanceof h) {
        if(e.bodyUsed) throw new TypeError("Already read");
        this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new i(e.headers)), this.method = e.method, this.mode = e.mode, r || null == e._bodyInit || (r = e._bodyInit, e.bodyUsed = !0)
      } else this.url = String(e);
      if(this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new i(t.headers)), this.method = d(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
      this._initBody(r)
    }

    function p(e) {
      var t = new FormData;
      return e.trim().split("&").forEach(function(e) {
        if(e) {
          var r = e.split("="),
            n = r.shift().replace(/\+/g, " "),
            i = r.join("=").replace(/\+/g, " ");
          t.append(decodeURIComponent(n), decodeURIComponent(i))
        }
      }), t
    }

    function b(e) {
      var t = new i;
      return e.split(/\r?\n/).forEach(function(e) {
        var r = e.split(":"),
          n = r.shift().trim();
        if(n) {
          var i = r.join(":").trim();
          t.append(n, i)
        }
      }), t
    }

    function m(e, t) {
      t || (t = {}), 
      this.type = "default", 
      this.status = "status" in t ? t.status : (200 || 0), 
      this.ok = this.status>=200||this.status===0&& this.status < 300, 
      this.statusText = "statusText" in t ? t.statusText : "OK", 
      this.headers = new i(t.headers), 
      this.url = t.url || "", 
      this._initBody(e)
    }
    if(!e.fetch) {
      var y = {
        searchParams: "URLSearchParams" in e,
        iterable: "Symbol" in e && "iterator" in Symbol,
        blob: "FileReader" in e && "Blob" in e && function() {
          try {
            return new Blob, !0
          } 
          catch (e) {
            return !1
          }
        }(),
        formData: "FormData" in e,
        arrayBuffer: "ArrayBuffer" in e
      };
      if(y.arrayBuffer) 
        var v = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
      g = function(e) {
        return e && DataView.prototype.isPrototypeOf(e)
      },
      _ = ArrayBuffer.isView || function(e) {
        return e && v.indexOf(Object.prototype.toString.call(e)) > -1
      };
      i.prototype.append = function(e, n) {
        e = t(e), n = r(n);
        var i = this.map[e];
        this.map[e] = i ? i + "," + n : n
      },
      i.prototype.delete = function(e) {
        delete this.map[t(e)]
      },
      i.prototype.get = function(e) {
        return e = t(e), this.has(e) ? this.map[e] : null
      },
      i.prototype.has = function(e) {
        return this.map.hasOwnProperty(t(e))
      }, 
      i.prototype.set = function(e, n) {
        this.map[t(e)] = r(n)
      }, 
      i.prototype.forEach = function(e, t) {
        for(var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
      },
      i.prototype.keys = function() {
        var e = [];
        return this.forEach(function(t, r) {
          e.push(r)
        }), n(e)
      },
      i.prototype.values = function() {
        var e = [];
        return this.forEach(function(t) {
          e.push(t)
        }), n(e)
      }, 
      i.prototype.entries = function() {
        var e = [];
        return this.forEach(function(t, r) {
          e.push([r, t])
        }), n(e)
      }, 
      y.iterable && (i.prototype[Symbol.iterator] = i.prototype.entries);
      var w = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      h.prototype.clone = function() {
        return new h(this, {
          body: this._bodyInit
        })
      }, l.call(h.prototype), l.call(m.prototype), m.prototype.clone = function() {
        return new m(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new i(this.headers),
          url: this.url
        })
      }, m.error = function() {
        var e = new m(null, {
          status: 0,
          statusText: ""
        });
        return e.type = "error", e
      };
      var S = [301, 302, 303, 307, 308];
      m.redirect = function(e, t) {
        if(-1 === S.indexOf(t)) 
          throw new RangeError("Invalid status code");
        return new m(null, {
          status: t,
          headers: {
            location: e
          }
        })
      }, 
      e.Headers = i, 
      e.Request = h, 
      e.Response = m, 
      
      e.fetch = function(e, t) {
        return new Promise(function(r, n) {
          var i = new h(e, t),
            o = new XMLHttpRequest;
          o.onload = function() {
            var e = {
              status: o.status,
              statusText: o.statusText,
              headers: b(o.getAllResponseHeaders() || "")
            };
            e.url = "responseURL" in o ? o.responseURL : e.headers.get("X-Request-URL");
            var t = "response" in o ? o.response : o.responseText;
            r(new m(t, e))
          }, o.onerror = function() {
            n(new TypeError("Network request failed"))
          }, o.ontimeout = function() {
            n(new TypeError("Network request failed"))
          }, o.open(i.method, i.url, !0), "include" === i.credentials && (o.withCredentials = !0), "responseType" in o && y.blob && (o.responseType = "blob"), i.headers.forEach(function(e, t) {
            o.setRequestHeader(t, e)
          }), o.send("undefined" === typeof i._bodyInit ? null : i._bodyInit)
        })
      }, 
      e.fetch.polyfill = !0
    }
  }("undefined" !== typeof self ? self : this)
})();
