$(function () {
    let typingTimer;

    $('body').on('click', '.swiper-slide.tab', function (e) {
        e.preventDefault();

    });


    $("body").on("blur", ".validate_text", function () {
        var field = $(this), field_val = field.val(), name = field.attr('name');
        field.attr('class', 'form_control validate_text');
        field.next(".error_text").remove();
        if (field_val.length === 0) {
            field.addClass('error_input');
            field.after('<div class="error_text">' + order.makeLabel(name) + ' is required.</div>');
        } else {
            field.addClass('success_input');
        }
    });

    $("body").on("blur", ".validate_number", function () {
        var field = $(this), field_val = field.val();
        var mobilePattern = /^[6-9]\d{9}$/;
        field.attr('class', 'form_control validate_number');
        field.next(".error_text").remove();
        if (field_val.length === 0) {
            field.addClass('error_input');
            field.after('<div class="error_text">Mobile number is required.</div>');
        } else if (!mobilePattern.test(field_val)) {
            field.addClass('error_input');
            field.after('<div class="error_text">Please fill vaild mobile number</div>');
        } else {
            field.addClass('success_input');
        }
    });

    $("body").on("blur", ".validate_email", function () {
        var field = $(this), field_val = field.val();
        var email_Reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        field.attr('class', 'form_control validate_email');
        field.next(".error_text").remove();
        if (field_val.length === 0) {
            field.addClass('error_input');
            field.after('<div class="error_text">Email is required.</div>');
        } else if (!email_Reg.test(field_val)) {
            field.addClass('error_input');
            field.after('<div class="error_text">Please fill vaild email</div>');
        } else {
            field.addClass('success_input');
        }
    });


    $("body").on("change", ".validate_select", function () {
        var field = $(this), field_val = field.val();
        field.attr('class', 'form_control validate_select form_state_delivery');
        field.next(".error_text").remove();
        if (field_val.length === 0) {
            field.addClass('error_input');
            field.after('<div class="error_text">State is required.</div>');
        } else {
            field.addClass('success_input');
        }
    });

    $('body').on('click', '.list_view, .grid_view', function (e) {
        e.preventDefault();
        var el = $(this);
        el.closest('.product_cat_filter_right').find('a').removeClass('active');
        el.addClass('active');
        $('.product_list').toggleClass('list');
    });

    $('body').on('input change', '.search_box, .product_filter', function (e) {
        e.preventDefault();
        clearTimeout(typingTimer);

        typingTimer = setTimeout(function () {
            order.getProducts(); // ✅ called after typing stops
        }, 500);
    });

    $('body').on('click', '.cat_tab', function (e) {
        e.preventDefault();
        var el = $(this);
        $('.cat_tab').removeClass('active');
        el.addClass('active');
        order.getProducts();
    });

    $('body').on('click', '.product_button.add', function (e) {
        e.preventDefault();
        var el = $(this);
        order.addQuantity(el, 'add');
    });

    $('body').on('click', '.place_order', function (e) {
        e.preventDefault();
        order.placeOrder();
    });

    $('body').on('click', '.product_quantity', function (e) {
        e.preventDefault();
        var el = $(this);
        order.addQuantity(el, el.attr('data-type'));
    });

    $('body').on('input', '.qty_input', function (e) {
        e.preventDefault();
        var el = $(this);
        order.addQuantity(el, 'quantity');
    });

    $('body').on('click', '.delete_item', function (e) {
        e.preventDefault();
        var el = $(this), id = el.attr('data-id');
        order.deleteCartItems(id);
    });

    $('body').on('click', '.promation_code', function (e) {
        e.preventDefault();
        var el = $(this), form = el.next('.coupon_code_form');
        if (form.is(":visible")) {
            form.slideUp();
        } else {
            form.css("display", "flex").hide().slideDown();
        }
    });

    $('body').on('submit', '.coupon_code_form', async function (e) {
        e.preventDefault();
        var el = $(this);
        const response = await fetch(order.API_URL + '/get-coupon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: el.serialize()
        });
        const result = await response.json();
        if (result?.status) {
            Swal.fire({
                title: 'Coupon Code Applied Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if (res.isConfirmed) {
                    let grandTotal = order.cart.reduce((sum, item) => sum + item.total_price, 0);
                    let percentage = result.data.discount,
                        discountAmount = ((grandTotal * percentage) / 100);
                    order.promotion_discount = discountAmount;
                    order.promotion_discount_id = result.data.id;
                    order.getCartSummary();
                }
            })
        } else {
            Swal.fire({
                title: 'Invalid Code! - No Discount',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    });

    $('body').on('click', '.confirm_order', function (e) {
        e.preventDefault();
        var el = $('.customer_details');
        el.find('.validate_text').blur();
        el.find('.validate_email').blur();
        el.find('.validate_number').blur();
        el.find('.validate_select').change();
        if (el.find('.error_input').length === 0) {
            order.confirmOrder(el);
        } else {
            var firstError = el.find('.error_input').first();
            $('html, body').animate({
                scrollTop: firstError.offset().top - 100
            }, 600);
            firstError.focus();
        }
    });

    $('body').on('change', '.form_state_delivery', function (e) {
        e.preventDefault();
        var el = $(this), selectedVal = el.find(':selected');
        order.packingCharges = selectedVal.data('packing_charges');
        order.MIN_ORDER = selectedVal.data('min_order');
        order.getCartSummary()
    });

    $('body').on('click', '.cr_cart_qty_plus_minus a', function (e) {
        e.preventDefault();
        var el = $(this), type = el.attr('data-type');
        order.updateCart(el, type);
    });

    $('body').on('input', '.cart_qty', function (e) {
        e.preventDefault();
        var el = $(this);
        order.updateCart(el);
    });

    //     $(document).on("click", ".confirm_order_download", function (e) {
    //  e.preventDefault();
    //     let href = $(this).attr("href");

    //         window.location.href = href;
    //     });


    order.setup(1);
});