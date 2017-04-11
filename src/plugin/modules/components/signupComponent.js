define([
    'knockout-plus',
    'kb_common/html',
    'kb_common/bootstrapUtils',
    'kb_common/domEvent2',
    'kb_common_ts/Auth2',
    './policyComponent',
    './errorView'
], function(
    ko,
    html,
    BS,
    DomEvent,
    Auth2
) {
    var t = html.tag,
        div = t('div'),
        span = t('span'),
        p = t('p'),
        label = t('label'),
        button = t('button'),
        form = t('form'),
        input = t('input');

    function requiredIcon(fieldName) {
        var result = span({
            class: 'glyphicon',
            dataBind: {
                css: '{"glyphicon-asterisk text-danger": ' + fieldName + '.isValid() === false, "glyphicon-ok text-success":' + fieldName + '.isValid()}'
            },
            style: {
                marginLeft: '4px'
            }
        });
        return result;
    }

    function buildRealnameField() {
        return {
            field: div({
                class: 'form-group'
            }, [
                label({
                    for: 'signup_realname'
                }, ['Your Name', requiredIcon('realname')]),
                input({
                    type: 'text',
                    class: 'form-control',
                    id: 'signup_realname',
                    name: 'realname',
                    autocomplete: 'off',
                    dataBind: {
                        value: 'realname',
                        valueUpdate: '"input"'
                    }
                }),
                div({
                    class: 'alert alert-danger',
                    dataBind: {
                        validationMessage: 'realname'
                    }
                })
            ]),
            info: div({}, [
                div([
                    p([
                        'This field contains your name as you wish it to be displayed to other KBase users ',
                        ' as well as KBase staff.'
                    ])
                ]),
                div({
                    class: 'hidden'
                }, [
                    p([
                        'This name will be displayed to other KBase users until you create your profile. ',
                        'When you create your profile, a new display name will be created which contains ',
                        'additional information, including title, suffix, first and last name. '
                    ]),
                    p([
                        'After you create your profile, that name information will be used for display to ',
                        'other users (when they are logged in), and in Narratives and related data you may publish. ',
                        'When you have a profile, the name shown here ',
                        'on your account will the only be available to KBase staff.'
                    ])
                ])
            ])
        };
    }

    function buildUsernameField() {
        return {
            field: div({
                class: 'form-group'
            }, [
                label({
                    for: 'signup_username'
                }, ['KBase Username', requiredIcon('username')]),
                input({
                    type: 'text',
                    class: 'form-control',
                    id: 'signup_username',
                    name: 'username',
                    dataBind: {
                        value: 'username',
                        valueUpdate: '"input"'
                    }
                }),
                div({
                    class: 'alert alert-danger',
                    dataBind: {
                        validationMessage: 'username'
                    }
                })
            ]),
            info: div(
                [
                    div({}, [
                        p([
                            'Your KBase username is the primary identifier carried with all of your work and assets within ',
                            ' KBase.'
                        ]),
                        p({
                            style: {
                                fontWeight: 'bold'
                            }
                        }, [
                            'Your username is permanent and may not be changed later, so please choose wisely.'
                        ])
                    ]),
                    div({
                        class: 'hidden'
                    }, [
                        p([
                            'Is there anything else to say?',
                        ])
                    ])
                ]
            )
        };
    }

    function buildEmailField() {
        return {
            field: div({
                class: 'form-group'
            }, [
                label({
                    for: 'signup_email'
                }, ['E-Mail', requiredIcon('email')]),
                input({
                    type: 'text',
                    class: 'form-control',
                    id: 'signup_email',
                    name: 'email',
                    dataBind: {
                        value: 'email',
                        valueUpdate: '"input"'
                    }
                }),
                div({
                    class: 'alert alert-danger',
                    dataBind: {
                        validationMessage: 'email'
                    }
                })
            ]),
            info: div(
                [
                    div({}, [
                        p([
                            'KBase may use this email address to communicate important information about KBase or your account.'
                        ])
                    ]),
                    div({
                        class: 'hidden'
                    }, [
                        p([
                            'Is there anything else to say?',
                        ])
                    ])
                ]
            )
        };
    }

    function buildSignupForm() {
        return div({
            dataBind: {
                if: 'signupState() === "incomplete" || signupState() === "complete"'
            }
        }, BS.buildPanel({
            type: 'default',
            title: 'Sign up for KBase',
            body: div({
                // id: vm.form.id
            }, [
                div({
                    class: 'row'
                }, [
                    div({
                        class: 'col-md-12'
                    }, [
                        p([
                            'Some field values have been pre-populated from your ',
                            span({ dataBind: 'text: choice.provider' }),
                            ' account.'
                        ])
                    ])
                ]),
                form({
                    dataElement: 'form',
                    autocomplete: 'off'
                }, [
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-md-5'
                        }, buildRealnameField().field),
                        div({
                            class: 'col-md-7',
                            style: {
                                paddingTop: '20px'
                            }
                        }, buildRealnameField().info)
                    ]),
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-md-5'
                        }, buildEmailField().field),
                        div({
                            class: 'col-md-7',
                            style: {
                                paddingTop: '20px'
                            }
                        }, buildEmailField().info)
                    ]),
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-md-5'
                        }, buildUsernameField().field),
                        div({
                            class: 'col-md-7',
                            style: {
                                paddingTop: '20px'
                            }
                        }, buildUsernameField().info)
                    ]),

                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-md-5'
                        }, div({
                            class: 'form-group'
                        }, [
                            label(['Title / Role', requiredIcon('role')]),
                            input({
                                class: 'form-control',
                                name: 'role',
                                dataBind: {
                                    value: 'role',
                                    valueUpdate: '"input"'
                                }
                            }),
                            div({
                                class: 'alert alert-danger',
                                dataBind: {
                                    validationMessage: 'role'
                                }
                            })
                        ])),
                        div({
                            class: 'col-md-7',
                            style: {
                                paddingTop: '20px'
                            }
                        })
                    ]),
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-md-5'
                        }, div({
                            class: 'form-group'
                        }, [
                            label(['Organization', requiredIcon('organization')]),
                            input({
                                class: 'form-control',
                                name: 'organization',
                                dataBind: {
                                    value: 'organization',
                                    valueUpdate: '"input"'
                                }
                            }),
                            div({
                                class: 'alert alert-danger',
                                dataBind: {
                                    validationMessage: 'organization'
                                }
                            })
                        ])),
                        div({
                            class: 'col-md-7',
                            style: {
                                paddingTop: '20px'
                            }
                        })
                    ]),

                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-md-5'
                        }, div({
                            class: 'form-group'
                        }, [
                            label(['Department', requiredIcon('department')]),
                            input({
                                class: 'form-control',
                                name: 'department',
                                dataBind: {
                                    value: 'department',
                                    valueUpdate: '"input"'
                                }
                            }),
                            div({
                                class: 'alert alert-danger',
                                dataBind: {
                                    validationMessage: 'department'
                                }
                            })
                        ])),
                        div({
                            class: 'col-md-7',
                            style: {
                                paddingTop: '20px'
                            }
                        })
                    ]),
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-md-12'
                        }, [
                            div({
                                dataBind: {
                                    component: {
                                        name: '"policy-resolver"',
                                        params: {
                                            policiesToResolve: 'policiesToResolve'
                                        }
                                    }
                                }
                            })
                        ])
                    ]),
                    div({
                        class: 'row',
                        style: {
                            marginTop: '20px'
                        }
                    }, [
                        div({
                            class: 'col-md-5'
                        }, button({
                            class: 'btn btn-primary',
                            type: 'submit',
                            dataElement: 'submit-button',
                            dataBind: {
                                click: 'submitSignup',
                                disable: '!canSubmit()'
                            }
                        }, 'Create KBase Account')),
                        div({
                            class: 'col-md-7'
                        })
                    ])
                ])
            ])
        }));
    }

    function buildSuccessResponse() {
        return div({
            class: 'row',
            dataBind: {
                if: 'signupState() === "success"'
            },
            style: {
                marginTop: '20px'
            }
        }, [
            BS.buildPanel({
                type: 'success',
                title: 'KBase Account Successfuly Created',
                body: div([
                    p('Your new KBase account has been created and is ready to be used.'),
                    div([
                        button({
                            class: 'btn btn-primary',
                            dataBind: {
                                click: 'doSignupSuccess'
                            }
                        }, 'Continue to Destination')
                    ])
                ])
            })
        ]);
    }

    function buildErrorResponse() {
        return div({
            class: 'row',
            dataBind: {
                if: 'signupState() === "error"'
            },
            style: {
                marginTop: '20px'
            }
        }, [
            BS.buildPanel({
                type: 'error',
                title: 'Auth Error',
                body: div({
                    dataBind: {
                        component: {
                            name: '"error-view"',
                            params: {
                                code: 'error.code',
                                message: 'error.message',
                                detail: 'error.detail',
                                data: 'error.data'
                            }
                        }
                    }
                })
            })
        ]);
    }

    function template() {
        return div({
            dataBind: {
                validationOptions: {
                    insertMessages: 'false'
                }
            }
        }, [
            div({
                name: 'error'
            }),
            buildSuccessResponse(),
            buildErrorResponse(),
            buildSignupForm()
        ]);
    }

    function doSubmitSignup(runtime, create, realName, username, email, policiesToResolve) {
        var agreementsToSubmit = [];
        // missing policies
        policiesToResolve.missing.forEach(function(policy) {
            if (!policy.agreed()) {
                throw new Error('Cannot submit with missing policies not agreed to');
            }
            agreementsToSubmit.push({
                id: policy.id,
                version: policy.version
            });
        });
        // outdated policies.
        policiesToResolve.outdated.forEach(function(policy) {
            if (!policy.agreed()) {
                throw new Error('Cannot submit with missing policies not agreed to');
            }
            // agreementsToSubmit.push([policy.id, policy.version].join('.'));
            agreementsToSubmit.push({
                id: policy.id,
                version: policy.version
            });
        });

        var data = {
            id: create.id,
            user: username,
            display: realName,
            email: email,
            linkall: false,
            policy_ids: agreementsToSubmit.map(function(a) {
                return [a.id, a.version].join('.');
            })
        };

        return runtime.service('session').getClient().loginCreate(data);
    }

    function component() {
        return {
            viewModel: function(params) {
                var choice = params.choice;
                var create = choice.create[0];
                var runtime = params.runtime;
                var nextRequest = params.nextRequest;

                // SIGNUP FORM

                var realname = ko.observable(create.prov_fullname).extend({
                    required: true,
                    minLength: 2,
                    maxLength: 100
                });
                ko.validation.rules['usernameStartsWithLetter'] = {
                    validator: function(val) {
                        if (!/^[a-zA-Z]/.test(val)) {
                            return false;
                        }
                        return true;
                    },
                    message: 'A username must start with an alphabetic letter'
                };
                ko.validation.rules['usernameNoSpaces'] = {
                    validator: function(val) {
                        if (/\s/.test(val)) {
                            return false;
                        }
                        return true;
                    },
                    message: 'A username must not contain spaces'
                };
                ko.validation.rules['usernameValidChars'] = {
                    validator: function(val) {
                        if (!/^[a-z0-9_]+$/.test(val)) {
                            return false;
                        }
                        return true;
                    },
                    message: 'A username may only contain the characters a-z, 0-0, and _.'
                };
                ko.validation.rules['usernameMustBeUnique'] = {
                    async: true,
                    validator: function(val, params, callback) {
                        runtime.service('session').getClient().loginUsernameSuggest(username())
                            .then(function(results) {
                                if (results.name !== username()) {
                                    callback({
                                        isValid: results.available,
                                        message: 'This username is not available: a suggested available username is ' + results.name
                                    });
                                } else {
                                    callback({
                                        isValid: true
                                    });
                                }
                            })
                            .catch(function(err) {
                                console.error('err', err);
                                callback({
                                    isValid: false,
                                    message: 'Error checking for username: ' + err.message
                                });
                            });
                    },
                    message: 'This username is already taken'
                };
                ko.validation.registerExtenders();

                var username = ko.observable().extend({
                    required: true,
                    minLength: 2,
                    maxLength: 100,
                    usernameStartsWithLetter: true,
                    usernameNoSpaces: true,
                    usernameValidChars: true,
                    usernameMustBeUnique: true
                });
                var email = ko.observable(create.prov_email).extend({
                    required: true,
                    email: true
                });

                var role = ko.observable().extend({
                    required: true
                });
                var organization = ko.observable().extend({
                    required: true
                });
                var department = ko.observable().extend({
                    required: true
                });

                var allValid = ko.pureComputed(function() {
                    var valid = (realname.isValid() &&
                        email.isValid() &&
                        username.isValid() &&
                        role.isValid() &&
                        organization.isValid() &&
                        department.isValid());
                    return valid;
                });

                var error = {
                    code: ko.observable(),
                    message: ko.observable(),
                    detail: ko.observable(),
                    data: ko.observable()
                };


                var canSubmit = ko.pureComputed(function() {
                    if (!allValid()) {
                        return false;
                    }

                    if (policiesToResolve.missing.some(function(item) {
                            return !item.agreed();
                        }) || policiesToResolve.outdated.some(function(item) {
                            return !item.agreed();
                        })) {
                        return false;
                    }
                    return true;
                });

                canSubmit.subscribe(function(newCanSubmit) {
                    if (newCanSubmit) {
                        signupState('complete');
                    } else {
                        signupState('incomplete');
                    }
                });

                var signupState = params.signupState;
                signupState('incomplete');

                function submitSignup() {
                    // validateAll();
                    doSubmitSignup(runtime, create, realname(), username(), email(), policiesToResolve)
                        .then(function(response) {
                            signupState('success');
                        })
                        .catch(Auth2.AuthError, function(err) {
                            console.log('auth error', err);
                            error.code(err.code);
                            error.message(err.message);
                            error.detail(err.detail);
                            error.data(err.data);
                            signupState('error');
                        })
                        .catch(function(err) {
                            console.log('error', err);
                            signupState('error');
                            error.code(err.name);
                            error.message(err.message);
                        });
                }

                function doSignupSuccess() {
                    // var nextRequest = vm.get('stateParams').value.nextrequest;
                    if (nextRequest) {
                        try {
                            // var navigateRequest = JSON.parse(nextRequest);
                            runtime.send('app', 'navigate', nextRequest);
                        } catch (ex) {
                            console.error('ERROR parsing next request', nextRequest, ex);
                            runtime.send('app', 'navigate', '');
                        }
                    } else {
                        runtime.send('app', 'navigate', '');
                    }
                }

                // var validationStatus = ko.computed(function(fieldName) {
                //     var fields = {
                //         username: username,
                //         realname: realname,
                //         role: role
                //     };
                //     var field = fields[fieldName];
                //     console.log('valid?', fieldName, field);
                //     if (!field) {
                //         return;
                //     }
                //     if (field.isValid()) {
                //         return 'fa-check';
                //     } else {
                //         return 'fa-asterisk';
                //     }
                // }, { writable: true });

                // POLICY AGREMENTS
                // The interface to the policy agreement component is ...
                // Well, let's see.

                // make policy resolution structure.

                var policiesToResolve = {
                    missing: params.policiesToResolve.missing.map(function(item) {
                        return {
                            id: item.id,
                            version: item.version,
                            policy: item.policy,
                            viewPolicy: ko.observable(false),
                            agreed: ko.observable(false)
                        };
                    }),
                    outdated: params.policiesToResolve.outdated.map(function(item) {
                        return {
                            id: item.id,
                            version: item.version,
                            policy: item.policy,
                            agreement: item.agreement,
                            viewPolicy: ko.observable(false),
                            agreed: ko.observable(false)
                        };
                    })
                };

                return {
                    choice: choice,
                    create: create,
                    username: username,
                    realname: realname,
                    email: email,
                    role: role,
                    organization: organization,
                    department: department,
                    policiesToResolve: policiesToResolve,
                    error: error,

                    signupState: params.signupState,

                    canSubmit: canSubmit,
                    submitSignup: submitSignup,
                    doSignupSuccess: doSignupSuccess
                        // validationStatus: validationStatus
                };
            },
            template: template()
        };
    }
    ko.components.register('signup-form', component());
});