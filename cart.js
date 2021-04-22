var cart = {
  // PROPIEDADES
  hPdt: null, 
  hItems: null, 
  items: {},

  // GUARDAR LOCALSTORAGE CART

  save: function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // CARGAR DESDE LOCALSTORAGE

  load: function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // VACIAR CARRO
  nuke: function () {
    if (confirm("¿Vaciar Carro?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  // INICIO

  init: function () {
    // ELEMENTOS HTML
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // LISTAR PRODUCTOS
    cart.hPdt.innerHTML = "";

    let p, item, part;

    for (let id in products) {

      // WRAPPER
      p = products[id];
      item = document.createElement("div");
      item.className = "p-item";
      cart.hPdt.appendChild(item);

      // IMAGEN
      part = document.createElement("img");
      part.src = p.img;
      part.className = "p-img";
      item.appendChild(part);

      // NOMBRE
      part = document.createElement("div");
      part.innerHTML = p.name;
      part.className = "p-name";
      item.appendChild(part);

      // DESCRIPCION
      part = document.createElement("div");
      part.innerHTML = p.desc;
      part.className = "p-desc";
      item.appendChild(part);

      // PRECIO
      part = document.createElement("div");
      part.innerHTML = "$" + p.price;
      part.className = "p-price";
      item.appendChild(part);

      // AGREGAR AL CARRO
      part = document.createElement("input");
      part.type = "button";
      part.value = "Agregar al Carro";
      part.className = "cart p-add";
      part.onclick = cart.add;
      part.dataset.id = id;
      item.appendChild(part);
    }

    // (C3) CARGAR CARRO DESDE SESION ANTERIOR
    cart.load();

    // LISTAR ITEMS DEL CARRO
    cart.list();
  },

  // (D) LISTAR ELEMENTOS ACTUALES DEL CARRO
  list: function () {
    // RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    // SI EL CARRO ESTA VACIO
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Carro vacío";
      cart.hItems.appendChild(item);
    }

    // LISTAR ELEMENTOS SI EL CARRO NO ESTA VACIO

    else {
      let p, total = 0, subtotal = 0;
      for (let id in cart.items) {
        // ITEM
        p = products[id];
        item = document.createElement("div");
        item.className = "c-item";
        cart.hItems.appendChild(item);

        // NOMBRE
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);

        // REMOVER
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.className = "c-del cart";
        part.addEventListener("click", cart.remove);
        item.appendChild(part);

        // CANTIDAD
        part = document.createElement("input");
        part.type = "number";
        part.value = cart.items[id];
        part.dataset.id = id;
        part.className = "c-qty";
        part.addEventListener("change", cart.change);
        item.appendChild(part);

        // SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }

      // VACIAR
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.nuke);
      item.className = "c-empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout - " + "$" + total;
      item.addEventListener("click", cart.checkout);
      item.className = "c-checkout cart";
      cart.hItems.appendChild(item);
    }
  },

  // AGREGAR ITEM AL CARRO
  add: function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.save();
    cart.list();
  },

  // CAMBIAR CANTIDAD
  change: function () {
    if (this.value == 0) {
      delete cart.items[this.dataset.id];
    } else {
      cart.items[this.dataset.id] = this.value;
    }
    cart.save();
    cart.list();
  },

  // REMOVER ITEMS
  remove: function () {
    delete cart.items[this.dataset.id];
    cart.save();
    cart.list();
  },

  // (H) CHECKOUT
  checkout: function () {
    // SEND DATA TO SERVER
    // CHECKS
    // SEND AN EMAIL
    // RECORD TO DATABASE
    // PAYMENT
    // WHATEVER IS REQUIRED
    alert("PASARELA DE PAGO");

    /*
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(products));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){ ... };
    xhr.send(data);
    */
  }
};
window.addEventListener("DOMContentLoaded", cart.init);