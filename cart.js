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

      // DIRECTOR

      part = document.createElement("div");
      part.innerHTML = `<br>Género:<br>${p.genre}<br>` ;
      part.className = "p-dir";
      item.appendChild(part);

      // ACTORES

      part = document.createElement("div");
      part.innerHTML = `<br>Protagonistas:<br>${p.actors}<br>`;
      part.className = "p-actors";
      item.appendChild(part);

      // PREMIOS

      part = document.createElement("div");
      part.innerHTML = `<br>Premios:<br>${p.awards}<br>`;
      part.className = "p-awards";
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

  // LISTAR ELEMENTOS ACTUALES DEL CARRO
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
      item.value = "Vaciar Carro";
      item.addEventListener("click", cart.nuke);
      item.className = "c-empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT
      item = document.createElement("input");
      item.type = "button";
      item.value = "Pagar - " + "$" + total;
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

  // CHECKOUT
  checkout: function () {
    // ACA VA CUALQUIER ACCION QUE SE DESEE HACER PREVIO AL PAGO
    alert("PASARELA DE PAGO");
  }
};

// LISTENER

window.addEventListener("DOMContentLoaded", cart.init);