window.addEventListener('load', function() {
    function addListener(callback) {
        var 
            timer = null,
            requestAnimationFrame = window.requestAnimationFrame 
                || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame,
            cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

        function lintener() {
            cancelAnimationFrame(timer);

            timer = requestAnimationFrame(callback.bind(null, function() {
                document.removeEventListener('scroll', lintener);
            }));
        }

        document.addEventListener('scroll', lintener);

        lintener();
    }

    window._skappPostAnimation = function() {
        var posts = document.querySelectorAll('article.page__mini-article');
        
        posts.forEach(function(post) {
            if (post.parentElement.parentElement.classList.contains('js-hidden')) return;

            var position = getPosition(post);

            var pack = new Pack(post);

            pack
                .base('js-ease-out-leave-active')
                .base('js-ease-out-leave')
                .transfrom('js-ease-out-enter-active')
                .end(function() {
                    var arr = ['js-ease-out-enter', 'js-ease-out-enter-active', 'js-ease-out-leave', 'js-ease-out-leave-active'];

                    arr.forEach(function(item) {
                        post.classList.remove(item);
                    });
                })

            addListener(function(remove) {
                var diff = position.y - window.scrollY - document.documentElement.clientHeight;

                if (diff < 50) {
                    remove();

                    pack.toggle();
                }
            });
        });
    }

    window._skappPostAnimation();
});

setTimeout(function() {
    var $window = $(window);
    var interval = setInterval(function() {
        if (typeof $window.hashchange === 'function') {
            /* 绑定事件*/
            $window.hashchange(function () {
                var target = $(decodeURI(location.hash));
                if (target.length == 1) {
                    var top = target.offset().top - 60;
                    if (top > 0) {
                        $('html,body').animate({ scrollTop: top }, 500);
                    }
                }
            });
            /* 触发事件 */
            $window.hashchange();
            clearInterval(interval);
        }
    }, 100);
}, 50);