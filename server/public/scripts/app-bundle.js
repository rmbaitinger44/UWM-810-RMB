define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],

        moduleId: './modules/home',

        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
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
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";

      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.user);
                _context.next = 3;
                return this.users.save(this.user);

              case 3:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', '../resources/data/todos', 'aurelia-auth', 'aurelia-router'], function (exports, _aureliaFramework, _todos, _aureliaAuth, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.List = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
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
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _todos.ToDos, _aureliaAuth.AuthService), _dec(_class = function () {
		function List(router, todos, auth) {
			_classCallCheck(this, List);

			this.router = router;
			this.message = 'List';
			this.auth = auth;
			this.todos = todos;
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.showList = true;
			this.showCompleted = false;
			this.priorities = ['Low', 'Medium', 'High', 'Critical'];
		}

		List.prototype.activate = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.todos.getUserTodos(this.user._id);

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function activate() {
				return _ref.apply(this, arguments);
			}

			return activate;
		}();

		List.prototype.back = function back() {
			this.showList = true;
		};

		List.prototype.createTodo = function createTodo() {
			this.todoObj = {
				todo: "",
				description: "",
				dateDue: new Date(),
				userId: this.user._id,
				priority: this.priorities[0]
			};
			this.showList = false;
		};

		List.prototype.saveTodo = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var response, todoId;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!this.todoObj) {
									_context2.next = 14;
									break;
								}

								_context2.next = 3;
								return this.todos.save(this.todoObj);

							case 3:
								response = _context2.sent;

								if (!response.error) {
									_context2.next = 8;
									break;
								}

								alert("There was an error creating the ToDo");
								_context2.next = 14;
								break;

							case 8:
								todoId = response._id;

								if (!(this.filesToUpload && this.filesToUpload.length)) {
									_context2.next = 13;
									break;
								}

								_context2.next = 12;
								return this.todos.uploadFile(this.filesToUpload, this.user._id, todoId);

							case 12:
								this.filesToUpload = [];

							case 13:
								this.showList = true;

							case 14:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveTodo() {
				return _ref2.apply(this, arguments);
			}

			return saveTodo;
		}();

		List.prototype.editTodo = function editTodo(todo) {
			this.todoObj = todo;
			this.showList = false;
		};

		List.prototype.deleteTodo = function deleteTodo(todo) {
			this.todos.deleteTodo(todo._id);
		};

		List.prototype.completeTodo = function completeTodo(todo) {
			todo.completed = !todo.completed;
			this.todoObj = todo;
			this.saveTodo();
		};

		List.prototype.toggleShowCompleted = function toggleShowCompleted() {
			this.showCompleted = !this.showCompleted;
		};

		List.prototype.changeFiles = function changeFiles() {
			this.filesToUpload = new Array();
			this.filesToUpload.push(this.files[0]);
		};

		List.prototype.removeFile = function removeFile(index) {
			this.filesToUpload.splice(index, 1);
		};

		List.prototype.logout = function logout() {
			sessionStorage.removeItem('user');
			this.auth.logout();
		};

		return List;
	}()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {

    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;

			this.BASE_URL = "http://localhost:5000/api/";

			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/todos',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ToDos = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
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
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ToDos = exports.ToDos = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function ToDos(data) {
            _classCallCheck(this, ToDos);

            this.data = data;
            this.TODO_SERVICE = 'todos';
            this.todosArray = [];
        }

        ToDos.prototype.getUserTodos = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.TODO_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.todosArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserTodos(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserTodos;
        }();

        ToDos.prototype.deleteTodo = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.delete(this.TODO_SERVICE + "/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.todosArray.length; i++) {
                                        if (this.todosArray[i]._id === id) {
                                            this.todosArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function deleteTodo(_x2) {
                return _ref2.apply(this, arguments);
            }

            return deleteTodo;
        }();

        ToDos.prototype.uploadFile = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, userId, todoId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });
                                _context3.next = 4;
                                return this.data.uploadFiles(formData, this.TODO_SERVICE + "/upload/" + userId + "/" + todoId);

                            case 4:
                                response = _context3.sent;
                                return _context3.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function uploadFile(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return uploadFile;
        }();

        ToDos.prototype.save = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(todo) {
                var serverResponse, response;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!todo) {
                                    _context4.next = 14;
                                    break;
                                }

                                if (todo._id) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 4;
                                return this.data.post(todo, this.TODO_SERVICE);

                            case 4:
                                serverResponse = _context4.sent;

                                if (!serverResponse.error) {
                                    this.todosArray.push(serverResponse);
                                }
                                return _context4.abrupt('return', serverResponse);

                            case 9:
                                _context4.next = 11;
                                return this.data.put(todo, this.TODO_SERVICE + "/" + todo._id);

                            case 11:
                                response = _context4.sent;

                                if (!response.error) {}
                                return _context4.abrupt('return', response);

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function save(_x6) {
                return _ref4.apply(this, arguments);
            }

            return save;
        }();

        return ToDos;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
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
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CompletedValueConverter = exports.CompletedValueConverter = function () {
        function CompletedValueConverter() {
            _classCallCheck(this, CompletedValueConverter);
        }

        CompletedValueConverter.prototype.toView = function toView(array, value) {
            if (!value) {
                return array.filter(function (item) {
                    return !item.completed;
                });
            } else {
                return array;
            }
        };

        return CompletedValueConverter;
    }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DateFormatValueConverter = undefined;

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
		function DateFormatValueConverter() {
			_classCallCheck(this, DateFormatValueConverter);
		}

		DateFormatValueConverter.prototype.toView = function toView(value) {
			if (value === undefined || value === null) {
				return;
			}

			return (0, _moment2.default)(value).format('MMM Do YYYY');
		};

		return DateFormatValueConverter;
	}();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ""; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template>    <h1>${message}</h1>    <compose show.bind=\"showList\" view=\"./components/todoList.html\"></compose>    <compose show.bind=\"!showList\" view=\"./components/todoForm.html\"></compose></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><div class=\"card\"><div class=\"card-body\"><label>ToDos</label></div></div><div class=\"card\"><div class=\"card-body\">    <label for=\"email\">Email</label>     <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\">    <label for=\"password\">Password</label>     <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div></div><div class=\"card\"><div class=\"card-body\"><button click.trigger=\"login()\">Login</button>        <button click.trigger=\"showRegister()\">Register</button></div></div><template></template></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><div class=\"form-group 1\" ; text-align: justify>  First Name: <input value.bind=\"user.firstName\"></div><div class=\"form-group 2\" ; text-align: justify> Last Name: <input value.bind=\"user.lastName\"></div><div class=\"form-group 3\" ; text-align: justify> Email: <input value.bind=\"user.email\"></div><div class=\"form-group 4\" ; text-align: justify> Password: <input value.bind=\"user.password\"></div>     <button click.trigger=\"save()\">Save</button></template>"; });
define('text!modules/components/todoForm.html', ['module'], function(module) { module.exports = "<template><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group\"><input value.bind=\"todoObj.todo\" type=\"text\" class=\"form-control\" id=\"todoInput\" aria-describedby=\"todoHelp\" placeholder=\"Enter ToDo\"> <small id=\"todoHelp\" class=\"form-text text-muted\">Enter a name for your Todo.</small></div>        <div class=\"form-group\">            <textarea value.bind=\"todoObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Description\"></textarea>             <small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if desired.</small>         </div><div class=\"form-group\">            <label for=\"priorityInput\">Priority</label>            <select value.bind=\"todoObj.priority\" class=\"form-control\" id=\"exampleFormControlSelect2\">                <option repeat.for=\"priority of priorities\" value.bind=\"priority\"> ${priority}</option>            </select>             <small id=\"priorityHelp\" class=\"form-text text-muted\">How urgent is this?</small>         </div>                <div class=\"form-group\">            <label for=\"dueDateInput\">Due Date *</label>            <input type=\"date\" class=\"form-control\" value.bind=\"todoObj.dateDue\">             <small id=\"dueDateHelp\" class=\"form-text text-muted\">The date the ToDo is due.</small>         </div>          <button click.trigger=\"saveTodo()\" class=\"btn btn-primary topMargin\">Save</button><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for files&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload any files that will be useful.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div>    </form></template>"; });
define('text!modules/components/todoList.html', ['module'], function(module) { module.exports = "<template>    <div class=\"card topMargin\">        <div class=\"card-body\"><div class=\"row\">                <span class=\"col\">                    <span class=\"leftMargin pull-left\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span>                     <span class=\"leftMargin pull-left\"><i click.trigger=\"createTodo()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span>                 </span>            </div><div class=\"row\">            <label class=\"form-check-label\">                <input change.trigger=\"toggleShowCompleted()\" type=\"checkbox\" class=\"form-check-input\">              Show completed             </label></div>            <div show.bind=\"todos.todosArray.length\"><table class=\"table\"><thead><tr><th>ToDo</th><th>Due Date</th><th>Priority</th><th>Edit</th><th>File</th></tr></thead><tbody><tr class=\"${todo.priority === 'Critical' ? 'table-secondary' : ' '} \" repeat.for=\"todo of todos.todosArray|completed:showCompleted\"><td>${todo.todo}</td><td>${todo.dateDue|dateFormat}</td><td>${todo.priority}</td><td>            <i click.trigger=\"editTodo(todo)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i>     <i click.trigger=\"deleteTodo(todo)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i>     <i show.bind=\"!todo.completed\" click.trigger=\"completeTodo(todo)\" class=\"fa fa-square-o\" aria-hidden=\"true\"></i>     <i show.bind=\"todo.completed \" click.trigger=\"completeTodo(todo)\" class=\"fa fa-check\" aria-hidden=\"true \"></i></td><td><a href=\"http://localhost:5000/uploads/${user._id}/${todo.file.filename}\" target=\"_blank\">${todo.file.originalName}</a></td></tr></tbody></table></div><div show.bind=\"!todos.todosArray.length\"><h2>Apparently, you don't have anything to do!</h2></div>    </div>    </div></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map