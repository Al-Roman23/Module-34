const categoryList = document.getElementById('category-list');
const treeList = document.getElementById('tree-list');
const treeModal = document.getElementById('tree-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

let cart = [];

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', String(isHidden));
    });
}

async function loadCategories() {
    categoryList.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.textContent = 'All Trees';
    allBtn.className = 'text-left px-4 py-2 rounded font-medium bg-green-700 text-white hover:bg-green-800 transition shadow';
    allBtn.dataset.id = 'all';
    allBtn.addEventListener('click', function () {
        Array.from(categoryList.children).forEach(b => b.classList.remove('bg-green-700', 'text-white'));
        allBtn.classList.add('bg-green-700', 'text-white');
        loadAllPlants();
    });
    categoryList.appendChild(allBtn);

    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();

    data.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.category_name;
        btn.className = 'text-left px-4 py-2 rounded font-medium hover:bg-green-700 hover:text-white transition';
        btn.dataset.id = cat.id;
        btn.addEventListener('click', function () {
            Array.from(categoryList.children).forEach(b => b.classList.remove('bg-green-700', 'text-white'));
            btn.classList.add('bg-green-700', 'text-white');
            loadCategoryPlants(cat.id);
        });
        categoryList.appendChild(btn);
    });
    allBtn.classList.add('bg-green-700', 'text-white');
    loadAllPlants();
}

async function loadAllPlants() {
    treeList.innerHTML = `
        <div class="col-span-full flex justify-center py-10">
            <div class="mySpinner"></div>
        </div>
    `;
    const res = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    displayPlants(data.plants || data.data || []);
}

async function loadCategoryPlants(categoryId) {
    treeList.innerHTML = `
        <div class="col-span-full flex justify-center py-10">
            <div class="mySpinner"></div>
        </div>
    `;
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();
    displayPlants(data.data || data.plants || []);
}

function displayPlants(plants) {
    treeList.innerHTML = '';
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col md:hover:scale-105 duration-200';
        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="w-full h-44 md:h-48 object-cover rounded mb-3">
            <h3 class="font-bold text-lg mb-1 text-green-700 cursor-pointer">${plant.name}</h3>
            <p class="text-sm text-gray-600 mb-2 min-h-[48px]">${plant.description.length > 80 ? plant.description.slice(0, 80) + "..." : plant.description}</p>
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">${plant.category}</span>
                <div class="font-semibold text-green-700">৳${plant.price}</div>
            </div>
            <button class="bg-green-600 text-white px-3 py-2 mt-3 rounded w-full hover:bg-green-700 add-cart-btn">Add to Cart</button>
        `;
        treeList.appendChild(card);
        card.querySelector('h3').addEventListener('click', () => openPlantModal(plant));
        card.querySelector('.add-cart-btn').addEventListener('click', () => addToCart(plant));
    });
}

function openPlantModal(plant) {
    modalTitle.textContent = plant.name;
    modalImage.src = plant.image;
    modalDescription.textContent = plant.description;
    modalCategory.textContent = plant.category;
    modalPrice.textContent = `৳${plant.price}`;
    treeModal.showModal();
}

function addToCart(plant) {
    if (!confirm(`Do you want to add "${plant.name}" to your cart?`)) return;
    const found = cart.find(item => item.id === plant.id);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push({ ...plant, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'flex justify-between items-center bg-green-100 px-3 py-2 rounded mb-2';
        cartItem.innerHTML = `
            <div>
                <span class="font-semibold">${item.name}</span><br>
                <span class="text-green-700">৳${item.price} × ${item.quantity}</span>
            </div>
            <button class="bg-red-500 text-white px-2 py-1 rounded remove-cart-btn">Remove</button>
        `;
        cartList.appendChild(cartItem);
        cartItem.querySelector('.remove-cart-btn').addEventListener('click', () => removeFromCart(item.id));
    });
    cartTotal.textContent = `৳${total}`;
}

loadCategories();