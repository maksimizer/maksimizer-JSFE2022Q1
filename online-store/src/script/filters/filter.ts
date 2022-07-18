import { data } from '../data';
import { Boat } from '../../types/index';
import { valueFilters } from './setfilters/value_filters';
import { rangeFilters } from './setfilters/range_filters';
import { search } from './setfilters/search';

export let filteredData: Boat[];

export function filterData() {
    filteredData = data.filter((boat) => {
        const fitByProducer = valueFilters.producer.length == 0 || valueFilters.producer.includes(boat.producer);
        const fitBySeats = valueFilters.seats.length == 0 || valueFilters.seats.includes(boat.seats);
        const fitByColor = valueFilters.color.length == 0 || valueFilters.color.includes(boat.color);
        const fitByPopular =
            valueFilters.popular === false || (valueFilters.popular === true && valueFilters.popular === boat.favorite);
        const fitBySize =
            (rangeFilters.size[0] == 250 && rangeFilters.size[1] == 330) ||
            (boat.size >= rangeFilters.size[0] && boat.size <= rangeFilters.size[1]);
        const fitByQuantity =
            (rangeFilters.quantity[0] == 0 && rangeFilters.quantity[1] == 10) ||
            (boat.quantity >= rangeFilters.quantity[0] && boat.quantity <= rangeFilters.quantity[1]);
        const fitBySearch = search == undefined || boat.name.toLowerCase().includes(search.toLowerCase());
        return fitByProducer && fitBySeats && fitByColor && fitByPopular && fitBySize && fitBySearch && fitByQuantity;
    });

    const noMatchesWarning = document.querySelector('.no-matches') as HTMLElement;
    if (filteredData.length == 0) {
        noMatchesWarning.classList.remove('hidden');
    } else {
        noMatchesWarning.classList.add('hidden');
    }

    switch (localStorage.sort) {
        case 'A-Z':
            filteredData.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            break;
        case 'Z-A':
            filteredData.sort(function (a, b) {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            });
            break;
        case 'quantity+':
            filteredData.sort(function (a, b) {
                if (a.quantity > b.quantity) {
                    return 1;
                }
                if (a.quantity < b.quantity) {
                    return -1;
                }
                return 0;
            });
            break;
        case 'quantity-':
            filteredData.sort(function (a, b) {
                if (a.quantity < b.quantity) {
                    return 1;
                }
                if (a.quantity > b.quantity) {
                    return -1;
                }
                return 0;
            });
            break;
    }
}
