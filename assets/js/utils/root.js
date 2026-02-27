var root = {
    _width: 0,
    _height: 0,
    _position: 0,
    setup: function (init) {
        this._width = $(window).width();
        this._height = $(window).height();

        root.bannerSlider();
        root.twoColSlider();
       // root.disableRightClick();


    },
    scrollEvent: function (init) {
        requestAnimationFrame(function () {
            //Add layer behind sticky menu
            var st = $(window).scrollTop();
            if (st >= 100)
                $('html').addClass('self-scrolled');
            else
                $('html').removeClass('self-scrolled');

        });
    },
    bannerSlider: function () {
        var swiper = new Swiper(".banner_slider", {
            grabCursor: true,
            effect: "creative",
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            pagination: {
                el: ".banner_slider .swiper-pagination",
                clickable: true
            },
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        });
    },
    twoColSlider: function () {
        var swiper = new Swiper(".two_col_mySwiper", {
            slidesPerView: 2, // Number of columns

            spaceBetween: 10, // Space between slides
            navigation: {
                nextEl: ".two_col_slider .next_arrow",
                prevEl: ".two_col_slider .prev_arrow",
            },
        });
    },
    disableRightClick: function () {
        $(document).on("contextmenu", function (e) {
            e.preventDefault();
            alert("Right-click is disabled.");
        });
        setInterval(function () {
            const devtoolsOpen = window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160;
            if (devtoolsOpen) {
                document.body.innerHTML = '<div class="dev_tool_enabled"><h1>DevTools is not allowed.</h1></div>';
            }
        }, 1000);
    },
}

var order = {
    cart: [],
    promotion_discount: 0,
    promotion_discount_id: '',
    packingCharges: 0,
    packingAmount: 0,
    API_URL: "https://backend.srilaxmiscrackers.com/v1",
    SITE_NAME: "Crackers",
    MIN_ORDER: 3000,
    setup: function (init) {
        if (init === 1) {
            order.loadCart();
            order.categorySlider();
            order.getCategories();
            order.getProducts();
            order.getCartDetails();
            order.getCartSummary();
            order.getDeliveries();
            order.getOrderPdf();
        }
    },
    categorySlider: function () {
        if ($(".product_cat_slider").length) {
            const swiper = new Swiper('.product_cat_slider', {
                // Optional parameters
                slidesPerView: 'auto',
                spaceBetween: 10, // Optional: add space between slides
                loop: false,
                scrollbar: {
                    el: '.swiper-scrollbar',
                    hide: true, // This hides the scrollbar
                },
            });
        }
    },
    getCategories: async function () {
        if ($('.product_list_left').length) {
            $('.product_list_left').addClass('loading');
            const response = await fetch(order.API_URL + '/get-categories', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            let html = `<a class="cat_tab active" data-id="">All Sparklers</a>`;
            if (result.status === 200) {
                console.log(result.data);
                $.each(result.data, function (index, category) {
                    html += `<a href="#" class="cat_tab" data-id="${category.id}">${category.name}</a>`;
                });
                $(".product_list_left").html(html);
            }
            $('.product_list_left').removeClass('loading');
        }
    },
    getDeliveries: async function () {
        if ($('.form_state_delivery').length) {
            const response = await fetch(order.API_URL + '/get-deliveries', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            let html = `<option value="">Select State</option>`;
            if (result.status === 200) {
                $.each(result.data, function (index, delivery) {
                    html += `<option value="${delivery.id}" data-packing_charges="${delivery.packing_charges}" data-min_order="${delivery.min_order}">${delivery.name}</option>`;
                });
                $(".form_state_delivery").html(html);
            }
        }
    },
    getProducts: async function () {
        if ($('.product_list').length) {
            $('.product_list').addClass('loading');
            let d = { search: $('.search_box').val(), cat_id: $('.cat_tab.active').attr('data-id'), sort: $('.product_filter').val() };
            let query = new URLSearchParams(d).toString();
            const response = await fetch(order.API_URL + '/get-products?' + query, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            let html = ``;
            if (result.status === 200) {
                console.log(result.data.length);
                if (result.data.length > 0) {
                    $.each(result.data, function (index, product) {
                        let cartItem = order.cart.find(item => item.id == product.id);
                        // Default values
                        let qty = cartItem ? cartItem.qty : 0;
                        let total = cartItem ? cartItem.total_price : 0;

                        // Button Group HTML (Add OR Quantity)
                        let buttonHtml = '';

                        if (qty > 0) {
                            buttonHtml = `
                                <a class="product_quantity" data-type="decrement">
                                    <i class="fa fa-minus"></i>
                                </a>
                                <input type="number" value="${qty}" class="form_control qty_input"/>
                                <a class="product_quantity" data-type="increment">
                                    <i class="fa fa-plus"></i>
                                </a>
                            `;
                        } else {
                            buttonHtml = `<button class="product_button add">Add</button>`;
                        }
                        html += `<div class="_col _col_4">
                    <div class="product_con">
                        <div class="product_image">
                            ${product.images && product.images.length > 0 ? `<img class="probgimage" src="${product.images[0].url.file}" />` : `<img class="probgimage" src=""/>`}
                                
                        </div>
                        <div class="product_content" data-id="${product.id}" 
                            data-price="${product.price}"
                            data-mrp="${product.mrp}"
                            data-code="${product.code}"
                            data-image="${product.images && product.images.length > 0 ? product.images[0].url.file : ''}"
                            data-name="${product.name}">
                            <div class="product_title" >${product.name}</div>
                            <div class="product_desc">Box of 10 Pcs</div>
                            <div class="product_price_group">
                                <div class="product_price">
                                    <span class="old_price">${order.formatINR(product.mrp)}</span>
                                    <span class="new_price" data-price="${product.selling_price}">${order.formatINR(product.selling_price)}</span>
                                </div>
                                <div class="product_total_price hide">${order.formatINR(total)}</div>
                            </div>
                            <div class="button_group ${qty > 0 ? 'quantity' : 'add'}"> ${buttonHtml}</div>
                            <div class="product_total_price hide">${order.formatINR(total)}</div>
                        </div>
                    </div>
                </div>`;
                    });
                } else {
                    html = '<div class="no_data">No Products Found</div>';
                }
                $(".product_list ._row").html(html);
            }
            $('.product_list').removeClass('loading');
        }
    },
    addQuantity: async function (el, type) {
        var btn = '<button class="product_button add">Add</button>';
        var quantity = '<a class="product_quantity" data-type="decrement"><i class="fa fa-minus"></i></a><input type="number" value="1" class="form_control qty_input"/><a class="product_quantity" data-type="increment"><i class="fa fa-plus"></i></a>';
        // Product container
        var product = $(el).closest('.product_content'),
            id = product.attr('data-id'),
            name = product.attr('data-name'),
            image = product.attr('data-image'),
            price = product.attr('data-price'),
            code = product.attr('data-code'),
            mrp = product.attr('data-mrp');

        // Price from data-price
        var price = parseFloat(product.find('.new_price').attr('data-price'));
        var input = product.find(".qty_input");
        var currentQty = parseInt(input.val());
        // Total price element
        var totalBox = product.find('.product_total_price');
        if (type === 'add') {
            product.find(".button_group").html(quantity);
            currentQty = 1;
        } else if (type === "increment") {
            currentQty += 1;
            input.val(currentQty);
        } else if (type === "decrement") {
            if (currentQty > 1) {
                currentQty -= 1;
                input.val(currentQty);
            }

            if (currentQty === 1) {
                currentQty = 0;
                type = 'add';
                product.find(".button_group").html(btn);
            }
        } else if (type === "quantity") {
            if (currentQty < 1) {
                currentQty = 0;
                type = 'add';
                product.find(".button_group").html(btn);
            }
        }

        product.find('.button_group').attr("class", "button_group").addClass(type);
        var total = currentQty * price;
        totalBox.html(order.formatINR(total));

        let existingIndex = order.cart.findIndex(item => item.id == id);
        if (currentQty > 0) {
            if (existingIndex > -1) {
                order.cart[existingIndex].qty = currentQty;
                order.cart[existingIndex].total_price = total;
            } else {
                order.cart.push({
                    id: id,
                    name: name,
                    image: image,
                    mrp: mrp,
                    qty: currentQty,
                    price: price,
                    code: code,
                    total_price: total
                });
            }
        } else {
            if (existingIndex > -1) {
                order.cart.splice(existingIndex, 1);
            }
        }
        order.grandTotal();
    },
    updateCart: function (el, type = '') {
        var row = $(el).closest('tr'), id = row.attr('data-id'), input = row.find(".cart_qty"),
            totalBox = row.find('.product_tal_price'), price = row.attr('data-price');
        let existingIndex = order.cart.findIndex(item => item.id == id);

        var currentQty = parseInt(input.val());
        var total = currentQty * price;
        totalBox.html(order.formatINR(total));
        if (type === 'plus') {
            currentQty += 1;
            input.val(currentQty);
        } else if (type === 'minus') {
            currentQty -= 1;
            input.val(currentQty);
        }

        if (currentQty > 0) {
            if (existingIndex > -1) {
                order.cart[existingIndex].qty = currentQty;
                order.cart[existingIndex].total_price = total;
            }
        } else {
            console.log(currentQty);
            if (existingIndex > -1) {
                row.slideUp(500);
                order.cart.splice(existingIndex, 1);
            }
        }
        order.saveCart();
        order.getCartSummary();
    },
    deleteCartItems: function (id) {
        let existingIndex = order.cart.findIndex(item => item.id == id);
        if (existingIndex > -1) {
            order.cart.splice(existingIndex, 1);
            order.grandTotal();
            order.getCartDetails();
        }
        if (order.cart.length === 0) {
            window.location.href = '/order.php';
        }
    },
    loadCart: function () {
        let savedCart = order.getCart();

        if (savedCart) {
            order.cart = JSON.parse(savedCart);
        } else {
            order.cart = [];
        }
        order.grandTotal();
        console.log(order.cart);
    },
    grandTotal: function () {
        let grandTotal = order.cart.reduce((sum, item) => sum + item.total_price, 0);
        $(".overall_totals").html(order.formatINR(grandTotal));
        order.saveCart();
    },
    saveCart: function () {
        localStorage.setItem("cart", JSON.stringify(order.cart));
    },
    getCart: function () {
        return localStorage.getItem("cart")
    },
    formatINR: function (amount) {
        return amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0
        });
    },
    placeOrder: async function () {
        let grandTotal = order.cart.reduce((sum, item) => sum + item.total_price, 0);
        if (grandTotal < order.MIN_ORDER) {
            Swal.fire({
                title: 'Your Minimum Order value must be : ' + order.formatINR(order.MIN_ORDER),
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else {
            Swal.fire({
                title: 'Your Order Value is : ' + order.formatINR(grandTotal),
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    window.location.href = "cart.php";
                }
            })
        }
    },
    getCartDetails: async function () {
        if ($('.cart_list').length) {
            let cartBox = $(".cart_list");

            // Clear old cart UI
            cartBox.html("");

            // If cart empty
            if (order.cart.length === 0) {
                cartBox.append("<tr><td colspan='7'>Your cart is empty</td></tr>");
                return;
            }

            // Loop cart items
            $.each(order.cart, function (index, item) {
                cartBox.append(`
                <tr data-id="${item.id}"  data-price="${item.price}">
                    <td>${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}</td>
                    <td>${item.name}</td>
                    <td><s>${order.formatINR(item.mrp)}</s></td>
                    <td>${order.formatINR(item.price)}</td>
                    <td class="cr_cart_qty">
                        <div class="cr_cart_qty_plus_minus">
                            <a type="button" data-type="minus"><i class="fa fa-minus"></i></a>
                            <input type="text" class="cart_qty" value="${item.qty}">
                            <a type="button" data-type="plus"><i class="fa fa-plus"></i></a>
                        </div
                    </td>
                    <td><span class="product_tal_price">${order.formatINR(item.total_price)}</span></td>
                    <td>
                        <a href="#" class="delete_item" data-id="${item.id}"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
        `);
            });
        }
    },
    getCartSummary: function () {
        if ($('.cart_list').length) {
            let min_order = order.MIN_ORDER;
            let tol_qty = order.cart.reduce((sum, item) => sum + item.qty, 0);
            let cart_total = order.cart.reduce((sum, item) => sum + item.total_price, 0);
            let packing_charge = 0;

            if (order.packingCharges > 0) {
                packing_charge = ((cart_total * order.packingCharges) / 100);
            }
            order.packingAmount = packing_charge;
            let promotion_discount = order.promotion_discount;
            let overall_totals = (cart_total + packing_charge) - promotion_discount;

            $('.min_order span').html(order.formatINR(min_order));
            $('.tol_qty span').html(tol_qty);
            $('.cart_total span').html(order.formatINR(cart_total));
            $('.packing_charge span').html(order.formatINR(packing_charge));
            $('.promotion_discount span').html(order.formatINR(promotion_discount));
            $('.overall_total_cart span').html(order.formatINR(overall_totals));
        }
    },
    confirmOrder: async function (el) {
        el.addClass('loading');
        let formData = new URLSearchParams($('.customer_details').serialize());
        let cart_total = order.cart.reduce((sum, item) => sum + item.total_price, 0);
        let overall_totals = (cart_total + order.packingAmount) - order.promotion_discount;

        formData.append("total", cart_total);
        formData.append("final_total", overall_totals);
        formData.append("packing_charge", order.packingAmount);
        formData.append("cart", JSON.stringify(order.cart));
        formData.append("promotion_discount", order.promotion_discount);
        formData.append("promotion_discount_id", order.promotion_discount_id);

        const response = await fetch(order.API_URL + '/confirm-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: formData
        });
        const result = await response.json();
        if (result.status) {
            Swal.fire({
                title: result.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if (res.isConfirmed) {
                    localStorage.removeItem("cart");
                    window.location.href = '/order-confirm.php?order_id=' + result.data.order_id;
                }
            })
            el.removeClass('loading');
        }
    },
    makeLabel: function (fieldName) {
        return fieldName.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    },
    getOrderPdf: async function () {
        if ($('.order_confirm_contanier').length) {
            const params = new URLSearchParams(window.location.search);
            let orderId = params.get("order_id");
            const response = await fetch(order.API_URL + '/order-view/' + orderId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            $('.order_confirm_pdf').html(result.data.content);
            console.log(result.data.file);
            $('.confirm_order_download').attr('href', result.data.file);

        }
    }
}