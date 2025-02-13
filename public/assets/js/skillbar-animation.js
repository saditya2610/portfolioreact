// Returns true if the specified element has been scrolled into the viewport.
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = (navigator.userAgent.toLowerCase().indexOf('webkit') !== -1) ? 'body' : 'html';
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    // Pilih semua elemen yang ingin diberi animasi.
    var $elems = $(".Web, .Graphics, .Developing, .Photoshop, .Photography");

    // Lakukan iterasi untuk setiap elemen.
    $elems.each(function() {
        var $elem = $(this);
        if (isElementInViewport($elem)) {
            // Mulai animasi dengan menambahkan class 'start'
            $elem.addClass('start');
        } else {
            // Hapus class 'start' jika elemen tidak berada dalam viewport
            $elem.removeClass('start');
        }
    });
}

// Tangkap event scroll
$(window).scroll(function() {
    checkAnimation();
});

// Panggil fungsi checkAnimation() saat halaman pertama kali dimuat
$(document).ready(function() {
    checkAnimation();
});
