'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var algosdk = _interopDefault(require('algosdk'));
var MyAlgo = _interopDefault(require('@randlabs/myalgo-connect'));
var WalletConnect = _interopDefault(require('@walletconnect/client'));
var WalletConnectQRCodeModal = _interopDefault(require('algorand-walletconnect-qrcode-modal'));
var utils = require('@json-rpc-tools/utils');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = /*#__PURE__*/createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    define(Gp, iteratorSymbol, function () {
      return this;
    });
    define(Gp, "toString", function () {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
});

(function (Wallets) {
  Wallets["DISCONNECTED"] = "DC";
  Wallets["PeraWallet"] = "PeraWallet";
  Wallets["MyAlgoWallet"] = "MyAlgoWallet";
  Wallets["AlgoSignerWallet"] = "AlgoSignerWallet";
})(exports.Wallets || (exports.Wallets = {}));

(function (Networks) {
  Networks["TestNet"] = "TestNet";
  Networks["MainNet"] = "MainNet";
  Networks["VIGEE_DEV"] = "vigee";
})(exports.Networks || (exports.Networks = {}));

(function (StorageKeys) {
  StorageKeys["ACCOUNT_LIST"] = "acct-list";
  StorageKeys["WALLET_PREFERENCE"] = "wallet-preference";
  StorageKeys["ACCOUNT_PREFERENCE"] = "acct-preference";
  StorageKeys["NETWORK_PREFERENCE"] = "network-preference";
})(exports.StorageKeys || (exports.StorageKeys = {})); // export interface Wallet {
//     accounts: string[];
//     defaultAccount: number;
//     network: string;
//     permissionCallback?: PopupPermissionCallback;
//     displayName(): string;
//     img(inverted: boolean): string;
//     connect(settings?: any): Promise<boolean>;
//     isConnected(): boolean;
//     disconnect(): void;
//     getDefaultAccount(): string;
//     signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
//     signBytes(b: Uint8Array): Promise<Uint8Array>;
//     signTeal(teal: Uint8Array): Promise<Uint8Array>;
// }

var logoInverted = "data:image/png;base64,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";
var logo = "data:image/png;base64,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";

var AlgoSignerWallet = /*#__PURE__*/function () {
  function AlgoSignerWallet(network) {
    this.accounts = [];
    this.network = network;
    this.defaultAccount = 0;
  }

  AlgoSignerWallet.displayName = function displayName() {
    return "AlgoSigner";
  };

  var _proto = AlgoSignerWallet.prototype;

  _proto.displayName = function displayName() {
    return AlgoSignerWallet.displayName();
  };

  AlgoSignerWallet.img = function img(inverted) {
    return inverted ? logoInverted : logo;
  };

  _proto.img = function img(inverted) {
    return AlgoSignerWallet.img(inverted);
  };

  _proto.connect = /*#__PURE__*/function () {
    var _connect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var loaded, accts;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.isConnected()) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", true);

            case 2:
              _context.next = 4;
              return this.waitForLoaded();

            case 4:
              loaded = _context.sent;

              if (loaded) {
                _context.next = 8;
                break;
              }

              alert("AlgoSigner not loaded, is it installed?");
              return _context.abrupt("return", false);

            case 8:
              _context.prev = 8;
              _context.next = 11;
              return AlgoSigner.connect();

            case 11:
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](8);
              alert("Couldn't connect to algosigner, is it installed?");

            case 16:
              _context.next = 18;
              return AlgoSigner.accounts({
                ledger: this.network
              });

            case 18:
              accts = _context.sent;
              this.accounts = accts.map(function (a) {
                return a.address;
              });
              return _context.abrupt("return", true);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[8, 13]]);
    }));

    function connect() {
      return _connect.apply(this, arguments);
    }

    return connect;
  }();

  _proto.waitForLoaded = /*#__PURE__*/function () {
    var _waitForLoaded = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var x;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              x = 0;

            case 1:
              if (!(x < 3)) {
                _context2.next = 9;
                break;
              }

              if (!(typeof AlgoSigner !== 'undefined')) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", true);

            case 4:
              _context2.next = 6;
              return new Promise(function (r) {
                setTimeout(r, 1000);
              });

            case 6:
              x++;
              _context2.next = 1;
              break;

            case 9:
              return _context2.abrupt("return", false);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function waitForLoaded() {
      return _waitForLoaded.apply(this, arguments);
    }

    return waitForLoaded;
  }() // Only checking accounts, not that algosigner is loaded because sometimes it takes a few tries
  ;

  _proto.isConnected = function isConnected() {
    return this.accounts && this.accounts.length > 0;
  };

  _proto.disconnect = function disconnect() {
    localStorage.removeItem(exports.StorageKeys.ACCOUNT_PREFERENCE);
  };

  _proto.getDefaultAccount = function getDefaultAccount() {
    if (!this.isConnected()) return "";
    return this.accounts[this.defaultAccount];
  };

  _proto.signTxn = /*#__PURE__*/function () {
    var _signTxn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(txns) {
      var defaultAcct, encodedTxns, signed;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              defaultAcct = this.getDefaultAccount();
              encodedTxns = txns.map(function (tx) {
                var t = {
                  txn: AlgoSigner.encoding.msgpackToBase64(tx.toByte())
                }; // @ts-ignore

                if (algosdk.encodeAddress(tx.from.publicKey) !== defaultAcct) t.signers = [];
                return t;
              });
              _context3.next = 4;
              return AlgoSigner.signTxn(encodedTxns);

            case 4:
              signed = _context3.sent;
              return _context3.abrupt("return", signed.map(function (signedTx) {
                if (signedTx) return {
                  txID: signedTx.txID,
                  blob: AlgoSigner.encoding.base64ToMsgpack(signedTx.blob)
                };
                return {};
              }));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function signTxn(_x) {
      return _signTxn.apply(this, arguments);
    }

    return signTxn;
  }();

  _proto.sign = /*#__PURE__*/function () {
    var _sign = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(txn) {
      var stxn, blob;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return AlgoSigner.sign(txn);

            case 2:
              stxn = _context4.sent;
              blob = new Uint8Array(Buffer.from(stxn.blob, 'base64'));
              return _context4.abrupt("return", {
                txID: stxn.txID,
                blob: blob
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function sign(_x2) {
      return _sign.apply(this, arguments);
    }

    return sign;
  }();

  _proto.signBytes = /*#__PURE__*/function () {
    var _signBytes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(b) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              throw new Error('Method not implemented to sign bytes: ' + Buffer.from(b).toString());

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function signBytes(_x3) {
      return _signBytes.apply(this, arguments);
    }

    return signBytes;
  }();

  _proto.signTeal = /*#__PURE__*/function () {
    var _signTeal = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(teal) {
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              throw new Error('Method not implemented to decode: .' + Buffer.from(teal).toString());

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function signTeal(_x4) {
      return _signTeal.apply(this, arguments);
    }

    return signTeal;
  }();

  return AlgoSignerWallet;
}();

var logoInverted$1 = "data:image/png;base64,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";
var logo$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQEAAAEGCAYAAABl6SBFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADt1JREFUeNrsnUFyG7kVht90eR/mBOGsUpWNOSdQ+wSmT2BqmZWlE5A6Ae1VlqJPYOoEbp1g6E2qskrnBvQJHMFuWizLsgh0o4GH931VLI+qRlILDXz4ATTQv3358kUAwC4VRQCABAAACQAAEgAAJAAASAAAkAAAIAEAQAIAgAQAAAkAABIAACQAAEgAAJAAACABAEACAIAEAAAJAAASAAAkAABIAACQAAAgAQBQy7NUv/gf//wPpT8us7vPJOD7GopuPP79r7/bkQBEaeB19/VZz4b/lBB2d5/P3b9t9y+QBGAk6q5xP+/+nY38u4//PeYghE+dLNzXe24XEoB+HHr3s66x15mnEfeZ332WR2Jwn9tODC23FAnAaY3JNfaXmTd6HzEsjqTgZHDDXAMSgIeN5XXXi04L/zvd56IbKmw7IWypAkjAIq6xvzHQ8H811Fl0n4MQ3pMQxofnBNJU/D/vPv/tesQpxfK9XD525bKiXJBAib3+dVfBr2XcGX2NZbXsyuqD6J8XQQLGqY96t4UMu2ZvgXlXfn/K/eQiIAFVjf8jPdkgzI6SFDJAAjR+hlXIAAnQ+JEBMkACGVXGDzT+5DKg/JHA6LgJvpV8m7CaUxzZJLFrYfIVCYxU4VzjX1LhsmMh989fABKI0vsfov+U4sj6Pq07UfM8BhIYjHnXwxD99TDrRLCiKJBA317luksARH+dLDsZkN6QQHBPsqAouJdIwB4X9B7FpjpWEJDAkxXFRf81RVEsLg18FCYNkcAjkdFVDib/uNdIwCA1vYPZ1HeBBOAQDxkn2mTdzRMgASoA0BHY7AgsS+CaKAg/GRJOkIAdASyo9/ADM4sisCaBSXeTEQA8JYIZEihXADX1HBCBPQlMhCVACKszEyRQzhwAAgBEYFQCTgA8GQZ9hwYTJKBXAAvqMSACmxJYIQAYWARrJKAH1/iX1FuIUK/WSECHsXkUGGJxUVrCLE0Ch9lcgJgUtdpUmgTYDQjUNcMS4FkAIHUalsBCWAmA8SlixaAECUyFMwEhHW6isEYCaeGdAEAdNCyBFfMAkMn8wDUSSDMe44EgyIW5KN2jolkCPBAEOdbJCRJgGAAMC5AAwwAwPiyokUBcWA4EhgWGJbAQzgiE/JmKouPsNUlgwjAAFPFGlLzVWpMELoRXhQOdllkJTDuzAmgbvma/ivVMSWEuhUeDHY3H/zvLoMx2d5+9h+hLTHpuIvsFEuifAha0/68C8KlMF5J2JaW9+/zh2WuW+ABY3X2aXC9Qw3CAycBvXEZMDTE49/z/twXfu6zrcO4SIAV8Y9NF61hRPEZq8ZXQPuBv1JYGkAApIIh9QApInQZCr/eGNIAEjpmQAr7yrkePfqsktVgYEtSS6cRnzhK4oP1/nVxb9fj+sRtVn9SSeghjNg3kLAGeCxC5GkAirZLUYiENLCTDpe6KwsqWpovWQ/ycsVLL2wF+zm3h9/UCCZACxkoBYzeqq4Gi/Lbw+/oaCTzNTDgwZDNgDz5GEhgqtRzmFXYF39upZHYMWY4SIAUMlwLGmhe4GvjnvS/8/r5EAr9mjgAGb7QxI/Y2QtpoCr/HC8lozqvKUACWJwRdFH4b4efGnBe4jPAzdzLuqobpzi43CbwW21xKnHXyWD3rVcTGWnoaeIkEHjIxPhRwjWkTMWHsIvzMtxHL46bw+51N6q0yKxTLnEf++UP3rEMtCVpNAtnU+ZwkcGZYAE1ApV+J31LqkPMCbUAK8H1Dz54hAUmAFPDroZNbSq09vmeb+HrXAZXewpAACXTUYndVYCP+k2vrrrx8G9UQPWtIajkcElt7ft/WwP2fI4GMYlECQnbduSHA4kiePgwxJPBNAVO5fwBsKn7baVspf6nwDAmEVeZSCNl1t+5Rdn171pDU8uMhsaSBzOp+DhKYiM29Aq4xrQKiY92jEvXZrx+SWmp5eDCMb+orfVdh8lOhc5CA1RQQ8rz9eoA4GTovEJJalgPcbwvzArV1CVhcGmzE/8Ggx97ANMa8wFCp5ZD8EEFGbSAHCVgcCvimgKdeaeUzw9yMcL2PpZYxxaVtSMBwwBAbCVtimwzUk/jOCwyZWkLnBZgcLFgCpICnmcrTB1T6VqIm4vWe8iJO38mwVso+aCRpW0AC4wugHTBWhzaqU5/Ei5FaxhAXElAkgakhAYTsuqs9xvt1hAYVI7WEDglKf4R4alUCllYGQs4KWEYqy/aERBIrtfRJAiW/k+DMqgSsJIFW/CfXFp4NZR7QqFKllsO9nw14zSQBJJA1IWcFLAPK0qc8bxOmltA0cIMEypJAbUQAjYSdFTCNXKZNwtQSGoGbwuvKzJoErBB6VkDsceVj8wJjpJbQIYy73pKXCifWJGAhCWyk/667mGW6TZhaGBKQBIonZNeda0x93lXXd15gzNRygKcHDSeB54VLIGTX3fUAvzd0H8HYqSU0CZT8+vK/WJNAyceJteK/664eaIjkMy+wP2pUY6eW4wjsO5woNQ0wHCiIkLfyrAf63b4iaRKmltBrvqWKlSGBaaFl2gT0VIsBewHfk5reJ0wtIeml9HkBJFAAMXbdxexZQ5bc1gNfr+9SYamvL2c4UAAbCT+Oe0hiPoe+iFBZQ86ZLPH15RMkYC8FuMb/JsJ11BEr6TrSz/a95obqhgRyFEDr+T1DLLE91lhjiOBC4vVWvs8LWHh9ORJQROiuu0XEaxpaAlMZfu7ix+v1FQxpAAlkw1i77lLOCyxHKEdfcd1Q9ZBADrhIuvH8nrnE3ztRD/yzFiOUJbsKkYBKQnbdrUe6tqFEsBzpekOWChEBEkhKI+PvuvNhiBe9LmS8HZ/TgLJhSIAEVKWAIXbdjZkEYjzINPQ18/QgEkjGRsIO4hzzgZC+L7uM8SDT0OmllXKWCvdIQNfNCtl1t0hwraFpYOzU0ud6S0kDO2sS0Pzsd+pdd2PMC4ydWo7l4ysCdhUqlYDWgyFc9FwF9G51ousNifOzRKmFeQGGAyoIeUPvdcLrDekl14nLOCS9lCAChgMKaGT4N/TmllrGeJDplCTiOxQpYUjw2ZoEPiu8STmcFRA7tawzKWuLQwJzqwPa5gQ2Eu8NvaSW/kOCVvQfNMJwoLAUMFWWAlKnlr5JQET/I8QkgcwF0CqK1SGpJdbZBqFMxf+0Ie2PEJMEMrZz7Df0Dn29IanlIsOy900DjeheehZrEtAigpCzAlKmgHcBFeo607IPOROhQQK6JNAquDEbz+9ZSKJTY3ukljrT8g9JU1qHBDurEviU+Y0J2SWYcnJNW2qJNSTQyCerEsh5ONBIHseH+5SlptRyKlaWCpkTKCAFuMb/JuH1+u5qjHl8eMokoHVI0FiVQCt5zuZuJJ/jw2OmFg0vhbXwwtKkQ5jKegH8hJCzAlLvutOWWmKnAW2vL99Zl0Buk4MhZwWkjNVvlaWWEEKWCjWlgVvrEsgpCbjGtPL8npS77kIeDKoTp5YQ5toaFklArwS07boLSS1L0UfIC0u1JIFWEj8vk8uhIk0m17Dx/B7OCsh3XkDL68uTyyoXCeSwpKNt191lwPesRS8hpw1peH35LRLIIwlsRNeuuyagB1lJPmcFhCaBEl9Y2iCBb6R+zbS2XXchqeWN6KdWVq9OGQrskUD6sVHIWQEpd91pSy1DUtquwiyebKyMF4i2XXclnRUQQmm7CrMQ1LPMCmQ/co/lelXfpad14jKaeo7tl1IO004E+wL+liaXocqzzApmM3KvdaGsl5xLuhOLcuFDIX9HNisXFQUDkIQtEvg5uc/mAgwlgD0SeJx31BEonKwSb44S4OWSUDJtbnW8opAA7KaAXCXAkABKZoMETqMRJgihTAG0SOB0rqgzUBhZJtycJZClNQF6pNsdEvCHh4egFLJNtrlLwG3u2VN/oIAU0CCBMPbCSgGQAkxLgDQApAAkELSHHoAUUJAEDmmgpT6BMrai4JzDSlGBXlKnQBkq6qwmCaiwKsDRMKBFAqQBsEkr/mdXIoET2WkqXDA9DNgjAWIW2GQryrbCa5TAnmEBUDdtS0ClbcEEKlNqpbjAz4UnCSEfGlE6X6VZAk4Ar6h7QF20KwHV9oWiUJ1KqwJugJuI2VEPIRGuE1I9P1UVciOYH4AU7KSAlaqqoJtxTp0E5gHsSkC6SMb8AIyFE0CLBPKcH2ionzDC8LOYelYVeINeCROFEI+NZPgCESTwcKzGRCHEoJEC556qQm+WSwIvEAEMXKeKfDitKvymsWIAdCqGJeDYIgIYYHj5quRUWRm4iRtEAD0E4BJAW/IfWRm5mYgAQgVQ/EpTZeimIgJAAMYlgAgAASABRAC/xDX838XYw2aV0Zu9EZ4jgIcCMFknKsM3vUEE0LG1XBcq4zffZPyDB6nwlRjuDCrqwPeJoA1FYY5zYX5InlEPvovAVYb/3X2WFIcZ8ZMASQIPWDFPUDwNQ0AkcGolaSiK4rhC8kjANy5eURRF0Hb3c0VRIIGQ4cEfREfVbLt7SLJDAsHsukpEKtCX5l6J8eU/JEAqsMpGvs3r8NJaJBAtFVzSu2R7f9zYnzMmkUB03nY9zYaiyCb6XzL2RwIpKt45FS8bIfPiGSSQPIK+QAZJxv0MzZBANjTIYNTG71JYS3EgAWRA4wckkL0M/hAmEENxMd89n/FXGj8S0D5ncN5V5Esq8skCPZTZijE/EiipVzvMZB/OL6By39P+pHwACRTf0x3GuFafbNvL/XmPv5OU0sChInk0AveZ3H3qu8/Lu8+8+7rUHt9J773wCDYSgAdC2Mr9+xNnR1Kolf9dLvncdP/S0yMBOJFd9zk8CXeQwvPuv2cZD3XcdX+i0SMBiCOFY5wUpt3nrBtCzEZs7Puuse+6xk68RwKQoNf9GccyOEjiwN9++Pox4Xz+4ev9E78TlPLbly9fKAUAw7BECIAEAAAJAAASAAAkAABIAACQAAAgAQBAAgCABAAACQAAEgAAJAAASAAAkAAAIAEAQAIAgAQAAAkAABIAACQAAEgAAJAAACABAEACAIAEAAAJAAASAAAkAABIAACQAAAgAQBAAgCABAAACQAAEgAAJAAAGfJ/AQYAHdQzxPOOxTAAAAAASUVORK5CYII=";
/*
 Warning:
    Popups will be blocked if the connect or sign are called outside of a user triggered event, please make sure
    the user allows all popups or the calls are all triggered by events
    https://connect.myalgo.com/docs/getting-started/important-considerations#browser-events-and-blocked-popups
*/

var MyAlgoWallet = /*#__PURE__*/function () {
  function MyAlgoWallet() {
    this.accounts = [];
    this.defaultAccount = 0;
    this.walletConn = new MyAlgo();
  }

  MyAlgoWallet.displayName = function displayName() {
    return "My Algo";
  };

  var _proto = MyAlgoWallet.prototype;

  _proto.displayName = function displayName() {
    return MyAlgoWallet.displayName();
  };

  MyAlgoWallet.img = function img(inverted) {
    return inverted ? logoInverted$1 : logo$1;
  };

  _proto.img = function img(inverted) {
    return MyAlgoWallet.img(inverted);
  };

  _proto.connect = /*#__PURE__*/function () {
    var _connect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var accounts;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.isConnected()) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", true);

            case 2:
              _context.prev = 2;
              _context.next = 5;
              return this.walletConn.connect();

            case 5:
              accounts = _context.sent;
              this.accounts = accounts.map(function (account) {
                return account.address;
              });
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", false);

            case 12:
              return _context.abrupt("return", true);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 9]]);
    }));

    function connect() {
      return _connect.apply(this, arguments);
    }

    return connect;
  }();

  _proto.isConnected = function isConnected() {
    return this.accounts && this.accounts.length > 0;
  };

  _proto.disconnect = function disconnect() {
    /* noop */
  };

  _proto.getDefaultAccount = function getDefaultAccount() {
    if (!this.isConnected()) return "";
    return this.accounts[this.defaultAccount];
  };

  _proto.doSign = /*#__PURE__*/function () {
    var _doSign = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(defaultAcct, txns) {
      var unsigned, signedTxns, tidx, txn, s, x;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              unsigned = [];
              signedTxns = [];
              _context2.t0 = runtime_1.keys(txns);

            case 3:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 11;
                break;
              }

              tidx = _context2.t1.value;

              if (txns[tidx]) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("continue", 3);

            case 7:
              txn = txns[tidx];

              if (algosdk.encodeAddress(txn.from.publicKey) === defaultAcct) {
                signedTxns.push(unsigned.length);
                unsigned.push(txn.toByte());
              } else {
                signedTxns.push({
                  txID: "",
                  blob: new Uint8Array()
                });
              }

              _context2.next = 3;
              break;

            case 11:
              _context2.next = 13;
              return this.walletConn.signTransaction(unsigned);

            case 13:
              s = _context2.sent;

              for (x = 0; x < signedTxns.length; x++) {
                if (typeof signedTxns[x] === "number") {
                  signedTxns[x] = s[signedTxns[x]];
                }
              }

              return _context2.abrupt("return", signedTxns);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function doSign(_x, _x2) {
      return _doSign.apply(this, arguments);
    }

    return doSign;
  }();

  _proto.signTxn = /*#__PURE__*/function () {
    var _signTxn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(txns) {
      var _this = this;

      var defaultAcct;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              defaultAcct = this.getDefaultAccount();

              if (!this.permissionCallback) {
                _context5.next = 5;
                break;
              }

              _context5.next = 4;
              return this.permissionCallback.request({
                approved: function () {
                  var _approved = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
                    return runtime_1.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this.doSign(defaultAcct, txns);

                          case 2:
                            return _context3.abrupt("return", _context3.sent);

                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  function approved() {
                    return _approved.apply(this, arguments);
                  }

                  return approved;
                }(),
                declined: function () {
                  var _declined = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
                    return runtime_1.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.abrupt("return", []);

                          case 1:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  function declined() {
                    return _declined.apply(this, arguments);
                  }

                  return declined;
                }()
              });

            case 4:
              return _context5.abrupt("return", _context5.sent);

            case 5:
              _context5.next = 7;
              return this.doSign(defaultAcct, txns);

            case 7:
              return _context5.abrupt("return", _context5.sent);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function signTxn(_x3) {
      return _signTxn.apply(this, arguments);
    }

    return signTxn;
  }();

  _proto.signBytes = function signBytes(b, permissionCallback) {
    throw new Error("Method not implemented." + b + permissionCallback);
  };

  _proto.signTeal = /*#__PURE__*/function () {
    var _signTeal = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(teal, _permissionCallback) {
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.walletConn.signLogicSig(teal, this.getDefaultAccount());

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function signTeal(_x4, _x5) {
      return _signTeal.apply(this, arguments);
    }

    return signTeal;
  }();

  return MyAlgoWallet;
}();

var logo$2 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwSDE3LjUwNDdMMTUuODY5MyAxMy45NkwxMi4zNjI1IDIwSDkuNTYzNzVMMTQuOTc1OCAxMC42NDU2TDE0LjA5OTEgNy4zODE3TDYuNzk4NzQgMjBINEwxMy4yNTYxIDRIMTUuNzE3NkwxNi43Nzk4IDcuOTg3MzhIMTkuMzA4N0wxNy41ODkgMTAuOTgyMUwyMCAyMFoiIGZpbGw9IiMyQjJCMkYiLz4KPC9zdmc+Cg==";

var PeraWallet = /*#__PURE__*/function () {
  function PeraWallet(network) {
    this.accounts = [];
    this.defaultAccount = 0;
    this.network = network;
    var bridge = "https://bridge.walletconnect.org";
    this.connector = new WalletConnect({
      bridge: bridge,
      qrcodeModal: WalletConnectQRCodeModal
    });
  }

  var _proto = PeraWallet.prototype;

  _proto.connect = /*#__PURE__*/function () {
    var _connect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cb) {
      var _this = this;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.connector.connected) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", true);

            case 2:
              _context.next = 4;
              return this.connector.createSession();

            case 4:
              this.connector.on("connect", function (error, payload) {
                if (error) {
                  console.log(error);
                  throw error;
                }

                var accounts = payload.params[0].accounts;
                _this.accounts = accounts;
              });
              this.connector.on("session_update", function (error, payload) {
                if (error) {
                  throw error;
                }

                var accounts = payload.params[0].accounts;
                cb(accounts);
                _this.accounts = accounts;
              });
              this.connector.on("disconnect", function (error, _payload) {
                if (error) throw error;
              });
              return _context.abrupt("return", new Promise(function (resolve) {
                var reconn = setInterval(function () {
                  if (_this.connector.connected) {
                    clearInterval(reconn);
                    resolve(true);
                    return;
                  }

                  _this.connector.connect();
                }, 100);
              }));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function connect(_x) {
      return _connect.apply(this, arguments);
    }

    return connect;
  }();

  PeraWallet.displayName = function displayName() {
    return "Wallet Connect";
  };

  _proto.displayName = function displayName() {
    return PeraWallet.displayName();
  };

  PeraWallet.img = function img(_inverted) {
    return logo$2;
  };

  _proto.img = function img(inverted) {
    return PeraWallet.img(inverted);
  };

  _proto.isConnected = function isConnected() {
    return this.connector.connected;
  };

  _proto.disconnect = function disconnect() {
    this.connector.killSession();
  };

  _proto.getDefaultAccount = function getDefaultAccount() {
    if (!this.isConnected()) return "";
    return this.accounts[this.defaultAccount];
  };

  _proto.signTxn = /*#__PURE__*/function () {
    var _signTxn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(txns) {
      var defaultAddress, txnsToSign, request, result;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              defaultAddress = this.getDefaultAccount();
              txnsToSign = txns.map(function (txn) {
                var encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                if (algosdk.encodeAddress(txn.from.publicKey) !== defaultAddress) return {
                  txn: encodedTxn,
                  signers: []
                };
                return {
                  txn: encodedTxn
                };
              });
              request = utils.formatJsonRpcRequest("algo_signTxn", [txnsToSign]);
              _context2.next = 5;
              return this.connector.sendCustomRequest(request);

            case 5:
              result = _context2.sent;
              return _context2.abrupt("return", result.map(function (element, idx) {
                return element ? {
                  txID: txns[idx].txID(),
                  blob: new Uint8Array(Buffer.from(element, "base64"))
                } : {
                  txID: txns[idx].txID(),
                  blob: new Uint8Array()
                };
              }));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function signTxn(_x2) {
      return _signTxn.apply(this, arguments);
    }

    return signTxn;
  }();

  _proto.sign = /*#__PURE__*/function () {
    var _sign = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(txn) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              throw new Error("Method not implemented." + txn);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function sign(_x3) {
      return _sign.apply(this, arguments);
    }

    return sign;
  }();

  _proto.signBytes = /*#__PURE__*/function () {
    var _signBytes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(b) {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              throw new Error("Method not implemented." + b);

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function signBytes(_x4) {
      return _signBytes.apply(this, arguments);
    }

    return signBytes;
  }();

  _proto.signTeal = /*#__PURE__*/function () {
    var _signTeal = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(teal) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              throw new Error("Method not implemented." + teal);

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function signTeal(_x5) {
      return _signTeal.apply(this, arguments);
    }

    return signTeal;
  }();

  return PeraWallet;
}();

var WalletFactory = /*#__PURE__*/function () {
  function WalletFactory() {}

  WalletFactory.create = function create(network, wallet) {
    var walletMap = {
      "MyAlgoWallet": MyAlgoWallet,
      "AlgoSignerWallet": AlgoSignerWallet,
      "PeraWallet": PeraWallet
    };
    console.log("Creating wallet..");
    return new walletMap[wallet](network);
  };

  return WalletFactory;
}();

function isImplementedWallet(wallet) {
  return wallet !== undefined;
}

var DynamicWallet = /*#__PURE__*/function () {
  function DynamicWallet(network, walletChoice, popupPermissionCallback) {
    if (!network && !(network in Object.keys(exports.Networks).values())) {
      this.network = this.storedNetworkPreference();
    }

    if (network) this.network = network;
    if (walletChoice) this.setStoredWalletChoice(walletChoice);
    this.walletChoice = this.storedWalletPreference();
    if (popupPermissionCallback) this.popupPermissionCallback = popupPermissionCallback; // this.wallet = WalletFactory.createWallet(this.network, this.walletChoice);

    if (!isImplementedWallet(this.walletChoice)) {
      this.walletChoice = exports.Wallets.PeraWallet;
    }

    this.wallet = WalletFactory.create(this.network, this.walletChoice);
    this.popupPermissionCallback = popupPermissionCallback;
    this.wallet.permissionCallback = this.popupPermissionCallback;
    this.wallet.accounts = this.storedAccountList();
    this.wallet.defaultAccount = this.storedAccountPreference();
    console.log(this.wallet);
  }

  var _proto = DynamicWallet.prototype;

  _proto.connect = /*#__PURE__*/function () {
    var _connect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _this = this;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.wallet === undefined)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", false);

            case 2:
              _context.t0 = this.walletChoice;
              _context.next = _context.t0 === exports.Wallets.PeraWallet ? 5 : 8;
              break;

            case 5:
              _context.next = 7;
              return this.wallet.connect(function (acctList) {
                _this.setStoredAccountList(acctList);

                console.log(acctList);
                _this.wallet.defaultAccount = _this.storedAccountPreference();
              });

            case 7:
              return _context.abrupt("return", true);

            case 8:
              _context.next = 10;
              return this.wallet.connect();

            case 10:
              if (!_context.sent) {
                _context.next = 14;
                break;
              }

              this.setStoredAccountList(this.wallet.accounts);
              this.wallet.defaultAccount = this.storedAccountPreference();
              return _context.abrupt("return", true);

            case 14:
              return _context.abrupt("break", 15);

            case 15:
              this.setStoredWalletChoice(this.walletChoice); // Fail

              this.disconnect();
              return _context.abrupt("return", false);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function connect() {
      return _connect.apply(this, arguments);
    }

    return connect;
  }();

  _proto.connected = function connected() {
    return this.wallet !== undefined && this.wallet.isConnected();
  };

  _proto.getSigner = function getSigner() {
    var _this2 = this;

    return function (txnGroup, indexesToSign) {
      if (indexesToSign) {
        txnGroup = txnGroup.filter(function (_txn, index) {
          return !indexesToSign.includes(index);
        });
      }

      return Promise.resolve(_this2.signTxn(txnGroup)).then(function (txns) {
        return txns.map(function (tx) {
          return tx.blob;
        });
      });
    };
  };

  _proto.setStoredAccountList = function setStoredAccountList(accts) {
    localStorage.setItem(exports.StorageKeys.ACCOUNT_LIST, JSON.stringify(accts));
  };

  _proto.storedAccountList = function storedAccountList() {
    var accts = localStorage.getItem(exports.StorageKeys.ACCOUNT_LIST);
    return accts === "" || accts === null ? [] : JSON.parse(accts);
  };

  _proto.setStoredAccountPreference = function setStoredAccountPreference(idx) {
    this.wallet.defaultAccount = idx;
    localStorage.setItem(exports.StorageKeys.ACCOUNT_PREFERENCE, idx.toString());
  };

  _proto.storedAccountPreference = function storedAccountPreference() {
    var idx = localStorage.getItem(exports.StorageKeys.ACCOUNT_PREFERENCE);
    return idx === null || idx === "" ? 0 : parseInt(idx, 10);
  };

  _proto.setStoredWalletChoice = function setStoredWalletChoice(walletChoice) {
    localStorage.setItem(exports.StorageKeys.WALLET_PREFERENCE, walletChoice);
  };

  _proto.storedWalletPreference = function storedWalletPreference() {
    var wp = localStorage.getItem(exports.StorageKeys.WALLET_PREFERENCE);
    return wp === null ? exports.Wallets.DISCONNECTED : wp;
  };

  _proto.setStoredNetworkPreference = function setStoredNetworkPreference(networkChoice) {
    if (!networkChoice) networkChoice = exports.Networks.TestNet;
    localStorage.setItem(exports.StorageKeys.NETWORK_PREFERENCE, networkChoice);
  };

  _proto.storedNetworkPreference = function storedNetworkPreference() {
    var wp = localStorage.getItem(exports.StorageKeys.NETWORK_PREFERENCE);
    return wp === null ? exports.Networks.TestNet : wp;
  };

  _proto.flushLocalStorage = function flushLocalStorage() {
    localStorage.clear();
  };

  _proto.disconnect = function disconnect() {
    if (this.wallet !== undefined) {
      this.wallet.disconnect();
    }

    this.flushLocalStorage();
  };

  _proto.getDefaultAccount = function getDefaultAccount() {
    if (!this.connected()) return "";
    return this.wallet.getDefaultAccount();
  };

  _proto.signTxn = /*#__PURE__*/function () {
    var _signTxn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(txns) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = !this.connected();

              if (!_context2.t0) {
                _context2.next = 5;
                break;
              }

              _context2.next = 4;
              return this.connect();

            case 4:
              _context2.t0 = !_context2.sent;

            case 5:
              if (!_context2.t0) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", []);

            case 7:
              return _context2.abrupt("return", this.wallet.signTxn(txns));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function signTxn(_x) {
      return _signTxn.apply(this, arguments);
    }

    return signTxn;
  }();

  return DynamicWallet;
}();

exports.DynamicWallet = DynamicWallet;
//# sourceMappingURL=vigee-wallet-connector.cjs.development.js.map
