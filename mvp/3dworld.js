$(function(){
    var viewport = new Viewport(document.body);
    var world = new World(viewport);

    var mouseX = 0;
    var mouseY = 0;

    var searchedOnce = false;

    document.addEventListener("mousemove", function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    }, false);

    window.inputHolder = new Plane('transparent', 10, 10, 0, 0, 0, 0, 0, 0) ;
    world.addPlane(window.inputHolder);

    $(inputHolder.node).html('<input id="search" autocomplete="off" type="text" placeholder="Search the world..." />');

    $('#search')
        .focus()
        .bind('keydown', function(e){
            var input = $(this);

            if (e.keyCode === 13) {
                executeSearch(input.val());
            }

            setTimeout(function(){

                var ammount = Math.min((input.val().length - 10) * 2, 20);

                inputHolder.animator.animate({
                    props1: { 'rotation.y': 0 },
                    props2: { 'rotation.y': ammount },
                    props3: { 'rotation.y': 0 }
                });

            }, 10);
        })
        .mousedown(function(e){
            var x = e.pageX - $(this).offset().left,
                y = e.pageY - $(this).offset().top,
                w = $(this).outerWidth(),
                h = $(this).outerHeight(),
                ry = ((x - (w / 2)) / (w / 2)) * 15,
                rx = -1 * (((y - (h / 2)) / (h / 2)) * 15),
                tz = -35
            ;

            inputHolder.animator.animate({
                props1: { 'position.z': 0 },
                props2: { 'position.z': tz },
                props3: { 'position.z': 0 }
            });

            inputHolder.animator.animate({
                props1: { 'rotation.y': 0 },
                props2: { 'rotation.y': ry },
                props3: { 'rotation.y': 0 }
            });

            inputHolder.animator.animate({
                props1: { 'rotation.x': 0 },
                props2: { 'rotation.x': rx },
                props3: { 'rotation.x': 0 }
            });

        })
    ;

    var moveBackAnimationY, moveBackAnimationZ;

    var searchAnimationOnce = function() {
        var moveUpAmmount = -1 * $(window).height() / 2.5;

        moveBackAnimationZ = inputHolder.animator.animate({
            killOnComplete: false,
            durationIn: 2000,
            easingIn: 'easeOutExpo',
            durationOut: 0,
            props1: { 'position.z': 0 },
            props2: { 'position.z': -200 },
            props3: { 'position.z': -200 }
        });

        moveBackAnimationY = inputHolder.animator.animate({
            killOnComplete: false,
            durationIn: 2000,
            easingIn: 'easeOutExpo',
            durationOut: 0,
            props1: { 'position.y': 0 },
            props2: { 'position.y': moveUpAmmount },
            props3: { 'position.y': moveUpAmmount }
        });

        inputHolder.animator.animate({
            durationIn: 300,
            durationOut: 1000,
            easingIn: 'easeOutExpo',
            easingOut: 'linear',
            props1: { 'rotation.x': 0 },
            props2: { 'rotation.x': 60 },
            props3: { 'rotation.x': 0 }
        });
    };

    var results = [
        '1. Tattooed lo-fi consequat terry richardson, cliche umami aesthetic.',
        '2. Banksy organic dolore, flexitarian post-ironic vegan esse fixie.',
        '3. Bespoke aute id, elit enim small batch umami pickled bushwick.',
        '4. Nostrud aliquip irony commodo bespoke carles.',
        '5. Pitchfork twee id seitan, butcher photo booth exercitation.',
        '6. Deserunt accusamus next level hella proident.',
        '7. Wes anderson bushwick sed retro, reprehenderit velit laboris PBR.',
        '8. Ennui carles veniam pitchfork blog dreamcatcher.',
        '9. Minim sriracha elit bushwick VHS.'
    ];

    window.resultHolders = [];

    var resultsFlutterInterval;

    var executeSearch = function(query) {
        if (!searchedOnce) {
            searchedOnce = true;
            searchAnimationOnce();
            setTimeout(function(){
                executeSearch(query);
            }, 100);
            return;
        }

        var delay = 0;

        //TODO - do something with query !!!!
        var moveUpAmmount = -1 * $(window).height() / 2.5 + 200;

        if (resultsFlutterInterval) {
            delay = 3000;

            window.clearInterval(resultsFlutterInterval);

            $.each(resultHolders, function(i, holder){
                setTimeout(function(){
                    $(holder.node).animate({ opacity: 0 }, 500);

                    holder.animator.animate({
                        durationIn: 400,
                        durationOut: 100,
                        easingIn: 'easeOutExpo',
                        props1: { 'position.x': 0 },
                        props2: { 'position.x': -800 },
                        props3: { 'position.x': -800 }
                    });

                    setTimeout(function(){
                        $(holder.node).remove();
                        resultHolders.splice(i, 1);
                    }, 600);
                }, (i * 150));
            });
        }

        setTimeout(function(){
            $.each(results, function(i, result){
                console.log(i);
                var resultHolder = new Plane('transparent', 10, 10, 0, (i * 130) + moveUpAmmount, 1000, 0, 0, 0);
                resultHolders.push(resultHolder);
                world.addPlane(resultHolder);
                $(resultHolder.node).html('<div class="result">' + result + '</div>');
                setTimeout(function(){
                    $(resultHolder.node)
                        .find('.result')
                            .data('asset', resultHolder)
                            .mousedown(function(e){
                                var x = e.pageX - $(this).offset().left,
                                    y = e.pageY - $(this).offset().top,
                                    w = $(this).outerWidth(),
                                    h = $(this).outerHeight(),
                                    ry = ((x - (w / 2)) / (w / 2)) * 15,
                                    rx = -1 * (((y - (h / 2)) / (h / 2)) * 15),
                                    tz = -35,
                                    animator = $(this).data('asset').animator
                                ;

                                animator.animate({
                                    props1: { 'position.z': 0 },
                                    props2: { 'position.z': tz },
                                    props3: { 'position.z': 0 }
                                });

                                animator.animate({
                                    props1: { 'rotation.y': 0 },
                                    props2: { 'rotation.y': ry },
                                    props3: { 'rotation.y': 0 }
                                });

                                animator.animate({
                                    props1: { 'rotation.x': 0 },
                                    props2: { 'rotation.x': rx },
                                    props3: { 'rotation.x': 0 }
                                });
                            })
                    ;
                }, 0);
                (new Animator(resultHolder));
                setTimeout(function(){
                    resultHolder.animator.animate({
                        killOnComplete: false,
                        durationIn: 2000,
                        easingIn: 'easeOutExpo',
                        durationOut: 0,
                        props1: { 'position.z': 0 },
                        props2: { 'position.z': -200 },
                        props3: { 'position.z': -200 }
                    });

                    resultHolder.animator.animate({
                        killOnComplete: false,
                        durationIn: 2000,
                        easingIn: 'easeOutExpo',
                        durationOut: 0,
                        props1: { 'rotation.y': 85 },
                        props2: { 'rotation.y': 0 },
                        props3: { 'rotation.y': 0 }
                    });
                }, (150 * i) + 300);
            });

            resultsFlutterInterval = window.setInterval(function(){
                $.each(resultHolders, function(i, holder){
                    setTimeout(function(){
                        holder.animator.animate({
                            durationIn: 200,
                            durationOut: 600,
                            props1: { 'position.z': 0 },
                            props2: { 'position.z': 10 },
                            props3: { 'position.z': 0 }
                        });

                        holder.animator.animate({
                            durationIn: 200,
                            durationOut: 500,
                            props1: { 'rotation.x': 0 },
                            props2: { 'rotation.x': -25 },
                            props3: { 'rotation.x': 0 }
                        });

                        holder.animator.animate({
                            durationIn: 400,
                            durationOut: 500,
                            props1: { 'rotation.x': 0 },
                            props2: { 'rotation.x': 18 },
                            props3: { 'rotation.x': 0 }
                        });
                    }, (150 * i) + 300);
                });
            }, 10000);
        }, delay);
    };

    var Animator = function(asset) {
        this.init(asset);
    };

    Animator.prototype.init = function(asset) {
        var a = this;

        a.anim_id = -1;
        a.asset = asset;
        a.animations = {};
        asset.animator = a;
    };

    Animator.prototype.animate = function(options) {
        var a = this;

        a.anim_id += 1;

        var id = this.anim_id,
            o = $.extend({}, {
                durationIn: 200,
                durationOut: 600,
                easingIn: 'easeOutQuart',
                easingOut: 'easeOutQuart',
                killOnComplete: true
            }, options),
            propsA = {}
        ;

        a.animations[id] = {};

        //CHECK OUT JQUERY DEFERRED

        $(o.props1)
            .stop()
            .animate(o.props2, {
                duration: o.durationIn,
                easing: o.easingIn,
                step: function(now, fx) {
                    a.animations[id][fx.prop] = now;
                },
                complete: function() {
                    $(o.props2)
                        .stop()
                        .animate(o.props3, {
                            duration: o.durationOut,
                            easing: o.easingOut,
                            step: function(now, fx) {
                                a.animations[id][fx.prop] = now;
                            },
                            complete: function() {
                                if (o.killOnComplete) {
                                    delete a.animations[id];
                                }
                            }
                        })
                    ;
                }
            })
        ;

        return id;
    };

    Animator.prototype.update = function() {
        var a = this, i, animations, j, property, value, totals = {}, prop_split;

        for (i in this.animations) {
            animations = this.animations[i];
            for (property in animations) {
                value = animations[property];
                if (totals[property]) {
                    totals[property] += value;
                } else {
                    totals[property] = value;
                }
            }
        }

        for (property in totals) {
            //console.log(totals);
            value = totals[property];
            // TODO - fix this hack!!!!
            prop_split = property.split('.');
            if (prop_split.length !== 2) {
                return;
            }
            this.asset[prop_split[0]][prop_split[1]] = value;
        }

        this.asset.update();
    };

    var AnimatorHelpers = {};

    AnimatorHelpers.wobble = function(asset, property, duration, ammount, minimum) {
        var wobbley = 0;

        setTimeout(function(){
            setInterval(function(){

                var new_wobbley = (((ammount - minimum) * Math.random()) + minimum) * (Math.random() > 0.5 ? -1: 1),
                    props1 = {},
                    props2 = {},
                    props3 = {}
                ;

                props1[property] = wobbley;
                props2[property] = new_wobbley;
                props3[property] = wobbley;

                asset.animator.animate({
                    props1: props1,
                    durationIn: duration,
                    props2: props2,
                    durationOut: duration,
                    props3: props3
                });

                wobbleY = new_wobbley;

            }, (duration * 2) + 100);
        }, Math.random() * ((duration * 2) + 100));
    };

    var inputHolderAnimator = new Animator(inputHolder);

    AnimatorHelpers.wobble(inputHolder, 'position.x', 4000, 15, 2);
    AnimatorHelpers.wobble(inputHolder, 'position.y', 4000, 15, 2);
    AnimatorHelpers.wobble(inputHolder, 'position.z', 4000, 15, 2);
    AnimatorHelpers.wobble(inputHolder, 'rotation.x', 4000, 7, 0);
    AnimatorHelpers.wobble(inputHolder, 'rotation.y', 4000, 7, 0);
    AnimatorHelpers.wobble(inputHolder, 'rotation.z', 4000, 7, 0);

    // Game Loop

    (function(){
        inputHolder.animator.update();

        $.each(resultHolders, function(i, holder){
            if (!window.stopHolderUpdate) {
                holder.animator.update();
            }
        });

        if (searchedOnce) {
            var mouseDiff = ($(window).height() / 2) - mouseY;
            if (mouseDiff > 150 || mouseDiff < -150) {
                viewport.camera.position.y += ((($(window).height() / 2) - mouseY) * 0.03) ^ 2;
            }
            viewport.camera.position.x += (($(window).width() / 2) - mouseX) * 0.01;
            viewport.camera.rotation.y = (($(window).width() / 2) - mouseX) * -0.05;

            viewport.camera.position.x = Math.min(Math.max(viewport.camera.position.x, -100), 100);
            viewport.camera.position.y = Math.min(Math.max(viewport.camera.position.y, -1100), 10);
            viewport.camera.rotation.y = Math.min(Math.max(viewport.camera.rotation.y, -5), 5);
        }

        viewport.camera.update();

        setTimeout( arguments.callee, 15);
    })();

});