// Carrito simple para agregar elementos y mostrar cantidad

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const carritoIcon = document.querySelector('.carrito');

// Crear contador visual
const contador = document.createElement('span');
contador.style.position = 'absolute';
contador.style.top = '10px';
contador.style.right = '10px';
contador.style.background = '#c4c4c4';
contador.style.color = '#000';
contador.style.borderRadius = '50%';
contador.style.padding = '6px 12px';
contador.style.fontSize = '1.2rem';
contador.style.fontWeight = 'bold';
contador.style.zIndex = '20';
carritoIcon.appendChild(contador);

function actualizarContador() {
    contador.textContent = carrito.length;
}

function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + (parseInt(item.precio) || 0), 0);
    const totalMonto = document.getElementById('total-monto');
    if (totalMonto) totalMonto.textContent = total;
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio: parseInt(precio) });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    actualizarTotal();
}

// Crear menú lateral del carrito (lado derecho)
const menuCarrito = document.createElement('div');
menuCarrito.style.position = 'fixed';
menuCarrito.style.top = '0';
menuCarrito.style.right = '-350px'; // Cambia left por right
menuCarrito.style.width = '350px';
menuCarrito.style.height = '100vh';
menuCarrito.style.background = '#222';
menuCarrito.style.color = '#fff';
menuCarrito.style.boxShadow = '-2px 0 12px rgba(0,0,0,0.3)';
menuCarrito.style.zIndex = '1000';
menuCarrito.style.transition = 'right 0.3s';
menuCarrito.style.padding = '40px 30px 30px 30px';
menuCarrito.innerHTML = `
    <h2 style="margin-bottom:30px;">Carrito</h2>
    <ul id="lista-carrito" style="list-style:none; padding:0; font-size:1.1rem;"></ul>
    <button id="cerrar-carrito" style="margin-top:30px; padding:10px 30px; border:none; border-radius:20px; background:#c4c4c4; color:#222; font-size:1rem; cursor:pointer;">Cerrar</button>
    <button id="continuar-carrito" style="margin-top:20px; margin-left:10px; padding:10px 30px; border:none; border-radius:20px; background:#c4c4c4; color:#222; font-size:1rem; cursor:pointer;">Continuar</button>
    <button id="borrar-carrito" style="margin-top:20px; margin-left:10px; padding:10px 30px; border:none; border-radius:20px; background:#c44; color:#fff; font-size:1rem; cursor:pointer;">Borrar lista</button>
`;
document.body.appendChild(menuCarrito);

// Actualizar lista de productos en el menú
function actualizarMenuCarrito() {
    const lista = menuCarrito.querySelector('#lista-carrito');
    lista.innerHTML = '';
    if (carrito.length === 0) {
        lista.innerHTML = '<li>Carrito vacío</li>';
    } else {
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = producto.nombre;
            lista.appendChild(li);
        });
    }
}

// Mostrar menú al hacer click en el carrito
carritoIcon.addEventListener('click', () => {
    actualizarMenuCarrito();
    menuCarrito.style.right = '0'; // Cambia left por right
});

// Cerrar menú
menuCarrito.querySelector('#cerrar-carrito').addEventListener('click', () => {
    menuCarrito.style.right = '-350px';
});

// Botón continuar
menuCarrito.querySelector('#continuar-carrito').addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.location.href = 'carrito/enviar-carrito.html';
});

// Botón borrar lista
menuCarrito.querySelector('#borrar-carrito').addEventListener('click', () => {
    carrito = [];
    contador.textContent = '0';
    actualizarMenuCarrito();
    localStorage.removeItem('carrito');
});

// Botones ADD
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const nombre = this.parentElement.querySelector('.nombre').textContent.trim();
        const precio = this.dataset.precio || 0;
        agregarAlCarrito(nombre, precio);
    });
});

// Inicializar
actualizarContador();
actualizarTotal();
