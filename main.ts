import { dishes } from './data.js';
import { Dish } from './types';

document.addEventListener('DOMContentLoaded', () => {
    const dishesList = document.getElementById('dishes-list') as HTMLDivElement;
    const searchForm = document.getElementById('search-form') as HTMLFormElement;
    const searchInput = document.getElementById('search-input') as HTMLInputElement;

    // Función para mostrar los platos en la página
     const displayDishes = (filteredDishes: Dish[]) => {
        dishesList.innerHTML = '';
        if (filteredDishes && filteredDishes.length > 0) {
            filteredDishes.forEach(dish => {
                const dishCard = document.createElement('div');
                dishCard.className = 'card';
                dishCard.innerHTML = `
                    <h3>${dish.name}</h3>
                    <p><strong>País:</strong> ${dish.country}</p>
                    <p>${dish.description}</p>
                `;
                dishesList.appendChild(dishCard);
            });
        } else {
            dishesList.innerHTML = '<p>No se encontraron platos que coincidan con la búsqueda.</p>';
        }
    };

    // Manejar la búsqueda en tiempo real
    searchInput.addEventListener('input', (event) => {
    const query = (event.target as HTMLInputElement).value.toLowerCase();

    // Explicitly define the type of 'dish' here.
    const filteredDishes = dishes.filter((dish: Dish) => 
      dish.name.toLowerCase().includes(query) ||
      dish.country.toLowerCase().includes(query) ||
      dish.description.toLowerCase().includes(query)
    );
    displayDishes(filteredDishes);
    });

    // Evita que el formulario se recargue al hacer clic en "Buscar"
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    // Muestra todos los platos al cargar la página
    displayDishes(dishes);
});